import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type InvoicePayload = {
  company: {
    id?: string;
    name?: string;
    nit?: string;
    email?: string;
    city?: string;
  };
  dian: {
    provider?: string;
    environment?: string;
    resolution?: string;
    prefix?: string;
    range?: string;
  };
  invoice: {
    dbId?: string;
    id: string;
    customer: string;
    product?: string;
    quantity?: number;
    subtotal: number;
    tax: number;
    date: string;
  };
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function getEnv(name: string, fallback = "") {
  return Deno.env.get(name) || fallback;
}

function findDeepValue(value: unknown, keys: string[]): string {
  if (!value || typeof value !== "object") return "";
  const record = value as Record<string, unknown>;
  for (const key of keys) {
    const direct = record[key];
    if (typeof direct === "string" && direct.trim()) return direct;
  }
  for (const child of Object.values(record)) {
    const found = findDeepValue(child, keys);
    if (found) return found;
  }
  return "";
}

function generateMockCufe(invoice: InvoicePayload["invoice"]) {
  const source = `${invoice.id}-${invoice.customer}-${invoice.date}-${invoice.subtotal + invoice.tax}`;
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = ((hash << 5) - hash) + source.charCodeAt(index);
    hash |= 0;
  }
  return `CUFE-MOCK-${Math.abs(hash).toString(16).toUpperCase().padStart(8, "0")}`;
}

function buildFactusPayload(payload: InvoicePayload) {
  const total = Number(payload.invoice.subtotal || 0) + Number(payload.invoice.tax || 0);
  return {
    numbering_range_id: Number(getEnv("FACTUS_NUMBERING_RANGE_ID", "0")),
    reference_code: payload.invoice.id,
    observation: `Factura generada desde Quantrox Suite. Total ${total}`,
    payment_method_code: getEnv("FACTUS_PAYMENT_METHOD_CODE", "10"),
    customer: {
      identification: (payload.company.nit || "222222222222").replace(/\D/g, ""),
      dv: "",
      company: payload.company.name || payload.invoice.customer,
      trade_name: payload.invoice.customer,
      names: payload.invoice.customer,
      address: payload.company.city || "Bogota",
      email: payload.company.email || "cliente@quantroxsystems.cloud",
      phone: getEnv("FACTUS_DEFAULT_PHONE", "3000000000"),
      legal_organization_id: getEnv("FACTUS_LEGAL_ORGANIZATION_ID", "1"),
      tribute_id: getEnv("FACTUS_TRIBUTE_ID", "21"),
      identification_document_id: getEnv("FACTUS_IDENTIFICATION_DOCUMENT_ID", "6"),
      municipality_id: getEnv("FACTUS_MUNICIPALITY_ID", "149"),
    },
    items: [
      {
        code_reference: payload.invoice.id,
        name: payload.invoice.product || "Venta general",
        quantity: Number(payload.invoice.quantity || 1),
        discount_rate: 0,
        price: Number(payload.invoice.subtotal || 0),
        tax_rate: "19.00",
        unit_measure_id: Number(getEnv("FACTUS_UNIT_MEASURE_ID", "70")),
        standard_code_id: Number(getEnv("FACTUS_STANDARD_CODE_ID", "1")),
        is_excluded: 0,
        tribute_id: Number(getEnv("FACTUS_TRIBUTE_ID", "1")),
      },
    ],
  };
}

async function updateInvoiceAndEvent(payload: InvoicePayload, response: Record<string, unknown>) {
  const supabaseUrl = getEnv("SUPABASE_URL");
  const serviceKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey || !payload.company.id || !payload.invoice.dbId) return;

  const admin = createClient(supabaseUrl, serviceKey);
  await admin.from("invoices").update({
    dian_status: response.dianStatus,
    cufe: response.cufe,
    xml_url: response.xmlUrl,
    qr_url: response.qrUrl,
    dian_response: response.message,
    dian_sent_at: new Date().toISOString(),
  }).eq("id", payload.invoice.dbId);

  await admin.from("dian_events").insert({
    company_id: payload.company.id,
    invoice_id: payload.invoice.dbId,
    invoice_number: payload.invoice.id,
    event: response.mode === "real" ? "Envio real a proveedor DIAN" : "Mock tecnico DIAN",
    status: response.dianStatus,
    response: response.message,
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Metodo no permitido" }, 405);
  }

  const payload = await request.json() as InvoicePayload;
  if (!payload.invoice?.id) {
    return jsonResponse({ error: "Factura requerida" }, 400);
  }

  const mode = getEnv("DIAN_PROVIDER_MODE", "mock");
  const factusToken = getEnv("FACTUS_ACCESS_TOKEN");
  let response: Record<string, unknown>;

  if (mode === "factus" && factusToken) {
    const endpoint = `${getEnv("FACTUS_API_URL", "https://api-sandbox.factus.com.co")}/v2/bills/validate`;
    const providerResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${factusToken}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(buildFactusPayload(payload)),
    });
    const providerBody = await providerResponse.json();
    if (!providerResponse.ok) {
      return jsonResponse({
        error: "Proveedor DIAN rechazo la factura",
        status: providerResponse.status,
        providerBody,
      }, 502);
    }

    response = {
      mode: "real",
      dianStatus: "Validada",
      cufe: findDeepValue(providerBody, ["cufe", "CUFE"]) || generateMockCufe(payload.invoice),
      xmlUrl: findDeepValue(providerBody, ["xml_url", "xmlUrl", "xml"]),
      qrUrl: findDeepValue(providerBody, ["qr_url", "qrUrl", "qr"]),
      message: "Factura validada por proveedor DIAN",
      providerBody,
    };
  } else {
    response = {
      mode: "mock",
      dianStatus: "Validada",
      cufe: generateMockCufe(payload.invoice),
      xmlUrl: `https://docs.quantroxsystems.cloud/xml/${encodeURIComponent(payload.invoice.id)}.xml`,
      qrUrl: `https://docs.quantroxsystems.cloud/qr/${encodeURIComponent(payload.invoice.id)}.png`,
      message: "Validacion mock desde Supabase Edge Function. Falta token real del proveedor DIAN.",
    };
  }

  await updateInvoiceAndEvent(payload, response);
  return jsonResponse(response);
});
