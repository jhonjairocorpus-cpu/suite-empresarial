const STORAGE_KEY = "quantrox-suite-data-v10";

const money = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const defaultData = {
  company: {
    name: "Comercial Andina SAS",
    nit: "901.235.884-1",
    plan: "Suite Integral",
    user: "Administrador",
    city: "Bogota",
    email: "admin@empresa.com",
    commercialName: "Comercial Andina",
    industry: "Retail y servicios",
    accent: "#f59e0b",
    logoUrl: "",
    quoteAccent: "#f59e0b",
    quoteFooter: "Cotizacion sujeta a disponibilidad, aprobacion y condiciones comerciales acordadas."
  },
  cloud: {
    mode: "Modo local",
    database: "Supabase/PostgreSQL",
    syncStatus: "Pendiente de conexion",
    lastBackup: "Sin respaldo cloud",
    pendingSync: 0,
    lastSync: "Sin sincronizar"
  },
  dian: {
    provider: "Proveedor tecnologico por definir",
    environment: "Pruebas",
    apiStatus: "Mock tecnico",
    resolution: "187600000001",
    prefix: "FE",
    range: "1046 - 9999",
    lastResponse: "Sin envios reales",
    nextStep: "Seleccionar proveedor autorizado y conectar token API"
  },
  users: [
    { name: "Administrador", email: "admin@empresa.com", role: "Propietario", status: "Activo" },
    { name: "Caja principal", email: "caja@empresa.com", role: "Cajero", status: "Invitado" },
    { name: "Contabilidad", email: "contabilidad@empresa.com", role: "Contador", status: "Invitado" }
  ],
  invoices: [
    { id: "FE-1048", customer: "Drogueria Central", product: "Plancha industrial", quantity: 1, status: "Pagada", date: "2026-05-24", subtotal: 1280000, tax: 243200, dianStatus: "Validada", cufe: "CUFE-DEMO-FE1048", xmlUrl: "https://docs.quantroxsystems.cloud/xml/FE-1048.xml", qrUrl: "https://docs.quantroxsystems.cloud/qr/FE-1048.png", dianResponse: "Validacion simulada exitosa", paymentLink: "https://pay.quantroxsystems.cloud/FE-1048" },
    { id: "FE-1047", customer: "Mercado La 80", product: "Venta general", quantity: 1, status: "Pendiente", date: "2026-05-23", subtotal: 760000, tax: 144400, dianStatus: "Por enviar", paymentLink: "https://pay.quantroxsystems.cloud/FE-1047" },
    { id: "FE-1046", customer: "Cafe Norte", product: "Servicio tecnico", quantity: 1, status: "Pagada", date: "2026-05-23", subtotal: 420000, tax: 79800, dianStatus: "Validada", cufe: "CUFE-DEMO-FE1046", xmlUrl: "https://docs.quantroxsystems.cloud/xml/FE-1046.xml", qrUrl: "https://docs.quantroxsystems.cloud/qr/FE-1046.png", dianResponse: "Validacion simulada exitosa", paymentLink: "https://pay.quantroxsystems.cloud/FE-1046" }
  ],
  quotations: [
    { id: "CT-1003", customer: "Mercado La 80", contact: "admin@la80.com", service: "Suite empresarial + inventario", items: [{ service: "Suite empresarial + inventario", quantity: 1, unitPrice: 79900 }], taxRate: 19, status: "Enviada", validUntil: "2026-06-15", date: "2026-05-24", notes: "Incluye configuracion inicial y acompanamiento remoto." },
    { id: "CT-1002", customer: "Cafe Norte", contact: "gerencia@cafenorte.com", service: "Desarrollo de portal de clientes", items: [{ service: "Desarrollo de portal de clientes", quantity: 1, unitPrice: 1200000 }], taxRate: 19, status: "Aceptada", validUntil: "2026-06-05", date: "2026-05-23", notes: "Alcance sujeto a integraciones de pago." }
  ],
  dianEvents: [
    { date: "2026-05-24", invoice: "FE-1048", event: "Factura validada", status: "Validada", response: "CUFE generado en modo prueba" },
    { date: "2026-05-23", invoice: "FE-1046", event: "Factura validada", status: "Validada", response: "XML y QR preparados" }
  ],
  pos: {
    register: "Caja principal",
    cart: [
      { sku: "PRD-001", name: "Plancha industrial", quantity: 1, price: 235000 },
      { sku: "SRV-014", name: "Servicio tecnico", quantity: 1, price: 180000 }
    ],
    payments: [
      { method: "Efectivo", amount: 820000 },
      { method: "Transferencia", amount: 450000 },
      { method: "Tarjeta", amount: 630000 }
    ]
  },
  inventory: [
    { sku: "PRD-001", name: "Plancha industrial", stock: 14, min: 6, cost: 155000, price: 235000 },
    { sku: "PRD-002", name: "Bascula digital", stock: 5, min: 8, cost: 98000, price: 155000 },
    { sku: "PRD-003", name: "Impresora POS", stock: 11, min: 5, cost: 210000, price: 318000 },
    { sku: "SRV-014", name: "Servicio tecnico", stock: 999, min: 1, cost: 65000, price: 180000 }
  ],
  inventoryMovements: [
    { date: "2026-05-24", type: "Salida", product: "Plancha industrial", quantity: 1, origin: "Factura FE-1048" },
    { date: "2026-05-23", type: "Entrada", product: "Impresora POS", quantity: 3, origin: "Compra proveedor" }
  ],
  accounting: [
    { detail: "Ventas facturadas", account: "Ingresos", category: "Ventas", type: "Ingreso", amount: 3120000, date: "2026-05-24" },
    { detail: "Compras de inventario", account: "Costo de venta", category: "Inventario", type: "Gasto", amount: 1260000, date: "2026-05-22" },
    { detail: "Nomina quincenal", account: "Gasto laboral", category: "Nomina", type: "Gasto", amount: 1890000, date: "2026-05-20" },
    { detail: "Servicio tecnico", account: "Ingresos", category: "Servicios", type: "Ingreso", amount: 540000, date: "2026-05-18" },
    { detail: "Ventas mes anterior", account: "Ingresos", category: "Ventas", type: "Ingreso", amount: 2840000, date: "2026-04-24" },
    { detail: "Compras mes anterior", account: "Costo de venta", category: "Inventario", type: "Gasto", amount: 980000, date: "2026-04-22" },
    { detail: "Nomina mes anterior", account: "Gasto laboral", category: "Nomina", type: "Gasto", amount: 1760000, date: "2026-04-20" },
    { detail: "Arriendo y servicios", account: "Administracion", category: "Administracion", type: "Gasto", amount: 520000, date: "2026-05-16" }
  ],
  accountingCompare: {
    primary: "",
    secondary: ""
  },
  payroll: [
    { name: "Ana Martinez", role: "Administracion", salary: 2100000, status: "Activa" },
    { name: "Carlos Ruiz", role: "Ventas", salary: 1900000, status: "Activa" },
    { name: "Laura Gomez", role: "Caja", salary: 1800000, status: "Activa" },
    { name: "Mateo Rios", role: "Soporte", salary: 2250000, status: "Activa" }
  ],
  customers: [
    { name: "Drogueria Central", nit: "900.123.456-7", channel: "Mayorista", contactName: "Area de compras", contact: "compras@central.com", phone: "3104567890", city: "Cali", address: "Calle 12 # 8-45", balance: 0, notes: "Cliente recurrente de contado" },
    { name: "Mercado La 80", nit: "901.456.789-0", channel: "Retail", contactName: "Administracion", contact: "admin@la80.com", phone: "3007894561", city: "Bogota", address: "Carrera 80 # 24-10", balance: 904400, notes: "Tiene cartera pendiente" },
    { name: "Cafe Norte", nit: "1.144.555.332-1", channel: "Servicios", contactName: "Gerencia", contact: "gerencia@cafenorte.com", phone: "3185557788", city: "Medellin", address: "Avenida Norte # 15-20", balance: 0, notes: "Prefiere contacto por correo" }
  ],
  suppliers: [
    { name: "Distribuciones Tecnicas SAS", nit: "901.777.224-5", category: "Inventario", contactName: "Laura Gomez", email: "compras@ditec.com", phone: "3157788990", city: "Bogota", address: "Zona industrial", paymentTerms: "30 dias", status: "Activo", notes: "Proveedor principal de equipos POS" },
    { name: "Servicios Cloud Andinos", nit: "900.888.112-3", category: "Tecnologia", contactName: "Soporte comercial", email: "ventas@cloudandinos.com", phone: "3012223344", city: "Cali", address: "Remoto", paymentTerms: "Contado", status: "Activo", notes: "Hosting, dominios y soporte tecnico" }
  ],
  tasks: [
    { text: "Revisar cartera pendiente", done: false },
    { text: "Validar stock bajo", done: false },
    { text: "Enviar reporte semanal", done: true }
  ],
  activityLogs: [
    { date: "2026-05-24T15:30:00.000Z", user: "Administrador", area: "Facturacion", action: "Factura creada", detail: "FE-1048 desconto inventario y registro ingreso" },
    { date: "2026-05-24T15:36:00.000Z", user: "Administrador", area: "DIAN", action: "Validacion mock", detail: "FE-1048 validada en modo prueba" },
    { date: "2026-05-23T10:12:00.000Z", user: "Inventario", area: "Inventario", action: "Entrada registrada", detail: "Compra proveedor agrego 3 unidades" }
  ],
  assistant: {
    focus: "Crecimiento rentable",
    lastRun: "Analisis operativo"
  },
  playbooks: [
    { title: "Cobro inteligente", area: "Cartera", impact: "Mejora flujo de caja", enabled: true },
    { title: "Compra sugerida", area: "Inventario", impact: "Evita quiebres de stock", enabled: true },
    { title: "Cierre diario", area: "POS", impact: "Reduce errores de caja", enabled: false }
  ],
  automations: [
    { title: "Enviar WhatsApp al facturar", trigger: "Factura creada", action: "Mensaje con total y enlace de pago", status: "Activo" },
    { title: "Crear tarea por stock bajo", trigger: "Stock <= minimo", action: "Tarea de compra sugerida", status: "Activo" },
    { title: "Recordatorio de cartera", trigger: "Factura pendiente", action: "Mensaje al cliente", status: "Listo" },
    { title: "Sincronizar e-commerce", trigger: "Venta online", action: "Factura + salida inventario", status: "Planeado" }
  ],
  advantages: [
    { title: "Asistente operativo", category: "IA", value: "Recomendaciones accionables por cartera, stock, margen y nomina.", status: "Activo" },
    { title: "Portal de cliente", category: "Experiencia", value: "Facturas, pagos, historial y soporte desde un enlace compartible.", status: "Disenado" },
    { title: "Cumplimiento proactivo", category: "DIAN", value: "Checklist de facturacion electronica, POS electronico, nomina y documentos soporte.", status: "Listo" },
    { title: "Integraciones abiertas", category: "API", value: "Preparado para pagos, WhatsApp, e-commerce, bancos y proveedores autorizados.", status: "Listo" }
  ],
  compliance: [
    { item: "Facturacion electronica", owner: "Ventas", status: "Interfaz lista" },
    { item: "POS electronico", owner: "Caja", status: "Interfaz lista" },
    { item: "Nomina electronica", owner: "Talento", status: "Pendiente API" },
    { item: "Documento soporte", owner: "Compras", status: "Pendiente API" },
    { item: "Notas credito/debito", owner: "Contabilidad", status: "Pendiente API" },
    { item: "Eventos de recepcion", owner: "Compras", status: "Pendiente API" }
  ],
  integrations: [
    { name: "WhatsApp", use: "Cobros, soporte y envio de reportes", status: "Activo" },
    { name: "Pasarela de pagos", use: "Pagos de facturas y links de cobro", status: "Planeado" },
    { name: "Proveedor DIAN", use: "CUFE, XML, QR y validacion", status: "Planeado" },
    { name: "E-commerce", use: "Ventas online sincronizadas", status: "Planeado" }
  ],
  quickBot: {
    open: false,
    messages: [
      { from: "bot", text: "Hola, soy el bot rapido de Quantrox. Te ayudo con facturacion, inventario, portal, pagos, PWA y soporte." }
    ],
    answers: [
      { q: "Como facturo", a: "Entra a Facturacion, selecciona cliente, producto del inventario, cantidad y genera la factura. El stock baja automaticamente.", nav: "invoices" },
      { q: "Inventario", a: "En Inventario ves stock, alertas y movimientos. Cada factura crea una salida automatica.", nav: "inventory" },
      { q: "Portal cliente", a: "El Portal permite consultar facturas, pagos, estado de cuenta y soporte por WhatsApp.", nav: "portal" },
      { q: "Instalar app", a: "Desde Chrome o Edge usa Instalar. En iPhone abre Safari y usa Agregar a pantalla de inicio.", nav: "settings" },
      { q: "Supabase", a: "En Ajustes ves el estado cloud. Para activarlo hay que crear Supabase, ejecutar el SQL y poner URL + anon key.", nav: "settings" },
      { q: "DIAN", a: "En el modulo DIAN preparas proveedor tecnologico, resolucion, CUFE, XML, QR y respuesta de validacion.", nav: "dian" },
      { q: "Pagos", a: "Los pagos estan preparados para integrar pasarela y links de cobro en el portal del cliente.", nav: "automations" },
      { q: "WhatsApp", a: "WhatsApp queda como canal de cobro, soporte y envio de reportes. El bot puede escalar a humano.", nav: "automations" },
      { q: "Soporte", a: "Puedes pedir soporte humano por WhatsApp desde el bot o desde el boton Soporte.", nav: "portal" }
    ]
  }
};

const moduleMeta = {
  home: { title: "Centro de control", eyebrow: "Operacion en vivo" },
  invoices: { title: "Facturacion electronica", eyebrow: "Ventas y DIAN" },
  quotations: { title: "Cotizaciones", eyebrow: "Propuestas comerciales" },
  dian: { title: "Proveedor DIAN", eyebrow: "Cumplimiento electronico" },
  pos: { title: "POS inteligente", eyebrow: "Caja y pagos" },
  inventory: { title: "Inventario", eyebrow: "Stock y costos" },
  accounting: { title: "Contabilidad", eyebrow: "Balance y estados" },
  palaciosAccounting: { title: "Portal Contable", eyebrow: "Palacios Constructores" },
  payroll: { title: "Nomina", eyebrow: "Equipo y provisiones" },
  customers: { title: "Clientes", eyebrow: "CRM comercial" },
  suppliers: { title: "Proveedores", eyebrow: "Compras y terceros" },
  reports: { title: "Reportes", eyebrow: "Indicadores" },
  assistant: { title: "Asistente empresarial", eyebrow: "Acciones inteligentes" },
  growth: { title: "Ventajas Quantrox", eyebrow: "Diferenciadores" },
  portal: { title: "Portal de clientes", eyebrow: "Experiencia externa" },
  automations: { title: "Automatizaciones", eyebrow: "Flujos conectados" },
  settings: { title: "Configuracion", eyebrow: "Empresa y sistema" }
};

const navItems = [
  ["home", "Inicio", "H"],
  ["invoices", "Facturacion", "F"],
  ["quotations", "Cotizaciones", "T"],
  ["dian", "DIAN", "D"],
  ["pos", "POS", "P"],
  ["inventory", "Inventario", "I"],
  ["accounting", "Contabilidad", "C"],
  ["payroll", "Nomina", "N"],
  ["customers", "Clientes", "R"],
  ["suppliers", "Proveedores", "V"],
  ["reports", "Reportes", "B"],
  ["assistant", "Asistente", "A"],
  ["growth", "Ventajas", "Q"],
  ["portal", "Portal", "L"],
  ["automations", "Auto", "Z"],
  ["settings", "Ajustes", "S"]
];

const palaciosNavItems = [
  ["palaciosAccounting", "Contabilidad", "C"]
];

let data = mergeData(loadData(), defaultData);
let activeModule = "home";
let authenticated = localStorage.getItem("quantrox-suite-auth") === "true";
let deferredInstallPrompt = null;
let cloudClient = null;
let cloudSession = null;
let cloudReady = false;
let cloudError = "";
let cloudNotice = "";
let passwordRecoveryMode = false;

const app = document.querySelector("#app");

function getCloudConfig() {
  return window.QUANTROX_CLOUD || {};
}

function isCloudConfigured() {
  const config = getCloudConfig();
  return Boolean(
    config.enabled &&
    config.supabaseUrl &&
    config.supabaseAnonKey &&
    !config.supabaseUrl.includes("TU-PROYECTO") &&
    !config.supabaseAnonKey.includes("TU-ANON")
  );
}

function isPasswordRecoveryUrl() {
  const search = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return search.get("recovery") === "1" || search.get("type") === "recovery" || hash.get("type") === "recovery";
}

function initCloudClient() {
  if (!isCloudConfigured()) {
    cloudReady = false;
    data.cloud.mode = "Modo local";
    data.cloud.syncStatus = "Credenciales Supabase pendientes";
    return;
  }

  if (!window.supabase || !window.supabase.createClient) {
    cloudReady = false;
    cloudError = "No se cargo el SDK de Supabase.";
    data.cloud.syncStatus = cloudError;
    return;
  }

  const config = getCloudConfig();
  cloudClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  cloudReady = true;
  data.cloud.mode = "Cloud conectado";
  data.cloud.syncStatus = "Supabase listo";
}

async function loadCloudSession() {
  if (!cloudReady) {
    return;
  }

  const { data: sessionData, error } = await cloudClient.auth.getSession();
  if (error) {
    cloudError = error.message;
    return;
  }

  cloudSession = sessionData.session;
  if (cloudSession) {
    authenticated = true;
    localStorage.setItem("quantrox-suite-auth", "true");
    await loadCloudData();
    return;
  }

  if (isCloudConfigured()) {
    authenticated = false;
    localStorage.removeItem("quantrox-suite-auth");
    data.cloud.syncStatus = "Inicia sesion para guardar en Supabase";
  }
}

async function signInCloud(email, password) {
  const { data: authData, error } = await cloudClient.auth.signInWithPassword({ email, password });
  if (error) {
    throw error;
  }

  cloudSession = authData.session;
  await loadCloudData();
}

function getAuthErrorMessage(error) {
  const message = String(error?.message || "");
  const status = error?.status;

  if (message.toLowerCase().includes("invalid login credentials")) {
    return "Correo o clave incorrectos. Usa el correo exacto registrado en Supabase y la clave del usuario, no la clave de la base de datos. Si no recuerdas la clave, usa Recuperar contrasena.";
  }

  if (message.toLowerCase().includes("email not confirmed")) {
    return "El correo todavia no esta confirmado. Revisa el correo de invitacion o confirma el usuario desde Supabase Authentication.";
  }

  if (status === 400 || status === 401) {
    return "No se pudo iniciar sesion. Revisa correo, clave y que el usuario este activo en Supabase.";
  }

  return message || "No se pudo iniciar sesion.";
}

async function sendPasswordReset(email) {
  if (!cloudReady) {
    throw new Error("Supabase no esta activo.");
  }

  const redirectUrl = new URL(window.location.href);
  redirectUrl.search = "?recovery=1";
  redirectUrl.hash = "";

  const { error } = await cloudClient.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl.toString()
  });

  if (error) {
    throw error;
  }
}

async function updateCloudPassword(password) {
  if (!cloudReady) {
    throw new Error("Supabase no esta activo.");
  }

  const { error } = await cloudClient.auth.updateUser({ password });
  if (error) {
    throw error;
  }

  passwordRecoveryMode = false;
  cloudNotice = "Clave actualizada. Ya puedes entrar con tu nueva contraseña.";
  await cloudClient.auth.signOut();
  cloudSession = null;
  authenticated = false;
  localStorage.removeItem("quantrox-suite-auth");
}

async function loadCloudData() {
  if (!cloudReady || !cloudSession?.user) {
    return;
  }

  const localSnapshot = getLocalOperationalSnapshot();

  const { data: profile, error: profileError } = await cloudClient
    .from("profiles")
    .select("id, company_id, full_name, role, status")
    .eq("id", cloudSession.user.id)
    .single();

  if (profileError) {
    cloudError = profileError.message;
    data.cloud.syncStatus = `Perfil pendiente: ${profileError.message}`;
    return;
  }

  const companyId = profile.company_id;
  const [
    companyResult,
    customersResult,
    suppliersResult,
    quotationsResult,
    productsResult,
    invoicesResult,
    accountingResult,
    employeesResult,
    tasksResult,
    movementsResult,
    dianEventsResult,
    activityResult
  ] = await Promise.all([
    cloudClient.from("companies").select("*").eq("id", companyId).single(),
    cloudClient.from("customers").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("suppliers").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("quotations").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("products").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("invoices").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("accounting_entries").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("employees").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("tasks").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("inventory_movements").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("dian_events").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(80),
    cloudClient.from("activity_logs").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(80)
  ]);

  let quotationItems = [];
  const quotationIds = (quotationsResult.data || []).map((item) => item.id);
  if (quotationIds.length) {
    const { data: itemRows, error: itemError } = await cloudClient
      .from("quotation_items")
      .select("*")
      .in("quotation_id", quotationIds)
      .order("position", { ascending: true });

    if (!itemError) {
      quotationItems = itemRows || [];
    } else if (!String(itemError.message || "").includes("schema cache")) {
      markCloudPending("Items de cotizacion", itemError);
    }
  }

  const quotationItemsById = quotationItems.reduce((acc, item) => {
    acc[item.quotation_id] = acc[item.quotation_id] || [];
    acc[item.quotation_id].push(item);
    return acc;
  }, {});

  if (companyResult.data) {
    data.company = {
      ...data.company,
      id: companyResult.data.id,
      name: companyResult.data.name,
      nit: companyResult.data.nit,
      city: companyResult.data.city || data.company.city,
      email: companyResult.data.email || data.company.email,
      plan: companyResult.data.plan || data.company.plan,
      user: profile.full_name,
      commercialName: companyResult.data.name,
      industry: data.company.industry,
      logoUrl: companyResult.data.logo_url || data.company.logoUrl,
      accent: companyResult.data.accent_color || data.company.accent,
      quoteAccent: companyResult.data.quote_accent || companyResult.data.accent_color || data.company.quoteAccent,
      quoteFooter: companyResult.data.quote_footer || data.company.quoteFooter
    };
  }

  data.users = [{
    name: profile.full_name,
    email: cloudSession.user.email || "usuario@empresa.com",
    role: profile.role,
    status: profile.status
  }];

  data.customers = (customersResult.data || []).map((item) => ({
    id: item.id,
    name: item.name,
    nit: item.nit || "",
    channel: item.channel,
    balance: Number(item.balance || 0),
    contactName: item.contact_name || "",
    contact: item.contact_email || "",
    phone: item.phone || "",
    city: item.city || "",
    address: item.address || "",
    notes: item.notes || ""
  }));

  data.suppliers = (suppliersResult.data || []).map((item) => ({
    id: item.id,
    name: item.name,
    nit: item.nit || "",
    category: item.category || "General",
    contactName: item.contact_name || "",
    email: item.email || "",
    phone: item.phone || "",
    city: item.city || "",
    address: item.address || "",
    paymentTerms: item.payment_terms || "",
    status: item.status || "Activo",
    notes: item.notes || ""
  }));

  data.quotations = (quotationsResult.data || []).map((item) => ({
    id: item.number,
    dbId: item.id,
    customer: item.customer_name,
    contact: item.contact_email || "",
    service: item.service,
    items: (quotationItemsById[item.id] || []).length ? quotationItemsById[item.id].map((row) => ({
      service: row.description,
      quantity: Number(row.quantity || 1),
      unitPrice: Number(row.unit_price || 0)
    })) : [{ service: item.service, quantity: Number(item.quantity || 1), unitPrice: Number(item.unit_price || 0) }],
    taxRate: Number(item.tax_rate || 19),
    status: item.status || "Borrador",
    validUntil: item.valid_until || "",
    date: item.issued_at || item.created_at?.slice(0, 10) || getToday(),
    notes: item.notes || ""
  }));

  data.inventory = (productsResult.data || []).map((item) => ({
    id: item.id,
    sku: item.sku,
    name: item.name,
    stock: Number(item.stock || 0),
    min: Number(item.min_stock || 0),
    cost: Number(item.cost || 0),
    price: Number(item.price || 0)
  }));

  data.invoices = (invoicesResult.data || []).map((item) => ({
    dbId: item.id,
    id: item.number,
    customer: "Cliente registrado",
    product: "Venta sincronizada",
    quantity: 1,
    status: item.status,
    dianStatus: item.dian_status || "Por enviar",
    paymentLink: item.payment_link || "",
    cufe: item.cufe || "",
    xmlUrl: item.xml_url || "",
    qrUrl: item.qr_url || "",
    dianResponse: item.dian_response || "",
    date: item.issued_at,
    subtotal: Number(item.subtotal || 0),
    tax: Number(item.tax || 0)
  }));

  data.accounting = (accountingResult.data || []).map((item) => ({
    id: item.id,
    detail: item.detail,
    account: item.account,
    category: item.category || item.account,
    type: item.type,
    amount: Number(item.amount || 0),
    date: item.entry_date || item.created_at?.slice(0, 10) || getToday(),
    thirdParty: item.third_party || "",
    document: item.document_number || "",
    project: item.project_name || "",
    paymentMethod: item.payment_method || "",
    paymentStatus: item.payment_status || "Pagado"
  }));

  data.payroll = (employeesResult.data || []).map((item) => ({
    id: item.id,
    name: item.full_name,
    role: item.role,
    salary: Number(item.salary || 0),
    status: item.status
  }));

  data.tasks = (tasksResult.data || []).map((item) => ({
    id: item.id,
    text: item.text,
    done: item.done
  }));

  data.inventoryMovements = (movementsResult.data || []).map((item) => ({
    id: item.id,
    date: item.movement_date,
    type: item.type,
    product: item.product_id ? "Producto registrado" : "Movimiento",
    quantity: Number(item.quantity || 0),
    origin: item.origin
  }));

  data.dianEvents = (dianEventsResult?.data || []).map((item) => ({
    id: item.id,
    date: item.created_at?.slice(0, 10) || getToday(),
    invoice: item.invoice_number,
    event: item.event,
    status: item.status,
    response: item.response || ""
  }));

  data.activityLogs = (activityResult.data || []).map((item) => ({
    id: item.id,
    date: item.created_at,
    user: item.user_email || "Usuario cloud",
    area: item.area,
    action: item.action,
    detail: item.detail
  }));

  purgeOldDeletedRecords();
  restorePendingLocalRecords(localSnapshot);
  applyDeletedRecordFilters();
  await syncPendingRecords();
  await syncPendingDeletes();

  data.cloud.mode = "Cloud conectado";
  data.cloud.syncStatus = "Datos sincronizados";
  data.cloud.lastBackup = new Date().toLocaleString("es-CO");
  data.cloud.lastSync = "Carga inicial";
  data.cloud.pendingSync = 0;
  saveData();
}

function applyDeletedRecordFilters() {
  Object.keys(deleteConfig).forEach((type) => {
    const config = deleteConfig[type];
    if (Array.isArray(data[config.list])) {
      data[config.list] = data[config.list].filter((item) => !isDeletedLocally(config.list, item));
    }
  });
}

function getLocalOperationalSnapshot() {
  return {
    customers: [...(data.customers || [])],
    suppliers: [...(data.suppliers || [])],
    quotations: [...(data.quotations || [])],
    inventory: [...(data.inventory || [])],
    invoices: [...(data.invoices || [])],
    accounting: [...(data.accounting || [])],
    payroll: [...(data.payroll || [])],
    tasks: [...(data.tasks || [])],
    inventoryMovements: [...(data.inventoryMovements || [])]
  };
}

function getCloudIdentityKey(listName) {
  return ["quotations", "invoices"].includes(listName) ? "dbId" : "id";
}

function restorePendingLocalRecords(snapshot) {
  Object.entries(snapshot).forEach(([listName, localRows]) => {
    if (!Array.isArray(data[listName])) {
      return;
    }

    const idKey = getCloudIdentityKey(listName);
    const cloudIds = new Set(data[listName].map((item) => item?.[idKey]).filter(Boolean));
    const pendingRows = localRows.filter((item) => {
      const sameCompany = !item?._pendingCompanyId || item._pendingCompanyId === data.company.id;
      return item?._pendingCloud && sameCompany && !cloudIds.has(item?.[idKey]) && !isDeletedLocally(listName, item);
    });

    data[listName] = [
      ...pendingRows.map((item) => ({ ...item, _pendingCloud: true })),
      ...data[listName].filter((item) => !isDeletedLocally(listName, item))
    ];
  });
}

function getDeletedRecords() {
  data.cloud.deletedRecords = Array.isArray(data.cloud.deletedRecords) ? data.cloud.deletedRecords : [];
  return data.cloud.deletedRecords;
}

function getRecordIdentity(listName, item) {
  const idKey = getCloudIdentityKey(listName);
  return item?.[idKey] || "";
}

function isDeletedLocally(listName, item) {
  const recordId = getRecordIdentity(listName, item);
  if (!recordId) {
    return false;
  }

  return getDeletedRecords().some((record) => (
    record.companyId === data.company.id &&
    record.listName === listName &&
    record.recordId === recordId
  ));
}

function markRecordDeleted(listName, item, table) {
  const recordId = getRecordIdentity(listName, item);
  if (!recordId) {
    return null;
  }

  const deletedRecords = getDeletedRecords();
  const existing = deletedRecords.find((record) => (
    record.companyId === data.company.id &&
    record.listName === listName &&
    record.recordId === recordId
  ));

  if (existing) {
    existing.pending = true;
    existing.deletedAt = new Date().toISOString();
    return existing;
  }

  const record = {
    companyId: data.company.id,
    listName,
    table,
    recordId,
    pending: true,
    deletedAt: new Date().toISOString()
  };
  deletedRecords.push(record);
  return record;
}

function markDeleteSynced(deletedRecord) {
  if (!deletedRecord) {
    return;
  }

  deletedRecord.pending = false;
  deletedRecord.syncedAt = new Date().toISOString();
}

function purgeOldDeletedRecords() {
  const cutoff = Date.now() - 1000 * 60 * 60 * 24 * 14;
  data.cloud.deletedRecords = getDeletedRecords().filter((record) => {
    const time = Date.parse(record.deletedAt || record.syncedAt || "");
    return record.pending || !time || time > cutoff;
  });
}

function markLocalPending(item, label, error) {
  if (item) {
    item._pendingCloud = true;
    item._pendingReason = error?.message || "Pendiente de sincronizar";
    item._pendingCompanyId = data.company.id || "";
    item._pendingUserEmail = cloudSession?.user?.email || "";
  }
  markCloudPending(label, error);
}

function markLocalSynced(item) {
  if (!item) {
    return;
  }

  delete item._pendingCloud;
  delete item._pendingReason;
  delete item._pendingCompanyId;
  delete item._pendingUserEmail;
}

async function syncPendingRecords() {
  if (!canSyncCloud()) {
    return;
  }

  for (const item of data.inventory || []) {
    if (item._pendingCloud) {
      await syncProductToCloud(item);
    }
  }

  for (const item of data.customers || []) {
    if (item._pendingCloud) {
      await syncCustomerToCloud(item);
    }
  }

  for (const item of data.suppliers || []) {
    if (item._pendingCloud) {
      await syncSupplierToCloud(item);
    }
  }

  for (const item of data.payroll || []) {
    if (item._pendingCloud) {
      await syncEmployeeToCloud(item);
    }
  }

  for (const item of data.quotations || []) {
    if (item._pendingCloud) {
      await syncQuotationToCloud(item);
    }
  }

  for (const item of data.tasks || []) {
    if (item._pendingCloud) {
      await syncTaskToCloud(item);
    }
  }

  for (const invoice of data.invoices || []) {
    if (!invoice._pendingCloud) {
      continue;
    }

    const product = getProductBySku(invoice.sku);
    const movement = (data.inventoryMovements || []).find((item) => item._pendingCloud && item.origin === `Factura ${invoice.id}`);
    const entry = (data.accounting || []).find((item) => item._pendingCloud && item.detail?.includes(invoice.id));
    if (product && movement && entry) {
      await syncInvoiceToCloud(invoice, product, movement, entry);
    }
  }

  for (const item of data.accounting || []) {
    if (item._pendingCloud) {
      await syncAccountingEntryToCloud(item);
    }
  }
}

async function syncInvoiceToCloud(invoice, product, inventoryMovement, accountingEntry) {
  if (!cloudReady || !cloudSession || !data.company.id || !product.id) {
    markLocalPending(invoice, "Factura", { message: "Sin sesion cloud o producto no sincronizado" });
    markLocalPending(inventoryMovement, "Movimiento de inventario", { message: "Factura pendiente de sincronizar" });
    markLocalPending(accountingEntry, "Movimiento contable", { message: "Factura pendiente de sincronizar" });
    return;
  }

  const { data: insertedInvoice, error: invoiceError } = await cloudClient.from("invoices").insert({
    company_id: data.company.id,
    number: invoice.id,
    status: invoice.status,
    dian_status: invoice.dianStatus || "Por enviar",
    cufe: invoice.cufe || null,
    qr_url: invoice.qrUrl || null,
    xml_url: invoice.xmlUrl || null,
    dian_response: invoice.dianResponse || null,
    payment_link: getInvoicePaymentLink(invoice),
    subtotal: invoice.subtotal,
    tax: invoice.tax,
    issued_at: invoice.date
  }).select("id").single();

  if (invoiceError) {
    markLocalPending(invoice, "Factura", invoiceError);
    markLocalPending(inventoryMovement, "Movimiento de inventario", invoiceError);
    markLocalPending(accountingEntry, "Movimiento contable", invoiceError);
    throw invoiceError;
  }

  invoice.dbId = insertedInvoice.id;

  const [stockResult, movementResult, accountingResult] = await Promise.all([
    cloudClient.from("products").update({ stock: product.stock }).eq("id", product.id),
    cloudClient.from("inventory_movements").insert({
      company_id: data.company.id,
      product_id: product.id,
      type: inventoryMovement.type,
      quantity: inventoryMovement.quantity,
      origin: inventoryMovement.origin,
      movement_date: inventoryMovement.date
    }).select("id").single(),
    insertAccountingEntryCloud(accountingEntry, invoice.date)
  ]);

  const childError = stockResult.error || movementResult.error || accountingResult.error;
  if (childError) {
    markLocalPending(invoice, "Factura", childError);
    markLocalPending(inventoryMovement, "Movimiento de inventario", childError);
    markLocalPending(accountingEntry, "Movimiento contable", childError);
    return;
  }

  inventoryMovement.id = movementResult.data?.id || inventoryMovement.id;
  accountingEntry.id = accountingResult.data?.id || accountingEntry.id;
  markLocalSynced(invoice);
  markLocalSynced(inventoryMovement);
  markLocalSynced(accountingEntry);

  data.cloud.syncStatus = "Ultima factura sincronizada";
  data.cloud.lastBackup = new Date().toLocaleString("es-CO");
  data.cloud.lastSync = `Factura ${invoice.id}`;
}

function canSyncCloud() {
  return Boolean(cloudReady && cloudSession?.user && data.company.id);
}

function markCloudSynced(label) {
  cloudError = "";
  data.cloud.syncStatus = `${label} sincronizado`;
  data.cloud.lastSync = label;
  data.cloud.lastBackup = new Date().toLocaleString("es-CO");
  data.cloud.pendingSync = 0;
}

function markCloudPending(label, error) {
  data.cloud.pendingSync = Number(data.cloud.pendingSync || 0) + 1;
  data.cloud.syncStatus = `${label} pendiente`;
  const message = error?.message || cloudError;
  cloudError = String(message || "").includes("schema cache")
    ? `${label} pendiente: falta una tabla o columna en Supabase. Ejecuta database/2026-05-26-persistence-fixes.sql en el SQL Editor.`
    : message;
}

function getCurrentUserLabel() {
  return cloudSession?.user?.email || data.company.user || "Usuario local";
}

async function recordActivity(area, action, detail) {
  const activity = {
    date: new Date().toISOString(),
    user: getCurrentUserLabel(),
    area,
    action,
    detail
  };

  data.activityLogs = [activity, ...(data.activityLogs || [])].slice(0, 80);

  if (!canSyncCloud()) {
    return;
  }

  const { data: inserted, error } = await cloudClient.from("activity_logs").insert({
    company_id: data.company.id,
    user_email: activity.user,
    area: activity.area,
    action: activity.action,
    detail: activity.detail,
    created_at: activity.date
  }).select("id").single();

  if (error) {
    markCloudPending("Actividad", error);
    return;
  }

  activity.id = inserted?.id || activity.id;
}

async function syncAccountingEntryToCloud(entry) {
  if (!canSyncCloud()) {
    markLocalPending(entry, "Movimiento contable", { message: "Sin sesion cloud" });
    return;
  }

  const { data: inserted, error } = await insertAccountingEntryCloud(entry, entry.date || getToday());

  if (error) {
    markLocalPending(entry, "Movimiento contable", error);
    return;
  }

  entry.id = inserted?.id || entry.id;
  markLocalSynced(entry);
  markCloudSynced("Movimiento contable");
}

async function insertAccountingEntryCloud(entry, entryDate) {
  const payload = {
    company_id: data.company.id,
    detail: entry.detail,
    account: entry.account,
    category: entry.category || entry.account,
    type: entry.type,
    amount: entry.amount,
    entry_date: entryDate,
    third_party: entry.thirdParty || null,
    document_number: entry.document || null,
    project_name: entry.project || null,
    payment_method: entry.paymentMethod || null,
    payment_status: entry.paymentStatus || "Pagado"
  };
  const result = await cloudClient.from("accounting_entries").insert(payload).select("id").single();

  if (!result.error) {
    return result;
  }

  const errorMessage = String(result.error.message || "");
  if (errorMessage.includes("third_party") || errorMessage.includes("document_number") || errorMessage.includes("project_name") || errorMessage.includes("payment_method") || errorMessage.includes("payment_status")) {
    const { third_party, document_number, project_name, payment_method, payment_status, ...compatiblePayload } = payload;
    return cloudClient.from("accounting_entries").insert(compatiblePayload).select("id").single();
  }

  if (errorMessage.includes("category")) {
    const { category, third_party, document_number, project_name, payment_method, payment_status, ...legacyPayload } = payload;
    return cloudClient.from("accounting_entries").insert(legacyPayload).select("id").single();
  }

  return result;
}

async function syncCompanyToCloud() {
  if (!canSyncCloud()) {
    return;
  }

  const { error } = await cloudClient.from("companies").update({
    name: data.company.name,
    nit: data.company.nit,
    city: data.company.city,
    email: data.company.email,
    plan: data.company.plan,
    logo_url: data.company.logoUrl || null,
    accent_color: data.company.accent || null,
    quote_accent: data.company.quoteAccent || data.company.accent || null,
    quote_footer: data.company.quoteFooter || null
  }).eq("id", data.company.id);

  if (error) {
    markCloudPending("Empresa", error);
    return;
  }

  markCloudSynced("Empresa");
}

async function syncProductToCloud(product) {
  if (!canSyncCloud()) {
    markLocalPending(product, "Producto", { message: "Sin sesion cloud" });
    return;
  }

  const payload = {
    company_id: data.company.id,
    sku: product.sku,
    name: product.name,
    stock: product.stock,
    min_stock: product.min,
    cost: product.cost,
    price: product.price
  };
  const { data: inserted, error } = await cloudClient.from("products").upsert(payload, { onConflict: "company_id,sku" }).select("id").single();

  if (error) {
    markLocalPending(product, "Producto", error);
    return;
  }

  product.id = inserted.id;
  markLocalSynced(product);
  markCloudSynced("Producto");
}

async function syncEmployeeToCloud(employee) {
  if (!canSyncCloud()) {
    markLocalPending(employee, "Empleado", { message: "Sin sesion cloud" });
    return;
  }

  const payload = {
    company_id: data.company.id,
    full_name: employee.name,
    role: employee.role,
    salary: employee.salary,
    status: employee.status || "Activa"
  };
  const { data: inserted, error } = await cloudClient.from("employees").insert(payload).select("id").single();

  if (error) {
    markLocalPending(employee, "Empleado", error);
    return;
  }

  employee.id = inserted?.id || employee.id;
  markLocalSynced(employee);
  markCloudSynced("Empleado");
}

async function syncCustomerToCloud(customer) {
  if (!canSyncCloud()) {
    markLocalPending(customer, "Cliente", { message: "Sin sesion cloud" });
    return;
  }

  const payload = {
    company_id: data.company.id,
    name: customer.name,
    nit: customer.nit,
    channel: customer.channel,
    contact_name: customer.contactName,
    contact_email: customer.contact,
    phone: customer.phone,
    city: customer.city,
    address: customer.address,
    notes: customer.notes,
    balance: customer.balance
  };
  const { data: inserted, error } = await cloudClient.from("customers").insert(payload).select("id").single();

  if (error) {
    markLocalPending(customer, "Cliente", error);
    return;
  }

  customer.id = inserted?.id || customer.id;
  markLocalSynced(customer);
  markCloudSynced("Cliente");
}

async function syncSupplierToCloud(supplier) {
  if (!canSyncCloud()) {
    markLocalPending(supplier, "Proveedor", { message: "Sin sesion cloud" });
    return;
  }

  const payload = {
    company_id: data.company.id,
    name: supplier.name,
    nit: supplier.nit,
    category: supplier.category,
    contact_name: supplier.contactName,
    email: supplier.email,
    phone: supplier.phone,
    city: supplier.city,
    address: supplier.address,
    payment_terms: supplier.paymentTerms,
    status: supplier.status,
    notes: supplier.notes
  };
  const { data: inserted, error } = await cloudClient.from("suppliers").insert(payload).select("id").single();

  if (error) {
    markLocalPending(supplier, "Proveedor", error);
    return;
  }

  supplier.id = inserted?.id || supplier.id;
  markLocalSynced(supplier);
  markCloudSynced("Proveedor");
}

async function syncQuotationToCloud(quotation) {
  if (!canSyncCloud()) {
    markLocalPending(quotation, "Cotizacion", { message: "Sin sesion cloud" });
    return;
  }

  const items = getQuotationItems(quotation);
  const subtotal = getQuotationSubtotal(quotation);
  const tax = getQuotationTax(quotation);
  const payload = {
    company_id: data.company.id,
    number: quotation.id,
    customer_name: quotation.customer,
    contact_email: quotation.contact,
    service: getQuotationSummary(quotation),
    quantity: items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    unit_price: subtotal,
    tax_rate: quotation.taxRate,
    subtotal,
    tax,
    total: subtotal + tax,
    status: quotation.status,
    valid_until: quotation.validUntil || null,
    issued_at: quotation.date,
    notes: quotation.notes
  };
  const { data: inserted, error } = await cloudClient
    .from("quotations")
    .upsert(payload, { onConflict: "company_id,number" })
    .select("id")
    .single();

  if (error) {
    markLocalPending(quotation, "Cotizacion", error);
    return;
  }

  quotation.dbId = inserted?.id || quotation.dbId;

  const itemPayload = items.map((item, index) => ({
    quotation_id: quotation.dbId,
    description: item.service,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    position: index + 1
  }));

  const deleteResult = await cloudClient.from("quotation_items").delete().eq("quotation_id", quotation.dbId);
  if (deleteResult.error) {
    markLocalPending(quotation, "Cotizacion", deleteResult.error);
    return;
  }

  if (itemPayload.length) {
    const { error: itemsError } = await cloudClient.from("quotation_items").insert(itemPayload);
    if (itemsError) {
      markLocalPending(quotation, "Cotizacion", itemsError);
      return;
    }
  }

  markLocalSynced(quotation);
  markCloudSynced("Cotizacion");
}

async function syncTaskToCloud(task) {
  if (!canSyncCloud()) {
    markLocalPending(task, "Tarea", { message: "Sin sesion cloud" });
    return;
  }

  const { data: inserted, error } = await cloudClient.from("tasks").insert({
    company_id: data.company.id,
    text: task.text,
    done: task.done
  }).select("id").single();

  if (error) {
    markLocalPending(task, "Tarea", error);
    return;
  }

  task.id = inserted?.id || task.id;
  markLocalSynced(task);
  markCloudSynced("Tarea");
}

async function updateCloudTaskStatus(task) {
  if (!canSyncCloud() || !task.id) {
    return;
  }

  const { error } = await cloudClient.from("tasks").update({
    done: task.done
  }).eq("id", task.id);

  if (error) {
    markCloudPending("Tarea", error);
    return;
  }

  markCloudSynced("Tarea");
}

async function addTask(text, done = false) {
  const task = { text, done };
  data.tasks.unshift(task);
  await syncTaskToCloud(task);
  return task;
}

async function updateCloudInvoiceStatus(invoice) {
  if (!canSyncCloud() || !invoice.dbId) {
    return;
  }

  const { error } = await cloudClient.from("invoices").update({ status: invoice.status }).eq("id", invoice.dbId);

  if (error) {
    markCloudPending("Pago", error);
    return;
  }

  markCloudSynced(`Pago ${invoice.id}`);
}

async function updateCloudInvoiceDian(invoice) {
  if (!canSyncCloud() || !invoice.dbId) {
    return;
  }

  const { error } = await cloudClient.from("invoices").update({
    dian_status: invoice.dianStatus,
    cufe: invoice.cufe,
    qr_url: invoice.qrUrl,
    xml_url: invoice.xmlUrl,
    dian_response: invoice.dianResponse
  }).eq("id", invoice.dbId);

  if (error) {
    markCloudPending("DIAN", error);
    return;
  }

  markCloudSynced(`DIAN ${invoice.id}`);
}

function canManageCompanyData() {
  const role = data.users?.[0]?.role || "";
  return ["Propietario", "Administrador"].includes(role);
}

const deleteConfig = {
  customers: { list: "customers", table: "customers", label: "cliente", area: "Clientes" },
  suppliers: { list: "suppliers", table: "suppliers", label: "proveedor", area: "Proveedores" },
  inventory: { list: "inventory", table: "products", label: "producto", area: "Inventario" },
  inventoryMovements: { list: "inventoryMovements", table: "inventory_movements", label: "movimiento de inventario", area: "Inventario" },
  accounting: { list: "accounting", table: "accounting_entries", label: "movimiento contable", area: "Contabilidad" },
  payroll: { list: "payroll", table: "employees", label: "empleado", area: "Nomina" },
  quotations: { list: "quotations", table: "quotations", label: "cotizacion", area: "Cotizaciones", idKey: "dbId" },
  invoices: { list: "invoices", table: "invoices", label: "factura", area: "Facturacion", idKey: "dbId" },
  tasks: { list: "tasks", table: "tasks", label: "tarea", area: "Tareas" }
};

function getDeleteLabel(item) {
  return item?.name || item?.fullName || item?.customer || item?.detail || item?.product || item?.text || item?.id || item?.sku || "registro";
}

async function deleteCloudRecord(config, item, deletedRecord = null) {
  const recordId = item?.[config.idKey || "id"];
  if (!canSyncCloud() || !recordId) {
    return;
  }

  const { error } = await cloudClient.from(config.table).delete().eq("id", recordId);
  if (error) {
    markCloudPending(`Eliminar ${config.label}`, error);
    throw error;
  }

  markDeleteSynced(deletedRecord);
}

async function syncPendingDeletes() {
  if (!canSyncCloud()) {
    return;
  }

  const configsByList = Object.values(deleteConfig).reduce((acc, config) => {
    acc[config.list] = config;
    return acc;
  }, {});

  for (const deletedRecord of getDeletedRecords()) {
    if (!deletedRecord.pending || deletedRecord.companyId !== data.company.id) {
      continue;
    }

    const config = configsByList[deletedRecord.listName];
    if (!config) {
      continue;
    }

    const { error } = await cloudClient.from(config.table).delete().eq("id", deletedRecord.recordId);
    if (error) {
      markCloudPending(`Eliminar ${config.label}`, error);
      continue;
    }

    markDeleteSynced(deletedRecord);
  }
}

async function deleteRecord(type, index) {
  const config = deleteConfig[type];
  const list = config ? data[config.list] : null;
  const item = Array.isArray(list) ? list[index] : null;
  if (!config || !item) {
    return;
  }

  const label = getDeleteLabel(item);
  const confirmed = window.confirm(`Eliminar ${config.label}: ${label}? Esta accion solo elimina este registro.`);
  if (!confirmed) {
    return;
  }

  const deletedRecord = markRecordDeleted(config.list, item, config.table);
  list.splice(index, 1);
  saveData();

  try {
    await deleteCloudRecord(config, item, deletedRecord);
  } catch (error) {
    data.cloud.syncStatus = `Eliminar ${config.label} pendiente`;
  }

  await recordActivity(config.area, "Registro eliminado", `${config.label}: ${label}`);
  saveData();
  render();
}

async function clearCompanyOperationalData() {
  if (!canSyncCloud()) {
    throw new Error("Debes iniciar sesion en cloud para limpiar datos de empresa.");
  }

  if (!canManageCompanyData()) {
    throw new Error("Solo Propietario o Administrador puede limpiar datos.");
  }

  const companyId = data.company.id;
  const tables = [
    "activity_logs",
    "dian_events",
    "inventory_movements",
    "invoice_items",
    "invoices",
    "quotations",
    "accounting_entries",
    "tasks",
    "employees",
    "suppliers",
    "customers",
    "products"
  ];

  for (const table of tables) {
    if (table === "invoice_items") {
      const { data: invoices, error: invoiceLookupError } = await cloudClient
        .from("invoices")
        .select("id")
        .eq("company_id", companyId);

      if (invoiceLookupError) {
        throw invoiceLookupError;
      }

      const invoiceIds = (invoices || []).map((item) => item.id);
      if (invoiceIds.length) {
        const { error } = await cloudClient.from("invoice_items").delete().in("invoice_id", invoiceIds);
        if (error) {
          throw error;
        }
      }
      continue;
    }

    const { error } = await cloudClient.from(table).delete().eq("company_id", companyId);
    if (error) {
      throw error;
    }
  }

  data.customers = [];
  data.suppliers = [];
  data.inventory = [];
  data.invoices = [];
  data.quotations = [];
  data.accounting = [];
  data.payroll = [];
  data.tasks = [];
  data.inventoryMovements = [];
  data.dianEvents = [];
  data.activityLogs = [];
  await recordActivity("Ajustes", "Datos operativos eliminados", "Administrador limpio la empresa para iniciar operacion real");
  data.cloud.syncStatus = "Empresa limpia para operar";
  data.cloud.lastSync = "Limpieza de empresa";
  data.cloud.lastBackup = new Date().toLocaleString("es-CO");
}

function applyBrandTheme() {
  const oldDefaultAccent = data.company.accent === "#0f766e" ? "" : data.company.accent;
  const accent = oldDefaultAccent || "#f59e0b";
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-2", accent === "#f59e0b" ? "#ff7a00" : accent);
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("No se pudo cargar la informacion guardada.", error);
    return null;
  }
}

function mergeData(savedValue, defaults) {
  if (!savedValue) {
    return JSON.parse(JSON.stringify(defaults));
  }

  return {
    ...JSON.parse(JSON.stringify(defaults)),
    ...savedValue,
    company: { ...defaults.company, ...savedValue.company },
    pos: { ...defaults.pos, ...savedValue.pos }
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function formatMoney(value) {
  return money.format(Number(value || 0));
}

function formatDateTime(value) {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTotals() {
  const invoiceSubtotal = data.invoices.reduce((sum, item) => sum + item.subtotal, 0);
  const invoiceTax = data.invoices.reduce((sum, item) => sum + item.tax, 0);
  const paid = data.invoices.filter((item) => item.status === "Pagada").reduce((sum, item) => sum + item.subtotal + item.tax, 0);
  const pending = data.invoices.filter((item) => item.status !== "Pagada").reduce((sum, item) => sum + item.subtotal + item.tax, 0);
  const income = data.accounting.filter((item) => item.type === "Ingreso").reduce((sum, item) => sum + item.amount, 0);
  const expense = data.accounting.filter((item) => item.type === "Gasto").reduce((sum, item) => sum + item.amount, 0);
  const payroll = data.payroll.reduce((sum, item) => sum + item.salary, 0);
  const inventoryValue = data.inventory.reduce((sum, item) => sum + item.stock * item.cost, 0);
  const stockAlerts = data.inventory.filter((item) => item.stock <= item.min).length;
  const posTotal = data.pos.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return {
    sales: invoiceSubtotal + invoiceTax,
    paid,
    pending,
    income,
    expense,
    balance: income - expense,
    payroll,
    payrollFull: Math.round(payroll * 1.28),
    inventoryValue,
    stockAlerts,
    posTotal,
    posTax: Math.round(posTotal * 0.19),
    margin: income ? Math.round(((income - expense) / income) * 100) : 0
  };
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getEntryDate(entry, fallbackIndex = 0) {
  if (entry.date) {
    return entry.date;
  }

  const current = new Date();
  current.setMonth(current.getMonth() - (fallbackIndex % 2));
  current.setDate(Math.max(1, current.getDate() - fallbackIndex));
  return current.toISOString().slice(0, 10);
}

function getMonthKey(dateValue) {
  return String(dateValue || getToday()).slice(0, 7);
}

function getMonthLabel(monthKey) {
  const [year, month] = String(monthKey).split("-").map(Number);
  if (!year || !month) {
    return "Periodo";
  }

  return new Intl.DateTimeFormat("es-CO", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
}

function addMonths(monthKey, offset) {
  const [year, month] = String(monthKey).split("-").map(Number);
  const date = new Date(year || new Date().getFullYear(), (month || 1) - 1 + offset, 1);
  return date.toISOString().slice(0, 7);
}

function getAccountingPeriods() {
  const months = new Set(data.accounting.map((entry, index) => getMonthKey(getEntryDate(entry, index))));
  const sorted = [...months].sort().reverse();
  const current = sorted[0] || getToday().slice(0, 7);
  const previous = sorted.find((month) => month < current) || addMonths(current, -1);
  return { current, previous, months: sorted };
}

function getAccountingMonthOptions(selectedMonth) {
  const periods = getAccountingPeriods();
  const months = new Set(periods.months);
  months.add(periods.current);
  months.add(periods.previous);
  if (selectedMonth) {
    months.add(selectedMonth);
  }

  return [...months].sort().reverse().map((month) => `
    <option value="${escapeHtml(month)}" ${month === selectedMonth ? "selected" : ""}>${escapeHtml(getMonthLabel(month))}</option>
  `).join("");
}

function summarizeAccounting(monthKey) {
  const entries = data.accounting.filter((entry, index) => getMonthKey(getEntryDate(entry, index)) === monthKey);
  const income = entries.filter((entry) => entry.type === "Ingreso").reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const expense = entries.filter((entry) => entry.type === "Gasto").reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const result = income - expense;
  const margin = income ? Math.round((result / income) * 100) : 0;
  const expenseRatio = income ? Math.round((expense / income) * 100) : 0;
  const categories = entries.reduce((acc, entry) => {
    if (entry.type !== "Gasto") {
      return acc;
    }

    const key = entry.category || entry.account || "Sin categoria";
    acc[key] = (acc[key] || 0) + Number(entry.amount || 0);
    return acc;
  }, {});
  const topExpense = Object.entries(categories).sort((a, b) => b[1] - a[1])[0] || ["Sin gasto", 0];

  return { monthKey, entries, income, expense, result, margin, expenseRatio, categories, topExpense };
}

function percentChange(current, previous) {
  if (!previous) {
    return current ? 100 : 0;
  }

  return Math.round(((current - previous) / Math.abs(previous)) * 100);
}

function getAccountingComparison() {
  const periods = getAccountingPeriods();
  const saved = data.accountingCompare || {};
  const primaryMonth = periods.months.includes(saved.primary) ? saved.primary : periods.current;
  const secondaryMonth = periods.months.includes(saved.secondary) && saved.secondary !== primaryMonth
    ? saved.secondary
    : periods.months.find((month) => month !== primaryMonth) || periods.previous;
  const current = summarizeAccounting(primaryMonth);
  const previous = summarizeAccounting(secondaryMonth);
  return {
    periods: { ...periods, current: primaryMonth, previous: secondaryMonth },
    current,
    previous,
    changes: {
      income: percentChange(current.income, previous.income),
      expense: percentChange(current.expense, previous.expense),
      result: percentChange(current.result, previous.result)
    }
  };
}

function getProductBySku(sku) {
  return data.inventory.find((item) => item.sku === sku);
}

function getInventoryProductOptions(selectedSku = "") {
  return data.inventory.map((item) => `
    <option value="${escapeHtml(item.sku)}" ${item.sku === selectedSku ? "selected" : ""}>
      ${escapeHtml(item.name)} - stock ${item.stock} - ${formatMoney(item.price)}
    </option>
  `).join("");
}

function badge(text, tone = "good") {
  return `<span class="badge ${tone}">${escapeHtml(text)}</span>`;
}

function metric(label, value, detail, tone = "") {
  return `
    <article class="metric ${tone}">
      <span>${escapeHtml(label)}</span>
      <strong>${value}</strong>
      <small>${escapeHtml(detail)}</small>
    </article>
  `;
}

function getPublicPlans() {
  return [
    {
      name: "Gratuito",
      description: "Para microempresas que quieren empezar a organizarse sin costo.",
      price: "$ 0",
      frequency: "activacion base",
      audience: "Emprendedores y negocios pequenos",
      features: ["Inventario base", "Clientes", "Contabilidad inicial", "Soporte de activacion"],
      action: "Activar plan gratuito",
      modules: ["Inventario", "Clientes", "Contabilidad"],
      kpis: [["Productos", "25"], ["Clientes", "15"], ["Balance", "$ 0"]],
      workflow: ["Registrar productos", "Crear clientes", "Ver ingresos y gastos"],
      cta: "Interfaz simple para iniciar ordenadamente.",
      demo: {
        label: "Agregar producto demo",
        input: "Nombre del producto",
        placeholder: "Ej. Café molido",
        button: "Probar inventario",
        result: "Producto agregado al inventario de prueba. No se guarda."
      },
      portal: {
        url: "portal.quantroxsystems.cloud/gratuito",
        title: "Portal Gratuito",
        access: "Acceso simple para revisar inventario base y clientes.",
        actions: ["Ver productos", "Consultar clientes", "Pedir activacion"]
      }
    },
    {
      name: "Basico",
      description: "Para negocios que ya venden y necesitan controlar clientes, productos y cotizaciones.",
      price: "$ 29.900",
      frequency: "mensual desde",
      audience: "Tiendas, servicios y oficios",
      features: ["Inventario completo", "Clientes con NIT", "Cotizaciones PDF/WhatsApp", "Reportes basicos"],
      action: "Solicitar plan Basico",
      modules: ["Inventario", "Clientes", "Cotizaciones", "Reportes"],
      kpis: [["Stock", "120"], ["Cotizado", "$ 2.4M"], ["Clientes", "42"]],
      workflow: ["Controlar stock", "Cotizar por WhatsApp", "Revisar reportes basicos"],
      cta: "Ideal para vender y cotizar sin llevar todo en cuadernos.",
      demo: {
        label: "Crear cotizacion demo",
        input: "Valor del servicio",
        placeholder: "Ej. 350000",
        button: "Calcular cotizacion",
        result: "Cotizacion calculada con IVA y lista para enviar por WhatsApp."
      },
      portal: {
        url: "portal.quantroxsystems.cloud/basico",
        title: "Portal Basico",
        access: "Entrada para clientes que cotizan, consultan inventario y revisan reportes basicos.",
        actions: ["Crear cotizacion", "Ver stock", "Compartir por WhatsApp"]
      }
    },
    {
      name: "Emprendedor",
      description: "Para equipos pequenos que necesitan vender, cotizar y revisar gastos cada mes.",
      price: "$ 49.900",
      frequency: "mensual desde",
      audience: "Microempresas en crecimiento",
      features: ["Facturacion interna", "Cotizaciones reales", "Ventas vs gastos", "Proveedores y cartera"],
      action: "Comprar plan Emprendedor",
      modules: ["Facturacion", "Cotizaciones", "Proveedores", "Contabilidad"],
      kpis: [["Ventas", "$ 8.1M"], ["Gastos", "$ 4.2M"], ["Cartera", "$ 900K"]],
      workflow: ["Cotizar", "Facturar", "Comparar ventas vs gastos"],
      cta: "Pensado para crecer con control financiero mensual.",
      demo: {
        label: "Comparar ventas y gastos",
        input: "Venta del mes",
        placeholder: "Ej. 2500000",
        button: "Ver resultado",
        result: "Resultado operativo calculado para la demo del plan."
      },
      portal: {
        url: "portal.quantroxsystems.cloud/emprendedor",
        title: "Portal Emprendedor",
        access: "Portal para ventas, gastos, proveedores, cartera y cotizaciones.",
        actions: ["Comparar meses", "Ver proveedores", "Revisar cartera"]
      }
    },
    {
      name: "Empresarial",
      description: "La operacion diaria conectada para empresas que necesitan la suite completa.",
      price: "$ 79.900",
      frequency: "mensual desde",
      audience: "Empresas con varios procesos",
      features: ["Facturacion conectada a stock", "Comparativos contables", "Usuarios y bitacora", "PWA para celular y oficina"],
      action: "Comprar plan Empresarial",
      highlighted: true,
      modules: ["Facturacion", "POS", "Inventario", "Contabilidad", "Nomina", "Usuarios"],
      kpis: [["Ventas", "$ 21M"], ["Margen", "38%"], ["Usuarios", "8"]],
      workflow: ["Venta descuenta inventario", "Bitacora por usuario", "Reportes y asistente"],
      cta: "La suite completa para operar oficina, celular y web.",
      demo: {
        label: "Simular venta con stock",
        input: "Producto vendido",
        placeholder: "Ej. Impresora POS",
        button: "Descontar stock demo",
        result: "Venta simulada, inventario descontado y bitacora actualizada."
      },
      portal: {
        url: "portal.quantroxsystems.cloud/empresarial",
        title: "Portal Empresarial",
        access: "Portal completo con facturas, pagos, usuarios, reportes y trazabilidad.",
        actions: ["Ver facturas", "Consultar pagos", "Abrir reportes"]
      }
    },
    {
      name: "A medida",
      description: "Para empresas que requieren automatizaciones, integraciones o desarrollos propios.",
      price: "Cotizar",
      frequency: "segun alcance",
      audience: "Procesos especiales",
      features: ["Automatizaciones", "Portal de clientes", "WhatsApp/pagos/e-commerce", "Acompanamiento Quantrox"],
      action: "Hablar con asesor",
      modules: ["Portal", "Automatizaciones", "Pagos", "E-commerce", "IA"],
      kpis: [["Flujos", "12"], ["Integraciones", "5"], ["Soporte", "Prioritario"]],
      workflow: ["Mapear proceso", "Conectar integraciones", "Automatizar operacion"],
      cta: "Construimos la interfaz exacta para el flujo de la empresa.",
      demo: {
        label: "Probar automatizacion",
        input: "Proceso a automatizar",
        placeholder: "Ej. Enviar cobros por WhatsApp",
        button: "Simular flujo",
        result: "Flujo personalizado simulado. Lo real se configura al contratar."
      },
      portal: {
        url: "portal.quantroxsystems.cloud/a-medida",
        title: "Portal A medida",
        access: "Portal personalizado segun el flujo de cada empresa, integraciones y permisos.",
        actions: ["Solicitar flujo", "Ver integraciones", "Escalar soporte"]
      }
    }
  ];
}

function render() {
  applyBrandTheme();

  if (!authenticated) {
    if (passwordRecoveryMode && cloudReady) {
      renderPasswordRecovery();
      return;
    }

    renderLogin();
    return;
  }

  normalizeActiveModule();
  const meta = moduleMeta[activeModule];
  const visibleNavItems = getVisibleNavItems();
  app.innerHTML = `
    <aside class="sidebar">
      <a class="brand" href="https://quantroxsystems.cloud/" aria-label="Quantrox Systems">
        <img class="brand-icon" src="assets/icono.png" alt="Quantrox">
        <span><strong>Quantrox Suite</strong><small>${escapeHtml(data.company.plan)}</small></span>
      </a>
      <nav class="nav-list" aria-label="Modulos">
        ${visibleNavItems.map(([key, label, icon]) => `
          <button class="nav-item ${activeModule === key ? "active" : ""}" type="button" data-nav="${key}">
            <span>${icon}</span>${escapeHtml(label)}
          </button>
        `).join("")}
      </nav>
      <div class="sidebar-card">
        <strong>Empresa activa</strong>
        <span>${escapeHtml(data.company.name)}</span>
        <small>NIT ${escapeHtml(data.company.nit)}</small>
      </div>
    </aside>

    <main class="workspace">
      <header class="topbar">
        <div>
          <p class="eyebrow">${escapeHtml(meta.eyebrow)}</p>
          <h1>${escapeHtml(meta.title)}</h1>
        </div>
        <div class="top-actions">
          <button class="install-button hidden" id="installButton" type="button">Instalar</button>
          <a class="contact-button" href="https://wa.me/573218247072?text=Hola%20Quantrox%20Systems,%20necesito%20soporte%20con%20mi%20Suite%20Empresarial" target="_blank" rel="noopener">Soporte</a>
          <button class="avatar-button" type="button" data-action="logout">${escapeHtml(data.company.user.charAt(0))}</button>
        </div>
      </header>
      ${cloudError ? `<div class="cloud-error workspace-alert">${escapeHtml(cloudError)}</div>` : ""}
      <section id="modulePanel">${renderActiveModule()}</section>
    </main>
    ${renderQuickBot()}
  `;

  bindShellEvents();
  bindModuleEvents();
  bindInstallButton();
  window.scrollTo(0, 0);
}

function renderLogin() {
  const cloudConfigured = isCloudConfigured();
  const publicPlans = getPublicPlans();
  app.innerHTML = `
    <main class="public-site">
      <header class="public-topbar">
        <a class="brand" href="https://quantroxsystems.cloud/">
          <img class="brand-icon" src="assets/icono.png" alt="Quantrox">
          <span><strong>Quantrox Suite</strong><small>Software empresarial</small></span>
        </a>
        <nav class="public-nav" aria-label="Navegacion publica">
          <a href="#planes">Planes</a>
          <a href="#interfaces">Interfaces</a>
          <a href="#portales">Portales</a>
          <a href="#funciones">Funciones</a>
          <a href="#comprar">Proceso</a>
          <a href="#acceso">Clientes</a>
        </nav>
        <a class="primary-button public-cta" href="https://wa.me/573218247072?text=Hola%20Quantrox%20Systems,%20quiero%20cotizar%20la%20Suite%20Empresarial" target="_blank" rel="noopener">Cotizar</a>
      </header>
      <section class="public-hero">
        <img class="hero-brand-logo" src="assets/quantrox-suite-logo.png" alt="Quantrox Suite Empresarial">
        <p class="eyebrow">Suite empresarial para Colombia</p>
        <h1>Invierte en una app que conecta ventas, inventario y contabilidad.</h1>
        <p>Elige un plan, creamos tu cuenta y operas desde oficina, celular o navegador con datos sincronizados en la nube.</p>
        <div class="public-tabs" id="planes">
          <button class="active" type="button">Microempresas</button>
          <button type="button">Inventario</button>
          <button type="button">Cotizaciones</button>
          <button type="button">Contabilidad</button>
          <button type="button">Suite completa</button>
        </div>
      </section>
      <section class="purchase-steps" id="comprar">
        <span class="active"><b>1</b><strong>Elige un plan</strong></span>
        <i></i>
        <span><b>2</b><strong>Creamos tu cuenta</strong></span>
        <i></i>
        <span><b>3</b><strong>Instalas la app</strong></span>
      </section>

      <section class="pricing-grid">
        ${publicPlans.map((plan) => renderPublicPlan(plan)).join("")}
      </section>

      <section class="plan-workspaces" id="interfaces">
        <div class="section-heading">
          <p class="eyebrow">Interfaces operativas</p>
          <h2>Cada plan abre una experiencia distinta segun la necesidad del negocio.</h2>
          <p>El cliente no entra a una suite vacia: entra a un tablero ajustado al plan que compro y a los modulos que realmente va a usar.</p>
        </div>
        <div class="plan-interface-grid">
          ${publicPlans.map((plan) => renderPlanInterface(plan)).join("")}
        </div>
      </section>

      <section class="plan-portals" id="portales">
        <div class="section-heading">
          <p class="eyebrow">Portales por plan</p>
          <h2>Cada plan tiene su propia puerta de entrada para clientes y operadores.</h2>
          <p>Estos portales son vistas de demostracion. El portal real queda privado para la empresa cuando se crea su cuenta y sus usuarios.</p>
        </div>
        <div class="plan-portal-grid">
          ${publicPlans.map((plan) => renderPlanPortal(plan)).join("")}
        </div>
      </section>

      <section class="public-feature-grid" id="funciones">
        ${[
          ["Facturacion", "Venta productos y descuenta inventario automaticamente."],
          ["Inventario", "Stock, alertas, movimientos y kardex valorizado."],
          ["Contabilidad", "Compara ventas, gastos, utilidad y margen por meses."],
          ["Usuarios", "Accesos por empresa con historial de cambios."],
          ["PWA", "Instalable en Android, iPhone, Windows y navegador."],
          ["DIAN", "Modo prueba y arquitectura lista para proveedor autorizado."]
        ].map(([title, text]) => `
          <article>
            <span>${escapeHtml(title.charAt(0))}</span>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(text)}</p>
          </article>
        `).join("")}
      </section>

      <section class="public-access" id="acceso">
        <div>
          <p class="eyebrow">Portal de clientes</p>
          <h2>Si ya compraste la app, entra con el usuario asignado.</h2>
          <p>Los clientes activos operan con Supabase, historial de cambios y datos separados por empresa.</p>
        </div>
      <section class="login-panel">
        <p class="eyebrow">${cloudConfigured ? "Acceso seguro" : "Acceso local"}</p>
        <h2>${cloudConfigured ? "Iniciar sesion" : "Entrar a la suite"}</h2>
        ${cloudNotice ? `<p class="cloud-notice">${escapeHtml(cloudNotice)}</p>` : ""}
        ${cloudError ? `<p class="cloud-error">${escapeHtml(cloudError)}</p>` : ""}
        <form id="loginForm" class="form-grid single">
          ${cloudConfigured ? `
            <label>Correo <input name="email" required type="email" placeholder="usuario@empresa.com"></label>
            <label>Clave <input name="password" required type="password" placeholder="Clave Supabase"></label>
            <button class="primary-button" type="submit">Ingresar</button>
            <button class="text-button" type="button" data-reset-password>Recuperar contraseña</button>
          ` : `
            <label>Empresa <input name="company" value="${escapeHtml(data.company.name)}" required></label>
            <label>Usuario <input name="user" value="${escapeHtml(data.company.user)}" required></label>
            <label>NIT <input name="nit" value="${escapeHtml(data.company.nit)}" required></label>
            <button class="primary-button" type="submit">Ingresar</button>
          `}
        </form>
      </section>
      </section>
    </main>
  `;

  document.querySelector("#loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    try {
      if (cloudConfigured) {
        cloudNotice = "";
        cloudError = "";
        await signInCloud(String(form.get("email")).trim(), String(form.get("password")));
      } else {
        data.company.name = String(form.get("company")).trim();
        data.company.user = String(form.get("user")).trim();
        data.company.nit = String(form.get("nit")).trim();
      }

      authenticated = true;
      localStorage.setItem("quantrox-suite-auth", "true");
      saveData();
      window.scrollTo(0, 0);
      render();
    } catch (error) {
      cloudError = getAuthErrorMessage(error);
      renderLogin();
    }
  });

  const demoButton = document.querySelector("[data-demo-login]");
  if (demoButton) {
    demoButton.addEventListener("click", () => {
      cloudSession = null;
      authenticated = true;
      data.cloud.mode = "Modo local";
      data.cloud.syncStatus = "Usando modo local en este dispositivo";
      localStorage.setItem("quantrox-suite-auth", "true");
      saveData();
      render();
    });
  }

  const resetButton = document.querySelector("[data-reset-password]");
  if (resetButton) {
    resetButton.addEventListener("click", async () => {
      const form = new FormData(document.querySelector("#loginForm"));
      const email = String(form.get("email") || "").trim();
      if (!email) {
        cloudError = "Escribe el correo del usuario creado para recuperar la contraseña.";
        cloudNotice = "";
        renderLogin();
        return;
      }

      try {
        await sendPasswordReset(email);
        cloudError = "";
        cloudNotice = "Si el correo pertenece a un usuario creado, Supabase enviara el enlace para cambiar la contraseña.";
      } catch (error) {
        cloudError = error.message || "No se pudo enviar el correo de recuperacion.";
        cloudNotice = "";
      }
      renderLogin();
    });
  }

  bindPublicDemoEvents(publicPlans);
}

function bindPublicDemoEvents(publicPlans) {
  document.querySelectorAll("[data-demo-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const planName = button.dataset.demoAction;
      const plan = publicPlans.find((item) => item.name === planName);
      const input = document.querySelector(`[data-demo-input="${CSS.escape(planName)}"]`);
      const result = document.querySelector(`[data-demo-result="${CSS.escape(planName)}"]`);
      const value = String(input?.value || "").trim();
      if (!plan || !result) {
        return;
      }

      let detail = plan.demo.result;
      if (planName === "Basico") {
        const amount = Number(value || 0);
        const tax = Math.round(amount * 0.19);
        detail = amount > 0
          ? `Subtotal ${formatMoney(amount)} + IVA ${formatMoney(tax)} = ${formatMoney(amount + tax)}. Solo demo, no se guarda.`
          : plan.demo.result;
      } else if (planName === "Emprendedor") {
        const sales = Number(value || 0);
        const estimatedExpense = Math.round(sales * 0.58);
        detail = sales > 0
          ? `Venta ${formatMoney(sales)}, gasto estimado ${formatMoney(estimatedExpense)}, utilidad ${formatMoney(sales - estimatedExpense)}.`
          : plan.demo.result;
      } else if (value) {
        detail = `${plan.demo.result} Dato probado: ${value}.`;
      }

      result.textContent = detail;
      result.classList.add("active");
      button.textContent = "Demo probado";
      window.setTimeout(() => {
        button.textContent = plan.demo.button;
      }, 1800);
    });
  });

  document.querySelectorAll("[data-portal-demo]").forEach((button) => {
    button.addEventListener("click", () => {
      const planName = button.dataset.portalDemo;
      const plan = publicPlans.find((item) => item.name === planName);
      const result = document.querySelector(`[data-portal-result="${CSS.escape(planName)}"]`);
      if (!plan || !result) {
        return;
      }

      result.textContent = `${plan.portal.title}: ${plan.portal.actions.join(" | ")}. Acceso real solo con cuenta activada.`;
      result.classList.add("active");
      button.textContent = "Portal demo abierto";
      window.setTimeout(() => {
        button.textContent = "Abrir portal demo";
      }, 1800);
    });
  });
}

function renderPublicPlan(plan) {
  const message = `Hola Quantrox Systems, quiero ${plan.action} (${plan.name}). Me interesa porque soy: ${plan.audience}.`;
  return `
    <article class="pricing-card ${plan.highlighted ? "featured" : ""}">
      ${plan.highlighted ? `<span class="plan-ribbon">Mas completo</span>` : ""}
      <h3>${escapeHtml(plan.name)}</h3>
      <p>${escapeHtml(plan.description)}</p>
      <strong>${escapeHtml(plan.price)}</strong>
      <small>${escapeHtml(plan.frequency)}</small>
      <span class="plan-audience">${escapeHtml(plan.audience)}</span>
      <ul>
        ${plan.features.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <a class="${plan.highlighted ? "primary-button" : "secondary-button"}" href="https://wa.me/573218247072?text=${encodeURIComponent(message)}" target="_blank" rel="noopener">${escapeHtml(plan.action)}</a>
    </article>
  `;
}

function renderPlanInterface(plan) {
  return `
    <article class="plan-interface ${plan.highlighted ? "featured" : ""}">
      <header>
        <div>
          <span class="panel-label">Plan ${escapeHtml(plan.name)}</span>
          <h3>${escapeHtml(plan.name)}</h3>
        </div>
        <strong>${escapeHtml(plan.price)}</strong>
      </header>
      <div class="plan-app-shell">
        <aside>
          ${plan.modules.map((item, index) => `<span class="${index === 0 ? "active" : ""}">${escapeHtml(item.charAt(0))} ${escapeHtml(item)}</span>`).join("")}
        </aside>
        <main>
          <div class="plan-kpis">
            ${plan.kpis.map(([label, value]) => `<b><small>${escapeHtml(label)}</small>${escapeHtml(value)}</b>`).join("")}
          </div>
          <div class="plan-flow">
            ${plan.workflow.map((item, index) => `<span><i>${index + 1}</i>${escapeHtml(item)}</span>`).join("")}
          </div>
        </main>
      </div>
      <p>${escapeHtml(plan.cta)}</p>
      <div class="plan-demo-box">
        <div>
          <span class="panel-label">Demo de prueba</span>
          <small>No guarda datos, no instala y no reemplaza la app real.</small>
        </div>
        <label>${escapeHtml(plan.demo.label)}
          <input data-demo-input="${escapeHtml(plan.name)}" placeholder="${escapeHtml(plan.demo.placeholder)}">
        </label>
        <button class="primary-button" type="button" data-demo-action="${escapeHtml(plan.name)}">${escapeHtml(plan.demo.button)}</button>
        <p class="demo-result" data-demo-result="${escapeHtml(plan.name)}">Escribe un dato y prueba el flujo del plan.</p>
      </div>
      <a class="secondary-button" href="https://wa.me/573218247072?text=${encodeURIComponent(`Hola Quantrox Systems, quiero ver la interfaz operativa del plan ${plan.name}`)}" target="_blank" rel="noopener">Ver interfaz del plan</a>
    </article>
  `;
}

function renderPlanPortal(plan) {
  return `
    <article class="plan-portal-card ${plan.highlighted ? "featured" : ""}">
      <div class="portal-browser">
        <span></span><span></span><span></span>
        <small>${escapeHtml(plan.portal.url)}</small>
      </div>
      <div class="portal-card-head">
        <div>
          <span class="panel-label">Portal ${escapeHtml(plan.name)}</span>
          <h3>${escapeHtml(plan.portal.title)}</h3>
        </div>
        <strong>${escapeHtml(plan.price)}</strong>
      </div>
      <p>${escapeHtml(plan.portal.access)}</p>
      <div class="portal-action-grid">
        ${plan.portal.actions.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
      <div class="portal-demo-panel">
        <b>Acceso demo</b>
        <small>Vista publica de prueba. No crea usuario, no guarda datos y no abre la app productiva.</small>
        <button class="secondary-button" type="button" data-portal-demo="${escapeHtml(plan.name)}">Abrir portal demo</button>
        <p class="demo-result" data-portal-result="${escapeHtml(plan.name)}">Selecciona el demo para ver que incluiria este portal.</p>
      </div>
    </article>
  `;
}

function renderPasswordRecovery() {
  app.innerHTML = `
    <main class="login-screen">
      <section class="login-copy">
        <a class="brand" href="https://quantroxsystems.cloud/">
          <img class="brand-icon" src="assets/icono.png" alt="Quantrox">
          <span><strong>Quantrox Suite</strong><small>Seguridad de acceso</small></span>
        </a>
        <h1>Crea una nueva contraseña segura.</h1>
        <p>Este proceso solo funciona para usuarios registrados en Supabase. Despues de guardar la clave podras iniciar sesion nuevamente.</p>
      </section>
      <section class="login-panel">
        <p class="eyebrow">Recuperacion cloud</p>
        <h2>Nueva contraseña</h2>
        ${cloudNotice ? `<p class="cloud-notice">${escapeHtml(cloudNotice)}</p>` : ""}
        ${cloudError ? `<p class="cloud-error">${escapeHtml(cloudError)}</p>` : ""}
        <form id="passwordRecoveryForm" class="form-grid single">
          <label>Nueva clave <input name="password" required minlength="8" type="password" placeholder="Minimo 8 caracteres"></label>
          <label>Confirmar clave <input name="confirmPassword" required minlength="8" type="password" placeholder="Repite la clave"></label>
          <button class="primary-button" type="submit">Actualizar contraseña</button>
          <button class="secondary-button" type="button" data-back-login>Volver al login</button>
        </form>
      </section>
    </main>
  `;

  document.querySelector("#passwordRecoveryForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      cloudError = "Las contraseñas no coinciden.";
      cloudNotice = "";
      renderPasswordRecovery();
      return;
    }

    try {
      await updateCloudPassword(password);
      window.history.replaceState({}, "", window.location.pathname);
      renderLogin();
    } catch (error) {
      cloudError = error.message || "No se pudo actualizar la contraseña.";
      cloudNotice = "";
      renderPasswordRecovery();
    }
  });

  document.querySelector("[data-back-login]").addEventListener("click", () => {
    passwordRecoveryMode = false;
    cloudError = "";
    window.history.replaceState({}, "", window.location.pathname);
    renderLogin();
  });
}

async function logout() {
  if (cloudReady && cloudSession) {
    await cloudClient.auth.signOut();
    cloudSession = null;
  }

  authenticated = false;
  localStorage.removeItem("quantrox-suite-auth");
  render();
}

function renderActiveModule() {
  const renderers = {
    home: renderHome,
    invoices: renderInvoices,
    quotations: renderQuotations,
    dian: renderDian,
    pos: renderPos,
    inventory: renderInventory,
    accounting: renderAccounting,
    palaciosAccounting: renderPalaciosAccounting,
    payroll: renderPayroll,
    customers: renderCustomers,
    suppliers: renderSuppliers,
    reports: renderReports,
    assistant: renderAssistant,
    growth: renderGrowth,
    portal: renderPortal,
    automations: renderAutomations,
    settings: renderSettings
  };

  return renderers[activeModule]();
}

function getInvoiceTotal(invoice) {
  return Number(invoice.subtotal || 0) + Number(invoice.tax || 0);
}

function getInvoicePaymentLink(invoice) {
  return invoice.paymentLink || `https://pay.quantroxsystems.cloud/${encodeURIComponent(invoice.id)}`;
}

function getInvoiceWhatsAppUrl(invoice) {
  const text = `Hola ${invoice.customer}, te compartimos la factura ${invoice.id} por ${formatMoney(getInvoiceTotal(invoice))}. Puedes pagar aqui: ${getInvoicePaymentLink(invoice)}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

function getQuotationSubtotal(quotation) {
  return getQuotationItems(quotation).reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0), 0);
}

function getQuotationTax(quotation) {
  return Math.round(getQuotationSubtotal(quotation) * (Number(quotation.taxRate || 0) / 100));
}

function getQuotationTotal(quotation) {
  return getQuotationSubtotal(quotation) + getQuotationTax(quotation);
}

function getQuotationWhatsAppUrl(quotation) {
  const text = `Hola ${quotation.customer}, te compartimos la cotizacion ${quotation.id} por ${formatMoney(getQuotationTotal(quotation))}. Vigencia: ${quotation.validUntil || "por definir"}.`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

function getQuotationItems(quotation) {
  if (Array.isArray(quotation.items) && quotation.items.length) {
    return quotation.items.map((item) => ({
      service: item.service || item.description || quotation.service || "Item",
      quantity: Number(item.quantity || 1),
      unitPrice: Number(item.unitPrice || item.unit_price || 0)
    }));
  }

  return [{
    service: quotation.service || "Item",
    quantity: Number(quotation.quantity || 1),
    unitPrice: Number(quotation.unitPrice || 0)
  }];
}

function getQuotationSummary(quotation) {
  const items = getQuotationItems(quotation);
  if (items.length <= 1) {
    return items[0]?.service || quotation.service || "Cotizacion";
  }

  return `${items[0].service} + ${items.length - 1} item(s)`;
}

function getQuoteAccent() {
  const accent = data.company.quoteAccent || data.company.accent || "#f59e0b";
  return accent === "#0f766e" ? "#f59e0b" : accent;
}

function isPalaciosCompany() {
  const company = `${data.company.name || ""} ${data.company.nit || ""}`.toUpperCase();
  return company.includes("PALACIOS") || company.includes("901-326-858") || company.includes("901326858");
}

function getPalaciosQuoteReference(quotation) {
  return quotation.notes || getQuotationSummary(quotation) || "Servicios y materiales de obra.";
}

function printPalaciosQuotation(printable, quotation, items, subtotal, tax, total) {
  const companyName = data.company.commercialName || data.company.name || "Palacios Constructores";
  const companyNit = data.company.nit || "901.326.858-0";
  const companyCity = data.company.city || "Santander de Quilichao, Cauca";
  const companyEmail = data.company.email || "palaciosconstructores.sas@gmail.com";
  const reference = getPalaciosQuoteReference(quotation);
  const footer = data.company.quoteFooter || "NUESTRA PROPUESTA DE PRECIOS TIENE VIGENCIA DE 30 DIAS CALENDARIO.";
  const palaciosLogo = data.company.logoUrl || "assets/palacios-logo.png";

  printable.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${escapeHtml(quotation.id)}</title>
        <style>
          @page { size: letter; margin: 18mm 14mm; }
          * { box-sizing: border-box; }
          body { margin: 0; color: #111827; background: #ffffff; font-family: "Baskerville Old Face", Georgia, "Times New Roman", serif; font-size: 12px; }
          .sheet { max-width: 760px; margin: 0 auto; }
          .logo-wrap { margin: 0 0 12px; text-align: center; }
          .logo-img { display: inline-block; width: min(100%, 720px); max-height: 150px; object-fit: contain; }
          .header { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 18px; align-items: start; margin-bottom: 10px; }
          .company p { margin: 0 0 4px; line-height: 1.28; }
          .company .name { font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0; }
          .quote-title { text-align: right; font-size: 18px; font-weight: 700; margin: 0 0 12px; }
          .meta { width: 100%; border-collapse: collapse; font-family: Calibri, Arial, sans-serif; font-size: 12px; }
          .meta th { width: 44%; text-align: right; padding: 4px 8px; font-family: "Baskerville Old Face", Georgia, serif; font-weight: 700; background: #d9eaf7; border: 1px solid #111827; }
          .meta td { padding: 4px 8px; border: 1px solid #111827; text-align: center; }
          .intro { display: grid; grid-template-columns: 1fr 1.7fr; gap: 12px; margin: 12px 0; }
          .block-title { margin: 0; padding: 6px 8px; font-weight: 700; background: #5b9bd5; color: #111827; border: 1px solid #111827; }
          .client-title { background: #bdd7ee; }
          .ref-box, .client-box { border: 1px solid #111827; border-top: 0; min-height: 82px; padding: 8px; line-height: 1.35; }
          .client-box p { margin: 0 0 4px; }
          table.items { width: 100%; border-collapse: collapse; table-layout: fixed; margin-top: 10px; font-family: "Baskerville Old Face", Georgia, serif; }
          .items th { background: #5b9bd5; color: #111827; border: 1px solid #111827; padding: 6px 5px; text-align: center; font-size: 11px; }
          .items td { border: 1px solid #111827; padding: 7px 6px; vertical-align: top; line-height: 1.25; }
          .items .item { width: 7%; text-align: center; }
          .items .desc { width: 47%; }
          .items .unit { width: 11%; text-align: center; }
          .items .qty { width: 9%; text-align: center; }
          .items .money { width: 13%; text-align: right; font-family: Calibri, Arial, sans-serif; }
          .bottom { display: grid; grid-template-columns: 1.6fr 0.85fr; gap: 14px; margin-top: 14px; align-items: start; }
          .terms { border: 1px solid #111827; min-height: 132px; }
          .terms h3 { margin: 0; padding: 7px 8px; font-size: 11px; background: #5b9bd5; border-bottom: 1px solid #111827; }
          .terms ol { margin: 8px 10px 8px 24px; padding: 0; line-height: 1.45; font-size: 10.5px; }
          .totals { width: 100%; border-collapse: collapse; font-family: Calibri, Arial, sans-serif; font-size: 13px; }
          .totals th, .totals td { border: 1px solid #111827; padding: 7px 8px; }
          .totals th { text-align: right; font-weight: 700; background: #f3f4f6; }
          .totals td { text-align: right; font-weight: 700; }
          .sign { margin-top: 14px; border: 1px solid #111827; min-height: 74px; padding: 9px; font-size: 11px; }
          .print-note { margin-top: 14px; color: #4b5563; font-family: Calibri, Arial, sans-serif; font-size: 10px; }
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .sheet { max-width: none; } }
        </style>
      </head>
      <body>
        <main class="sheet">
          <div class="logo-wrap">
            <img class="logo-img" src="${escapeHtml(palaciosLogo)}" alt="${escapeHtml(companyName)}" onerror="this.closest('.logo-wrap').style.display='none'">
          </div>
          <section class="header">
            <div class="company">
              <p class="name">${escapeHtml(companyName)}</p>
              <p>NIT: ${escapeHtml(companyNit)}</p>
              <p>${escapeHtml(companyCity)}</p>
              <p>${escapeHtml(companyEmail)}</p>
              <p>${escapeHtml(data.company.phone || "323 482 95 70 - 310 560 54 10")}</p>
            </div>
            <div>
              <h1 class="quote-title">COTIZACION</h1>
              <table class="meta">
                <tr><th>FECHA</th><td>${escapeHtml(quotation.date || new Date().toISOString().slice(0, 10))}</td></tr>
                <tr><th>COTIZACION No</th><td>${escapeHtml(quotation.id)}</td></tr>
                <tr><th>CLIENTE</th><td>${escapeHtml(quotation.customer || "Cliente")}</td></tr>
              </table>
            </div>
          </section>

          <section class="intro">
            <div>
              <p class="block-title">REFERENCIA:</p>
              <div class="ref-box">${escapeHtml(reference)}</div>
            </div>
            <div>
              <p class="block-title client-title">CLIENTE</p>
              <div class="client-box">
                <p><b>EMPRESA:</b> ${escapeHtml(quotation.customer || "Cliente")}</p>
                <p><b>SOLICITA:</b> ${escapeHtml(quotation.contact || "No registrado")}</p>
                <p><b>EMAIL:</b> ${escapeHtml(quotation.contact || "No registrado")}</p>
              </div>
            </div>
          </section>

          <table class="items">
            <thead>
              <tr>
                <th class="item">ITEM</th>
                <th class="desc">DESCRIPCION</th>
                <th class="unit">UNIDAD</th>
                <th class="qty">CANT</th>
                <th class="money">Vr/ UNIT.</th>
                <th class="money">Vr/ TOTAL</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((item, index) => `
                <tr>
                  <td class="item">${index + 1}</td>
                  <td class="desc">${escapeHtml(item.service)}</td>
                  <td class="unit">${escapeHtml(item.unit || "UND")}</td>
                  <td class="qty">${escapeHtml(String(item.quantity))}</td>
                  <td class="money">${formatMoney(item.unitPrice)}</td>
                  <td class="money">${formatMoney(item.quantity * item.unitPrice)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <section class="bottom">
            <div>
              <div class="terms">
                <h3>TERMINOS Y CONDICIONES.</h3>
                <ol>
                  <li>${escapeHtml(footer)}</li>
                  <li>PLAZO DE EJECUCION: ${escapeHtml(quotation.validUntil ? `vigente hasta ${quotation.validUntil}` : "por definir")}.</li>
                  <li>FORMA DE PAGO: transferencia bancaria o condiciones acordadas.</li>
                  <li>POR FAVOR ENVIAR LA COTIZACION FIRMADA AL EMAIL INDICADO ANTERIORMENTE.</li>
                </ol>
              </div>
              <div class="sign">FIRMA DEL CLIENTE:</div>
            </div>
            <table class="totals">
              <tr><th>SUBTOTAL</th><td>${formatMoney(subtotal)}</td></tr>
              <tr><th>IVA DEL ${escapeHtml(String(quotation.taxRate || 0))}%</th><td>${formatMoney(tax)}</td></tr>
              <tr><th>TOTAL</th><td>${formatMoney(total)}</td></tr>
            </table>
          </section>
          <p class="print-note">Formato personalizado para Palacios Constructores.</p>
        </main>
        <script>window.print();</script>
      </body>
    </html>
  `);
}

function getVisibleNavItems() {
  return isPalaciosCompany() ? palaciosNavItems : navItems;
}

function normalizeActiveModule() {
  const visibleKeys = getVisibleNavItems().map(([key]) => key);
  if (!visibleKeys.includes(activeModule)) {
    activeModule = visibleKeys[0] || "home";
  }
}

function renderQuotationActions(quotation) {
  return `
    <div class="row-actions">
      <button class="mini-action" type="button" data-print-quotation="${escapeHtml(quotation.id)}">PDF</button>
      <a class="mini-action" href="${getQuotationWhatsAppUrl(quotation)}" target="_blank" rel="noopener">WhatsApp</a>
      ${quotation.status !== "Aceptada" ? `<button class="mini-action success" type="button" data-accept-quotation="${escapeHtml(quotation.id)}">Aceptar</button>` : ""}
    </div>
  `;
}

function renderInvoiceActions(invoice) {
  return `
    <div class="row-actions">
      <button class="mini-action" type="button" data-print-invoice="${escapeHtml(invoice.id)}">PDF</button>
      ${invoice.dianStatus !== "Validada" ? `<button class="mini-action success" type="button" data-send-dian="${escapeHtml(invoice.id)}">DIAN</button>` : ""}
      <a class="mini-action" href="${getInvoiceWhatsAppUrl(invoice)}" target="_blank" rel="noopener">WhatsApp</a>
      ${invoice.status !== "Pagada" ? `<button class="mini-action success" type="button" data-mark-paid="${escapeHtml(invoice.id)}">Pagar</button>` : ""}
    </div>
  `;
}

function generateMockCufe(invoice) {
  const source = `${invoice.id}-${invoice.customer}-${invoice.date}-${getInvoiceTotal(invoice)}`;
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = ((hash << 5) - hash) + source.charCodeAt(index);
    hash |= 0;
  }
  return `CUFE-DEMO-${Math.abs(hash).toString(16).toUpperCase().padStart(8, "0")}`;
}

async function sendInvoiceToDian(invoiceId) {
  const invoice = data.invoices.find((item) => item.id === invoiceId);
  if (!invoice) {
    return;
  }

  let response = null;
  if (canSyncCloud() && cloudClient.functions?.invoke) {
    try {
      const result = await cloudClient.functions.invoke("send-invoice-to-dian", {
        body: {
          company: data.company,
          dian: data.dian,
          invoice
        }
      });
      if (result.error) {
        throw result.error;
      }
      response = result.data;
    } catch (error) {
      cloudError = error.message || "No se pudo llamar la funcion DIAN.";
      data.cloud.syncStatus = "DIAN en mock local por funcion pendiente";
    }
  }

  invoice.dianStatus = response?.dianStatus || "Validada";
  invoice.cufe = response?.cufe || invoice.cufe || generateMockCufe(invoice);
  invoice.xmlUrl = response?.xmlUrl || invoice.xmlUrl || `https://docs.quantroxsystems.cloud/xml/${encodeURIComponent(invoice.id)}.xml`;
  invoice.qrUrl = response?.qrUrl || invoice.qrUrl || `https://docs.quantroxsystems.cloud/qr/${encodeURIComponent(invoice.id)}.png`;
  invoice.dianResponse = response?.message || `Validacion simulada con ${data.dian.provider}`;
  data.dian.lastResponse = `${invoice.id} validada en modo ${data.dian.environment}`;
  data.dianEvents.unshift({
    date: new Date().toISOString().slice(0, 10),
    invoice: invoice.id,
    event: response?.mode === "real" ? "Envio real a proveedor" : "Envio a DIAN",
    status: invoice.dianStatus,
    response: invoice.dianResponse
  });

  await updateCloudInvoiceDian(invoice);
  await recordActivity("DIAN", "Factura validada", `${invoice.id} quedo en ${invoice.dianStatus}`);
  saveData();
  activeModule = "dian";
  render();
}

function getKardexRows() {
  let balance = 0;
  return data.inventoryMovements.slice().reverse().map((item) => {
    const product = data.inventory.find((entry) => entry.name === item.product);
    const unitCost = product ? Number(product.cost || 0) : 0;
    const quantity = Number(item.quantity || 0);
    balance += item.type === "Salida" ? -quantity : quantity;
    return {
      ...item,
      unitCost,
      totalCost: unitCost * quantity,
      balance
    };
  }).reverse();
}

function getDianProgress() {
  const done = data.compliance.filter((item) => ["Listo", "Activo", "Validada", "Interfaz lista"].includes(item.status)).length;
  return Math.round((done / data.compliance.length) * 100);
}

function renderQuickBot() {
  const bot = data.quickBot;
  const suggested = bot.answers.slice(0, 5);

  return `
    <section class="quick-bot ${bot.open ? "open" : ""}" aria-label="Bot de respuestas rapidas">
      <button class="bot-fab" type="button" data-bot-toggle aria-label="Abrir bot de respuestas rapidas">🤖</button>
      <div class="bot-panel">
        <header class="bot-header">
          <div>
            <span class="panel-label">Respuestas rapidas</span>
            <h3>Bot Quantrox</h3>
          </div>
          <button class="icon-mini" type="button" data-bot-toggle aria-label="Cerrar bot">x</button>
        </header>
        <div class="bot-messages">
          ${bot.messages.slice(-6).map((message) => `
            <p class="bot-message ${message.from === "user" ? "user" : "bot"}">${escapeHtml(message.text)}</p>
          `).join("")}
        </div>
        <div class="bot-suggestions">
          ${suggested.map((item) => `<button type="button" data-bot-question="${escapeHtml(item.q)}">${escapeHtml(item.q)}</button>`).join("")}
        </div>
        <form class="bot-form" id="botForm">
          <input name="question" placeholder="Pregunta rapida..." autocomplete="off">
          <button class="primary-button" type="submit">Enviar</button>
        </form>
        <a class="bot-whatsapp" href="https://wa.me/573218247072?text=Hola%20Quantrox,%20necesito%20ayuda%20con%20la%20suite" target="_blank" rel="noopener">Escalar a WhatsApp</a>
      </div>
    </section>
  `;
}

function findBotAnswer(question) {
  const normalized = question.toLowerCase();
  const exact = data.quickBot.answers.find((item) => item.q.toLowerCase() === normalized);
  if (exact) {
    return exact;
  }

  return data.quickBot.answers.find((item) => {
    const option = item.q.toLowerCase();
    return normalized.split(/\s+/).some((word) => word.length > 3 && option.includes(word));
  });
}

async function addBotResponse(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) {
    return;
  }

  const answer = findBotAnswer(cleanQuestion);
  data.quickBot.messages.push({ from: "user", text: cleanQuestion });

  if (answer) {
    data.quickBot.messages.push({ from: "bot", text: answer.a });
    activeModule = answer.nav;
  } else {
    data.quickBot.messages.push({
      from: "bot",
      text: "No tengo esa respuesta lista aun. Te puedo escalar a WhatsApp o crear una tarea para soporte."
    });
    await addTask(`Responder consulta: ${cleanQuestion}`);
  }

  data.quickBot.open = true;
  saveData();
  render();
}

function printInvoice(invoiceId) {
  const invoice = data.invoices.find((item) => item.id === invoiceId);
  if (!invoice) {
    return;
  }

  const printable = window.open("", "_blank", "width=900,height=720");
  if (!printable) {
    window.alert("Permite ventanas emergentes para generar el PDF.");
    return;
  }

  const total = getInvoiceTotal(invoice);
  printable.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${escapeHtml(invoice.id)}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #0f172a; }
          .invoice { max-width: 760px; margin: 0 auto; }
          .top { display: flex; justify-content: space-between; gap: 24px; border-bottom: 2px solid #f59e0b; padding-bottom: 20px; }
          h1 { margin: 0; font-size: 34px; }
          h2 { margin: 0 0 8px; font-size: 18px; color: #f59e0b; }
          table { width: 100%; margin-top: 28px; border-collapse: collapse; }
          th, td { border-bottom: 1px solid #e2e8f0; padding: 12px; text-align: left; }
          .total { margin-top: 24px; text-align: right; font-size: 22px; font-weight: 800; }
          .note { margin-top: 28px; padding: 14px; background: #fff7e6; border-radius: 8px; }
        </style>
      </head>
      <body>
        <main class="invoice">
          <section class="top">
            <div>
              <h2>${escapeHtml(data.company.name)}</h2>
              <p>NIT ${escapeHtml(data.company.nit)}<br>${escapeHtml(data.company.city)}<br>${escapeHtml(data.company.email)}</p>
            </div>
            <div>
              <h1>${escapeHtml(invoice.id)}</h1>
              <p>Fecha: ${escapeHtml(invoice.date)}<br>Estado: ${escapeHtml(invoice.status)}<br>DIAN: ${escapeHtml(invoice.dianStatus || "Borrador")}</p>
            </div>
          </section>
          <p><b>Cliente:</b> ${escapeHtml(invoice.customer)}</p>
          <table>
            <thead><tr><th>Producto</th><th>Cantidad</th><th>Subtotal</th><th>IVA</th></tr></thead>
            <tbody>
              <tr>
                <td>${escapeHtml(invoice.product || "Venta general")}</td>
                <td>${escapeHtml(String(invoice.quantity || 1))}</td>
                <td>${formatMoney(invoice.subtotal)}</td>
                <td>${formatMoney(invoice.tax)}</td>
              </tr>
            </tbody>
          </table>
          <div class="total">Total ${formatMoney(total)}</div>
          <div class="note">Link de pago: ${escapeHtml(getInvoicePaymentLink(invoice))}</div>
        </main>
        <script>window.print();</script>
      </body>
    </html>
  `);
  printable.document.close();
}

function printQuotation(quotationId) {
  const quotation = (data.quotations || []).find((item) => item.id === quotationId);
  if (!quotation) {
    return;
  }

  const printable = window.open("", "_blank", "width=900,height=720");
  if (!printable) {
    window.alert("Permite ventanas emergentes para generar la cotizacion.");
    return;
  }

  const subtotal = getQuotationSubtotal(quotation);
  const tax = getQuotationTax(quotation);
  const total = getQuotationTotal(quotation);
  const items = getQuotationItems(quotation);
  const accent = getQuoteAccent();
  const palacios = isPalaciosCompany();
  if (palacios) {
    printPalaciosQuotation(printable, quotation, items, subtotal, tax, total);
    printable.document.close();
    return;
  }

  printable.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${escapeHtml(quotation.id)}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 34px; color: #0f172a; background: #f8fafc; }
          .quote { max-width: 860px; margin: 0 auto; background: #fff; padding: 28px; border: 1px solid #e2e8f0; }
          .top { display: flex; justify-content: space-between; gap: 24px; border-bottom: 3px solid ${escapeHtml(accent)}; padding-bottom: 20px; }
          .brand { display: flex; align-items: center; gap: 14px; }
          .logo { width: 72px; height: 72px; object-fit: contain; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px; }
          .logo-mark { display: grid; width: 72px; height: 72px; place-items: center; border-radius: 8px; color: #fff; background: ${escapeHtml(accent)}; font-size: 24px; font-weight: 900; }
          h1 { margin: 0; font-size: ${palacios ? "38px" : "34px"}; }
          h2 { margin: 0 0 8px; font-size: 18px; color: ${escapeHtml(accent)}; }
          .meta { text-align: right; }
          .client-box { margin-top: 22px; padding: 14px; border-left: 4px solid ${escapeHtml(accent)}; background: #f8fafc; }
          table { width: 100%; margin-top: 28px; border-collapse: collapse; }
          th { color: #fff; background: ${escapeHtml(accent)}; }
          th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
          td.num, th.num { text-align: right; }
          .totals { margin-top: 24px; display: grid; gap: 8px; justify-content: end; }
          .totals p { margin: 0; min-width: 260px; display: flex; justify-content: space-between; }
          .total { font-size: 22px; font-weight: 800; }
          .note { margin-top: 28px; padding: 14px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0; }
          .footer { margin-top: 24px; color: #475569; font-size: 12px; }
        </style>
      </head>
      <body>
        <main class="quote">
          <section class="top">
            <div class="brand">
              ${data.company.logoUrl ? `<img class="logo" src="${escapeHtml(data.company.logoUrl)}" alt="${escapeHtml(data.company.name)}">` : `<div class="logo-mark">${escapeHtml((data.company.commercialName || data.company.name).slice(0, 2).toUpperCase())}</div>`}
              <div>
                <h2>${escapeHtml(data.company.name)}</h2>
                <p>NIT ${escapeHtml(data.company.nit)}<br>${escapeHtml(data.company.city)}<br>${escapeHtml(data.company.email)}</p>
              </div>
            </div>
            <div class="meta">
              <h1>${palacios ? "COTIZACION" : escapeHtml(quotation.id)}</h1>
              ${palacios ? `<h2>${escapeHtml(quotation.id)}</h2>` : ""}
              <p>Fecha: ${escapeHtml(quotation.date)}<br>Vigencia: ${escapeHtml(quotation.validUntil || "Por definir")}<br>Estado: ${escapeHtml(quotation.status)}</p>
            </div>
          </section>
          <div class="client-box"><b>Cliente:</b> ${escapeHtml(quotation.customer)}<br><b>Contacto:</b> ${escapeHtml(quotation.contact || "No registrado")}</div>
          <table>
            <thead><tr><th>Producto / Servicio</th><th class="num">Cantidad</th><th class="num">Valor unitario</th><th class="num">Subtotal</th></tr></thead>
            <tbody>
              ${items.map((item) => `
                <tr>
                  <td>${escapeHtml(item.service)}</td>
                  <td class="num">${escapeHtml(String(item.quantity))}</td>
                  <td class="num">${formatMoney(item.unitPrice)}</td>
                  <td class="num">${formatMoney(item.quantity * item.unitPrice)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div class="totals">
            <p><span>Subtotal</span><b>${formatMoney(subtotal)}</b></p>
            <p><span>IVA ${escapeHtml(String(quotation.taxRate || 0))}%</span><b>${formatMoney(tax)}</b></p>
            <p class="total"><span>Total</span><b>${formatMoney(total)}</b></p>
          </div>
          <div class="note">${escapeHtml(quotation.notes || "Cotizacion sujeta a disponibilidad y aprobacion del cliente.")}</div>
          <div class="footer">${escapeHtml(data.company.quoteFooter || "")}</div>
        </main>
        <script>window.print();</script>
      </body>
    </html>
  `);
  printable.document.close();
}

async function markInvoicePaid(invoiceId) {
  const invoice = data.invoices.find((item) => item.id === invoiceId);
  if (!invoice) {
    return;
  }

  invoice.status = "Pagada";
  await addTask(`Conciliar pago de ${invoice.id}`);
  await updateCloudInvoiceStatus(invoice);
  await recordActivity("Facturacion", "Pago marcado", `${invoice.id} marcada como pagada`);
  saveData();
  render();
}

function renderHome() {
  const totals = getTotals();
  return `
    <section class="hero-panel app-hero">
      <div>
        <p class="eyebrow">Suite operativa</p>
        <h2>${escapeHtml(data.company.name)}</h2>
        <p>Un tablero para vender, facturar, controlar inventario, leer la contabilidad y revisar nomina sin saltar entre sistemas.</p>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-nav="invoices">Nueva factura</button>
          <button class="secondary-button" type="button" data-nav="pos">Abrir caja</button>
        </div>
      </div>
      <div class="command-center">
        <span>Ventas hoy</span>
        <strong>${formatMoney(totals.sales)}</strong>
        <div class="mini-bars">
          <i style="height: 42%"></i><i style="height: 68%"></i><i style="height: 48%"></i><i style="height: 86%"></i><i style="height: 74%"></i>
        </div>
      </div>
    </section>

    <section class="summary-grid">
      ${metric("Ventas facturadas", formatMoney(totals.sales), "Incluye IVA")}
      ${metric("Cartera pendiente", formatMoney(totals.pending), "Por cobrar", totals.pending > 0 ? "attention" : "")}
      ${metric("Balance operativo", formatMoney(totals.balance), `${totals.margin}% margen estimado`)}
      ${metric("Alertas de stock", totals.stockAlerts, "Productos bajo minimo", totals.stockAlerts ? "attention" : "")}
    </section>

    <section class="dashboard-grid">
      <article class="panel">
        <h3>Flujo de trabajo <span class="panel-label">Hoy</span></h3>
        <div class="timeline">
          <span><b>Venta</b><small>POS o factura electronica</small></span>
          <span><b>Inventario</b><small>Descuento automatico de unidades</small></span>
          <span><b>Contabilidad</b><small>Ingreso y cartera actualizados</small></span>
          <span><b>Reportes</b><small>Indicadores para decision</small></span>
        </div>
      </article>
      <article class="panel">
        <h3>Tareas inteligentes <span class="panel-label">Operador</span></h3>
        <div class="task-list">
          ${data.tasks.map((task, index) => `
            <label class="task-item">
              <input type="checkbox" data-task="${index}" ${task.done ? "checked" : ""}>
              <span>${escapeHtml(task.text)}</span>
              ${renderDeleteAction("tasks", index)}
            </label>
          `).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderInvoices() {
  const totals = getTotals();
  const firstProduct = data.inventory[0];
  const dianProgress = getDianProgress();
  return `
    <section class="summary-grid">
      ${metric("Facturado", formatMoney(totals.sales), `${data.invoices.length} documentos`)}
      ${metric("Pagado", formatMoney(totals.paid), "Recaudo confirmado")}
      ${metric("Pendiente", formatMoney(totals.pending), "Cartera activa", totals.pending > 0 ? "attention" : "")}
      ${metric("Stock conectado", data.inventoryMovements.length, "Movimientos inventario")}
    </section>
    <section class="dashboard-grid">
      <article class="panel">
        <h3>Nueva factura <span class="panel-label">Inventario conectado</span></h3>
        <form class="form-grid" id="invoiceForm">
          <label>Cliente <input name="customer" required placeholder="Nombre del cliente"></label>
          <label>Producto
            <select name="productSku" required>
              ${getInventoryProductOptions(firstProduct ? firstProduct.sku : "")}
            </select>
          </label>
          <label>Cantidad <input name="quantity" required min="1" type="number" value="1"></label>
          <label>Estado
            <select name="status"><option>Pagada</option><option>Pendiente</option></select>
          </label>
          <button class="primary-button" type="submit">Generar factura</button>
        </form>
      </article>
      <article class="panel">
        <h3>Estado DIAN <span class="panel-label">Integracion</span></h3>
        <div class="progress-item">
          <span><b>Preparacion tecnica</b><b>${dianProgress}%</b></span>
          <div class="progress-track"><i style="width:${dianProgress}%"></i></div>
        </div>
        <ul class="insight-list">
          <li><span>Modo actual</span><b>Operacion del cliente</b></li>
          <li><span>Siguiente paso</span><b>Proveedor autorizado por API</b></li>
          <li><span>Salida</span><b>PDF, XML y CUFE</b></li>
          <li><span>Inventario</span><b>Descuento automatico</b></li>
        </ul>
      </article>
    </section>
    ${renderTable("Facturas recientes", ["Numero", "Cliente", "Producto", "DIAN", "Estado", "Total", "Acciones"], data.invoices.map((item, index) => [
      item.id,
      item.customer,
      item.product || "Venta general",
      badge(item.dianStatus || "Borrador", item.dianStatus === "Validada" ? "good" : "info"),
      badge(item.status, item.status === "Pagada" ? "good" : "warn"),
      formatMoney(getInvoiceTotal(item)),
      `${renderInvoiceActions(item)} ${renderDeleteAction("invoices", index)}`
    ]))}
  `;
}

function renderQuotations() {
  const quotations = data.quotations || [];
  const totalQuoted = quotations.reduce((sum, item) => sum + getQuotationTotal(item), 0);
  const accepted = quotations.filter((item) => item.status === "Aceptada");
  const sent = quotations.filter((item) => item.status === "Enviada");
  const palacios = isPalaciosCompany();
  return `
    <section class="summary-grid">
      ${metric("Cotizaciones", quotations.length, "Propuestas creadas")}
      ${metric("Valor cotizado", formatMoney(totalQuoted), "Total comercial")}
      ${metric("Aceptadas", accepted.length, "Listas para facturar", accepted.length ? "good" : "")}
      ${metric("En seguimiento", sent.length, "Pendientes de respuesta", sent.length ? "attention" : "")}
    </section>
    <section class="hero-panel quotation-hero ${palacios ? "palacios-quote" : ""}">
      <div>
        <p class="eyebrow">${palacios ? "Palacios Constructores" : "Propuestas comerciales"}</p>
        <h2>${palacios ? "Cotizaciones de obra con varios materiales y servicios." : "Cotizaciones editables por producto, cantidad y valor unitario."}</h2>
        <p>${palacios ? "Formato personalizado para obra civil, suministros, mano de obra y condiciones comerciales." : "Configura logo, color de marca e items desde la misma suite."}</p>
      </div>
      <div class="quote-brand-preview" style="--quote-accent:${escapeHtml(getQuoteAccent())}">
        ${data.company.logoUrl ? `<img src="${escapeHtml(data.company.logoUrl)}" alt="${escapeHtml(data.company.name)}">` : `<b>${escapeHtml((data.company.commercialName || data.company.name).slice(0, 2).toUpperCase())}</b>`}
        <span>${escapeHtml(data.company.name)}</span>
      </div>
    </section>
    <section class="dashboard-grid wide-left">
      <article class="panel">
        <h3>Nueva cotizacion <span class="panel-label">Cliente real</span></h3>
        <form class="form-grid quotation-form" id="quotationForm">
          <label>Cliente <input name="customer" required list="customerOptions" placeholder="Nombre o razon social"></label>
          <label>Correo / contacto <input name="contact" type="email" placeholder="cliente@empresa.com"></label>
          <div class="quote-items span-2" data-quotation-items>
            <div class="quote-items-header">
              <b>Productos, servicios o materiales</b>
              <button class="mini-action success" type="button" data-add-quotation-item>Agregar item</button>
            </div>
            ${renderQuotationItemRow(1)}
          </div>
          <label>IVA %
            <select name="taxRate">
              <option value="19">19%</option>
              <option value="5">5%</option>
              <option value="0">0%</option>
            </select>
          </label>
          <label>Vigente hasta <input name="validUntil" type="date"></label>
          <label>Estado
            <select name="status">
              <option>Borrador</option>
              <option>Enviada</option>
              <option>Aceptada</option>
              <option>Rechazada</option>
            </select>
          </label>
          <label class="span-2">Notas <textarea name="notes" rows="3" placeholder="${palacios ? "Forma de pago, tiempos de entrega, sitio de obra, garantias" : "Alcance, tiempos de entrega, condiciones de pago o garantias"}"></textarea></label>
          <button class="primary-button" type="submit">Crear cotizacion</button>
        </form>
        <datalist id="customerOptions">
          ${(data.customers || []).map((item) => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.contact || item.phone || item.nit || "")}</option>`).join("")}
        </datalist>
        <datalist id="productServiceOptions">
          ${(data.inventory || []).map((item) => `<option value="${escapeHtml(item.name)}">${formatMoney(item.price)}</option>`).join("")}
          <option value="Desarrollo web"></option>
          <option value="Suite empresarial"></option>
          <option value="Automatizacion con IA"></option>
          <option value="Soporte tecnico"></option>
        </datalist>
      </article>
      <article class="panel">
        <h3>Flujo recomendado <span class="panel-label">Ventas</span></h3>
        <div class="timeline">
          <span><b>1. Cotizar</b><small>Producto, servicio, IVA y vigencia.</small></span>
          <span><b>2. Enviar</b><small>PDF o WhatsApp al cliente.</small></span>
          <span><b>3. Aprobar</b><small>Marcar como aceptada.</small></span>
          <span><b>4. Facturar</b><small>Convertir a venta en la siguiente fase.</small></span>
        </div>
      </article>
    </section>
    ${renderTable("Cotizaciones recientes", ["Numero", "Cliente", "Items", "Vigencia", "Estado", "Total", "Acciones"], quotations.map((item, index) => [
      item.id,
      item.customer,
      getQuotationSummary(item),
      item.validUntil || "Por definir",
      badge(item.status, item.status === "Aceptada" ? "good" : item.status === "Rechazada" ? "danger" : "info"),
      formatMoney(getQuotationTotal(item)),
      `${renderQuotationActions(item)} ${renderDeleteAction("quotations", index)}`
    ]))}
  `;
}

function renderQuotationItemRow(index) {
  return `
    <div class="quote-item-row" data-quotation-item-row>
      <label>Producto / servicio <input name="itemService" required list="productServiceOptions" placeholder="Item ${index}"></label>
      <label>Cantidad <input name="itemQuantity" required min="0.01" step="0.01" type="number" value="1"></label>
      <label>Valor unitario <input name="itemUnitPrice" required min="0" type="number" placeholder="0"></label>
      <button class="mini-action danger" type="button" data-remove-quotation-item>Eliminar</button>
    </div>
  `;
}

function renderDian() {
  const validated = data.invoices.filter((item) => item.dianStatus === "Validada").length;
  const pending = data.invoices.length - validated;
  const progress = data.invoices.length ? Math.round((validated / data.invoices.length) * 100) : 0;
  const nextInvoice = data.invoices.find((item) => item.dianStatus !== "Validada");

  return `
    <section class="summary-grid">
      ${metric("Proveedor", data.dian.provider, data.dian.environment)}
      ${metric("Facturas validadas", validated, `${progress}% del flujo`)}
      ${metric("Pendientes DIAN", pending, "Por enviar", pending ? "attention" : "")}
      ${metric("Resolucion", data.dian.resolution, `${data.dian.prefix} ${data.dian.range}`)}
    </section>
    <section class="hero-panel app-hero">
      <div>
        <p class="eyebrow">Proveedor tecnologico</p>
        <h2 class="balanced-title">Base lista para conectar factura electronica real.</h2>
        <p>Este modulo prepara la integracion con un proveedor autorizado: token API, resolucion, prefijo, CUFE, XML, QR y respuesta de validacion.</p>
        <div class="hero-actions">
          ${nextInvoice ? `<button class="primary-button" type="button" data-send-dian="${escapeHtml(nextInvoice.id)}">Enviar ${escapeHtml(nextInvoice.id)} a DIAN</button>` : ""}
          <button class="secondary-button" type="button" data-nav="invoices">Ver facturas</button>
        </div>
      </div>
      <div class="command-center">
        <span>Estado API</span>
        <strong>${escapeHtml(data.dian.apiStatus)}</strong>
        <div class="progress-track"><i style="width:${progress}%"></i></div>
        <small>${escapeHtml(data.dian.nextStep)}</small>
      </div>
    </section>
    <section class="dashboard-grid">
      <article class="panel">
        <h3>Configuracion DIAN <span class="panel-label">Preparado</span></h3>
        <form class="form-grid" id="dianForm">
          <label>Proveedor <input name="provider" value="${escapeHtml(data.dian.provider)}" required></label>
          <label>Ambiente
            <select name="environment">
              <option ${data.dian.environment === "Pruebas" ? "selected" : ""}>Pruebas</option>
              <option ${data.dian.environment === "Produccion" ? "selected" : ""}>Produccion</option>
            </select>
          </label>
          <label>Resolucion <input name="resolution" value="${escapeHtml(data.dian.resolution)}" required></label>
          <label>Prefijo <input name="prefix" value="${escapeHtml(data.dian.prefix)}" required></label>
          <label>Rango <input name="range" value="${escapeHtml(data.dian.range)}" required></label>
          <label>Estado API <input name="apiStatus" value="${escapeHtml(data.dian.apiStatus)}" required></label>
          <button class="primary-button span-2" type="submit">Guardar configuracion</button>
        </form>
      </article>
      <article class="panel">
        <h3>Validacion requerida <span class="panel-label">Checklist</span></h3>
        <div class="timeline">
          <span><b>1. Proveedor autorizado</b><small>Elegir API, ambiente de pruebas y token seguro.</small></span>
          <span><b>2. Resolucion DIAN</b><small>Prefijo, rango y numeracion habilitada.</small></span>
          <span><b>3. Documento electronico</b><small>Generar XML, CUFE, QR y firma digital.</small></span>
          <span><b>4. Respuesta</b><small>Guardar validacion, rechazo y trazabilidad.</small></span>
        </div>
      </article>
    </section>
    ${renderTable("Facturas para DIAN", ["Numero", "Cliente", "Estado", "CUFE", "Respuesta", "Accion"], data.invoices.map((item) => [
      item.id,
      item.customer,
      badge(item.dianStatus || "Por enviar", item.dianStatus === "Validada" ? "good" : "warn"),
      item.cufe || "Pendiente",
      item.dianResponse || "Sin respuesta",
      item.dianStatus !== "Validada" ? `<button class="mini-action success" type="button" data-send-dian="${escapeHtml(item.id)}">Enviar</button>` : `<button class="mini-action" type="button" data-nav="invoices">Ver</button>`
    ]))}
    ${renderTable("Eventos DIAN", ["Fecha", "Factura", "Evento", "Estado", "Respuesta"], data.dianEvents.map((item) => [
      item.date,
      item.invoice,
      item.event,
      badge(item.status, item.status === "Validada" ? "good" : "info"),
      item.response
    ]))}
  `;
}

function renderPos() {
  const totals = getTotals();
  return `
    <section class="summary-grid">
      ${metric("Venta caja", formatMoney(totals.posTotal + totals.posTax), "IVA incluido")}
      ${metric("Items", data.pos.cart.length, data.pos.register)}
      ${metric("Pagos registrados", formatMoney(data.pos.payments.reduce((sum, item) => sum + item.amount, 0)), "Hoy")}
    </section>
    <section class="dashboard-grid wide-left">
      <article class="panel">
        <h3>Agregar a la venta <span class="panel-label">Caja rapida</span></h3>
        <form class="invoice-row" id="posForm">
          <label>Producto <input name="name" required placeholder="Producto o servicio"></label>
          <label>Cant. <input name="quantity" required min="1" type="number" value="1"></label>
          <label>Precio <input name="price" required min="0" type="number" placeholder="0"></label>
          <button class="primary-button" type="submit">+</button>
        </form>
        <div class="quick-actions">
          <button class="quick-button" type="button" data-add-sample-pos>Producto rapido</button>
          <button class="quick-button danger" type="button" data-clear-pos>Limpiar</button>
        </div>
      </article>
      <article class="receipt">
        <h3>Ticket</h3>
        ${data.pos.cart.map((item) => `
          <div class="receipt-row"><span>${escapeHtml(item.name)} x${item.quantity}</span><b>${formatMoney(item.quantity * item.price)}</b></div>
        `).join("")}
        <div class="receipt-total"><span>Total</span><b>${formatMoney(totals.posTotal + totals.posTax)}</b></div>
      </article>
    </section>
  `;
}

function renderInventory() {
  const totals = getTotals();
  const kardexRows = getKardexRows();
  return `
    <section class="summary-grid">
      ${metric("Valor inventario", formatMoney(totals.inventoryValue), "Costo estimado")}
      ${metric("Referencias", data.inventory.length, "Productos y servicios")}
      ${metric("Stock bajo", totals.stockAlerts, "Requiere compra", totals.stockAlerts ? "attention" : "")}
    </section>
    <section class="panel">
      <h3>Nuevo producto <span class="panel-label">Inventario</span></h3>
      <form class="inventory-form" id="inventoryForm">
        <label>Nombre <input name="name" required placeholder="Producto"></label>
        <label>Stock <input name="stock" required min="0" type="number" value="1"></label>
        <label>Minimo <input name="min" required min="0" type="number" value="1"></label>
        <label>Costo <input name="cost" required min="0" type="number" placeholder="0"></label>
        <label>Precio <input name="price" required min="0" type="number" placeholder="0"></label>
        <button class="primary-button" type="submit">Guardar</button>
      </form>
    </section>
    ${renderTable("Kardex valorizado", ["Fecha", "Tipo", "Producto", "Cantidad", "Costo unit.", "Valor", "Saldo"], kardexRows.map((item) => [
      item.date,
      badge(item.type, item.type === "Entrada" ? "good" : "warn"),
      item.product,
      item.quantity,
      formatMoney(item.unitCost),
      formatMoney(item.totalCost),
      item.balance
    ]))}
    ${renderTable("Movimientos de inventario", ["Fecha", "Tipo", "Producto", "Cantidad", "Origen", "Acciones"], data.inventoryMovements.map((item, index) => [
      item.date,
      badge(item.type, item.type === "Entrada" ? "good" : "warn"),
      item.product,
      item.quantity,
      item.origin,
      renderDeleteAction("inventoryMovements", index)
    ]))}
    ${renderTable("Inventario activo", ["SKU", "Producto", "Stock", "Precio", "Acciones"], data.inventory.map((item, index) => [
      item.sku,
      item.name,
      `${item.stock} ${item.stock <= item.min ? badge("Bajo", "warn") : ""}`,
      formatMoney(item.price),
      renderDeleteAction("inventory", index)
    ]))}
  `;
}

function renderAccounting() {
  const totals = getTotals();
  const comparison = getAccountingComparison();
  const maxCompare = Math.max(comparison.current.income, comparison.current.expense, comparison.previous.income, comparison.previous.expense, 1);
  const resultTone = comparison.current.result < 0 ? "attention" : "";
  const insightTone = comparison.current.margin >= 25 ? "good" : comparison.current.margin >= 10 ? "warn" : "danger";
  const expenseCategories = Object.entries(comparison.current.categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return `
    <section class="summary-grid">
      ${metric("Ingresos", formatMoney(totals.income), "Movimientos positivos")}
      ${metric("Gastos", formatMoney(totals.expense), "Costos y egresos")}
      ${metric("Resultado", formatMoney(totals.balance), `${totals.margin}% margen`, totals.balance < 0 ? "attention" : "")}
      ${metric("Mes principal", getMonthLabel(comparison.current.monthKey), `${comparison.current.entries.length} movimientos`)}
    </section>
    <section class="panel comparison-controls">
      <div>
        <h3>Comparar meses <span class="panel-label">Ventas vs gastos</span></h3>
        <p>Elige dos meses y revisa ventas, gastos, utilidad, margen y categorias que mas pesan.</p>
      </div>
      <label>Mes principal
        <select data-accounting-month="primary">
          ${getAccountingMonthOptions(comparison.current.monthKey)}
        </select>
      </label>
      <label>Comparar contra
        <select data-accounting-month="secondary">
          ${getAccountingMonthOptions(comparison.previous.monthKey)}
        </select>
      </label>
    </section>
    <section class="hero-panel accounting-hero">
      <div>
        <p class="eyebrow">Comparativo contable</p>
        <h2>${getMonthLabel(comparison.current.monthKey)} vs ${getMonthLabel(comparison.previous.monthKey)}</h2>
        <p>Compara ventas, gastos y utilidad para saber si la empresa esta creciendo con rentabilidad o solo moviendo dinero.</p>
        <div class="accounting-kpis">
          <span><b>${comparison.changes.income}%</b><small>Variacion ventas</small></span>
          <span><b>${comparison.changes.expense}%</b><small>Variacion gastos</small></span>
          <span><b>${comparison.current.margin}%</b><small>Margen actual</small></span>
        </div>
      </div>
      <div class="comparison-bars">
        ${renderCompareBar(`Ventas ${getMonthLabel(comparison.current.monthKey)}`, comparison.current.income, maxCompare, "good")}
        ${renderCompareBar(`Ventas ${getMonthLabel(comparison.previous.monthKey)}`, comparison.previous.income, maxCompare, "soft")}
        ${renderCompareBar(`Gastos ${getMonthLabel(comparison.current.monthKey)}`, comparison.current.expense, maxCompare, "danger")}
        ${renderCompareBar(`Gastos ${getMonthLabel(comparison.previous.monthKey)}`, comparison.previous.expense, maxCompare, "soft")}
      </div>
    </section>
    <section class="summary-grid">
      ${metric("Ventas del mes", formatMoney(comparison.current.income), `${comparison.changes.income}% vs ${getMonthLabel(comparison.previous.monthKey)}`)}
      ${metric("Gastos del mes", formatMoney(comparison.current.expense), `${comparison.changes.expense}% vs ${getMonthLabel(comparison.previous.monthKey)}`, comparison.changes.expense > comparison.changes.income ? "attention" : "")}
      ${metric("Utilidad", formatMoney(comparison.current.result), `${comparison.changes.result}% vs ${getMonthLabel(comparison.previous.monthKey)}`, resultTone)}
      ${metric("Mayor gasto", formatMoney(comparison.current.topExpense[1]), comparison.current.topExpense[0], comparison.current.topExpense[1] > comparison.current.income * 0.35 ? "attention" : "")}
    </section>
    <section class="dashboard-grid">
      <article class="panel">
        <h3>Movimiento contable <span class="panel-label">Libro diario</span></h3>
        <form class="form-grid" id="accountingForm">
          <label>Fecha <input name="date" required type="date" value="${getToday()}"></label>
          <label>Detalle <input name="detail" required placeholder="Detalle"></label>
          <label>Cuenta <input name="account" required placeholder="Cuenta"></label>
          <label>Categoria <select name="category">
            <option>Ventas</option>
            <option>Servicios</option>
            <option>Inventario</option>
            <option>Nomina</option>
            <option>Administracion</option>
            <option>Marketing</option>
            <option>Impuestos</option>
            <option>Financiero</option>
          </select></label>
          <label>Tipo <select name="type"><option>Ingreso</option><option>Gasto</option></select></label>
          <label>Monto <input name="amount" required min="0" type="number" placeholder="0"></label>
          <button class="primary-button span-2" type="submit">Registrar movimiento</button>
        </form>
      </article>
      <article class="panel">
        <h3>Lectura financiera <span class="panel-label">${insightTone}</span></h3>
        <div class="progress-stack">
          <div class="progress-item"><span><b>Margen periodo</b><b>${comparison.current.margin}%</b></span><div class="progress-track"><i style="width:${Math.max(0, Math.min(100, comparison.current.margin))}%"></i></div></div>
          <div class="progress-item"><span><b>Gasto / ventas</b><b>${comparison.current.expenseRatio}%</b></span><div class="progress-track"><i style="width:${Math.min(100, comparison.current.expenseRatio)}%"></i></div></div>
        </div>
        <ul class="insight-list accounting-insights">
          <li><span>Diagnostico</span><b>${comparison.current.margin >= 20 ? "Rentable" : comparison.current.result > 0 ? "Ajustar margen" : "Perdida operativa"}</b></li>
          <li><span>Prioridad</span><b>${comparison.changes.expense > comparison.changes.income ? "Controlar gastos" : "Escalar ventas"}</b></li>
          <li><span>Punto de equilibrio</span><b>${formatMoney(comparison.current.expense)}</b></li>
        </ul>
      </article>
    </section>
    <section class="dashboard-grid wide-left">
      <article class="panel">
        <h3>Gastos por categoria <span class="panel-label">${getMonthLabel(comparison.current.monthKey)}</span></h3>
        <div class="progress-stack">
          ${expenseCategories.length ? expenseCategories.map(([category, amount]) => `
            <div class="progress-item">
              <span><b>${escapeHtml(category)}</b><b>${formatMoney(amount)}</b></span>
              <div class="progress-track"><i style="width:${comparison.current.expense ? Math.round((amount / comparison.current.expense) * 100) : 0}%"></i></div>
            </div>
          `).join("") : "<p>No hay gastos registrados en este periodo.</p>"}
        </div>
      </article>
      <article class="panel">
        <h3>Acciones sugeridas <span class="panel-label">Gerencia</span></h3>
        <ul class="insight-list">
          <li><span>Si gastos suben mas que ventas</span><b>revisar compras y nomina</b></li>
          <li><span>Si margen baja de 20%</span><b>subir precios o reducir costos</b></li>
          <li><span>Si ventas crecen con margen</span><b>invertir en el canal ganador</b></li>
        </ul>
      </article>
    </section>
    ${renderTable("Movimientos", ["Fecha", "Detalle", "Categoria", "Cuenta", "Tipo", "Monto", "Acciones"], data.accounting.map((item, index) => [
      getEntryDate(item, index),
      item.detail,
      item.category || item.account,
      item.account,
      badge(item.type, item.type === "Ingreso" ? "good" : "danger"),
      formatMoney(item.amount),
      renderDeleteAction("accounting", index)
    ]))}
  `;
}

function renderCompareBar(label, amount, max, tone) {
  return `
    <div class="compare-row ${tone}">
      <span><b>${escapeHtml(label)}</b><small>${formatMoney(amount)}</small></span>
      <div class="compare-track"><i style="width:${Math.max(4, Math.round((amount / max) * 100))}%"></i></div>
    </div>
  `;
}

function renderPalaciosAccounting() {
  const comparison = getAccountingComparison();
  const totals = getTotals();
  const entries = data.accounting || [];
  const sales = entries.filter((item) => item.type === "Ingreso" && ["Ventas", "Anticipos", "Servicios de obra"].includes(item.category)).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const purchases = entries.filter((item) => item.type === "Gasto" && ["Materiales", "Compras", "Herramientas y equipos"].includes(item.category)).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const pendingPay = entries.filter((item) => item.paymentStatus === "Pendiente" && item.type === "Gasto").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const pendingCollect = entries.filter((item) => item.paymentStatus === "Pendiente" && item.type === "Ingreso").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const projects = [...new Set(entries.map((item) => item.project).filter(Boolean))];
  const maxCompare = Math.max(comparison.current.income, comparison.current.expense, comparison.previous.income, comparison.previous.expense, 1);
  const expenseCategories = Object.entries(comparison.current.categories).sort((a, b) => b[1] - a[1]).slice(0, 6);

  return `
    <section class="hero-panel palacios-accounting-hero">
      <div>
        <p class="eyebrow">Contabilidad exclusiva</p>
        <h2>Control financiero de obras, compras, gastos y ventas.</h2>
        <p>Portal contable simplificado para Palacios Constructores: registra movimientos reales, clasifica por obra, identifica terceros, controla documentos y revisa utilidad mensual.</p>
        <div class="accounting-kpis">
          <span><b>${formatMoney(totals.income)}</b><small>Ingresos registrados</small></span>
          <span><b>${formatMoney(totals.expense)}</b><small>Gastos y compras</small></span>
          <span><b>${formatMoney(totals.balance)}</b><small>Resultado general</small></span>
        </div>
      </div>
      <div class="palacios-ledger-card">
        <strong>PALACIOS</strong>
        <span>Libro contable operativo</span>
        <small>${escapeHtml(data.company.nit)} · ${entries.length} movimientos</small>
      </div>
    </section>
    <section class="summary-grid">
      ${metric("Ventas / ingresos", formatMoney(sales || totals.income), "Facturacion, anticipos y servicios")}
      ${metric("Compras", formatMoney(purchases), "Materiales, herramientas y equipos", purchases > sales * 0.65 && sales ? "attention" : "")}
      ${metric("Por pagar", formatMoney(pendingPay), "Gastos pendientes", pendingPay ? "attention" : "")}
      ${metric("Por cobrar", formatMoney(pendingCollect), "Ingresos pendientes", pendingCollect ? "attention" : "")}
    </section>
    <section class="panel comparison-controls">
      <div>
        <h3>Comparativo mensual <span class="panel-label">Gerencia</span></h3>
        <p>Compara ingresos, compras, gastos y utilidad para tomar decisiones por periodo.</p>
      </div>
      <label>Mes principal
        <select data-accounting-month="primary">
          ${getAccountingMonthOptions(comparison.current.monthKey)}
        </select>
      </label>
      <label>Comparar contra
        <select data-accounting-month="secondary">
          ${getAccountingMonthOptions(comparison.previous.monthKey)}
        </select>
      </label>
    </section>
    <section class="dashboard-grid">
      <article class="panel">
        <h3>Nuevo movimiento <span class="panel-label">Palacios</span></h3>
        <form class="form-grid palacios-ledger-form" id="accountingForm">
          <label>Fecha <input name="date" required type="date" value="${getToday()}"></label>
          <label>Tipo <select name="type"><option>Gasto</option><option>Ingreso</option></select></label>
          <label>Concepto <input name="detail" required placeholder="Ej. Compra de cemento para obra"></label>
          <label>Tercero <input name="thirdParty" placeholder="Proveedor o cliente"></label>
          <label>Documento <input name="document" placeholder="Factura, recibo, remision"></label>
          <label>Obra / proyecto <input name="project" list="projectOptions" placeholder="Ej. Obra Villa Rica"></label>
          <label>Cuenta <input name="account" required placeholder="Caja, Banco, CxP, CxC"></label>
          <label>Categoria <select name="category">
            <option>Materiales</option>
            <option>Compras</option>
            <option>Mano de obra</option>
            <option>Transporte</option>
            <option>Herramientas y equipos</option>
            <option>Administracion</option>
            <option>Impuestos</option>
            <option>Ventas</option>
            <option>Anticipos</option>
            <option>Servicios de obra</option>
            <option>Financiero</option>
          </select></label>
          <label>Forma de pago <select name="paymentMethod"><option>Efectivo</option><option>Transferencia</option><option>Credito</option><option>Tarjeta</option><option>Cheque</option></select></label>
          <label>Estado <select name="paymentStatus"><option>Pagado</option><option>Pendiente</option><option>Parcial</option></select></label>
          <label>Monto <input name="amount" required min="0" type="number" placeholder="0"></label>
          <button class="primary-button span-2" type="submit">Guardar movimiento contable</button>
        </form>
        <datalist id="projectOptions">
          ${projects.map((item) => `<option value="${escapeHtml(item)}"></option>`).join("")}
        </datalist>
      </article>
      <article class="panel">
        <h3>Lectura del mes <span class="panel-label">${getMonthLabel(comparison.current.monthKey)}</span></h3>
        <div class="comparison-bars palacios-bars">
          ${renderCompareBar(`Ingresos ${getMonthLabel(comparison.current.monthKey)}`, comparison.current.income, maxCompare, "good")}
          ${renderCompareBar(`Gastos ${getMonthLabel(comparison.current.monthKey)}`, comparison.current.expense, maxCompare, "danger")}
          ${renderCompareBar(`Ingresos ${getMonthLabel(comparison.previous.monthKey)}`, comparison.previous.income, maxCompare, "soft")}
          ${renderCompareBar(`Gastos ${getMonthLabel(comparison.previous.monthKey)}`, comparison.previous.expense, maxCompare, "soft")}
        </div>
        <ul class="insight-list accounting-insights">
          <li><span>Utilidad del mes</span><b>${formatMoney(comparison.current.result)}</b></li>
          <li><span>Margen</span><b>${comparison.current.margin}%</b></li>
          <li><span>Mayor gasto</span><b>${escapeHtml(comparison.current.topExpense[0])}</b></li>
          <li><span>Obras activas</span><b>${projects.length}</b></li>
        </ul>
      </article>
    </section>
    <section class="dashboard-grid wide-left">
      <article class="panel">
        <h3>Gastos por categoria <span class="panel-label">Control de costos</span></h3>
        <div class="progress-stack">
          ${expenseCategories.length ? expenseCategories.map(([category, amount]) => `
            <div class="progress-item">
              <span><b>${escapeHtml(category)}</b><b>${formatMoney(amount)}</b></span>
              <div class="progress-track"><i style="width:${comparison.current.expense ? Math.round((amount / comparison.current.expense) * 100) : 0}%"></i></div>
            </div>
          `).join("") : "<p>No hay gastos registrados en este periodo.</p>"}
        </div>
      </article>
      <article class="panel">
        <h3>Alertas contables <span class="panel-label">Accion</span></h3>
        <ul class="insight-list">
          <li><span>Compras sobre ingresos</span><b>${sales ? Math.round((purchases / sales) * 100) : 0}%</b></li>
          <li><span>Pendiente por pagar</span><b>${formatMoney(pendingPay)}</b></li>
          <li><span>Pendiente por cobrar</span><b>${formatMoney(pendingCollect)}</b></li>
          <li><span>Recomendacion</span><b>${pendingCollect > pendingPay ? "priorizar cobro" : pendingPay ? "programar pagos" : "mantener control"}</b></li>
        </ul>
      </article>
    </section>
    ${renderTable("Libro contable Palacios", ["Fecha", "Concepto", "Tercero", "Documento", "Obra", "Categoria", "Tipo", "Estado", "Monto", "Acciones"], entries.map((item, index) => [
      getEntryDate(item, index),
      item.detail,
      item.thirdParty || "Sin tercero",
      item.document || "Sin documento",
      item.project || "General",
      item.category || item.account,
      badge(item.type, item.type === "Ingreso" ? "good" : "danger"),
      badge(item.paymentStatus || "Pagado", item.paymentStatus === "Pendiente" ? "warn" : "good"),
      formatMoney(item.amount),
      renderDeleteAction("accounting", index)
    ]))}
  `;
}

function renderDeleteAction(type, index, label = "Eliminar") {
  return `<button class="mini-action danger" type="button" data-delete-type="${escapeHtml(type)}" data-delete-index="${index}">${escapeHtml(label)}</button>`;
}

function renderPayroll() {
  const totals = getTotals();
  return `
    <section class="summary-grid">
      ${metric("Nomina base", formatMoney(totals.payroll), `${data.payroll.length} empleados`)}
      ${metric("Costo total", formatMoney(totals.payrollFull), "Con provision 28%")}
      ${metric("Promedio", formatMoney(data.payroll.length ? totals.payroll / data.payroll.length : 0), "Salario base")}
    </section>
    <section class="panel">
      <h3>Nuevo empleado <span class="panel-label">Nomina</span></h3>
      <form class="form-grid" id="payrollForm">
        <label>Nombre <input name="name" required placeholder="Nombre completo"></label>
        <label>Cargo <input name="role" required placeholder="Cargo"></label>
        <label>Salario <input name="salary" required min="0" type="number" placeholder="0"></label>
        <button class="primary-button" type="submit">Agregar empleado</button>
      </form>
    </section>
    ${renderTable("Equipo", ["Nombre", "Cargo", "Estado", "Salario", "Acciones"], data.payroll.map((item, index) => [
      item.name,
      item.role,
      badge(item.status),
      formatMoney(item.salary),
      renderDeleteAction("payroll", index)
    ]))}
  `;
}

function renderCustomers() {
  const customers = data.customers || [];
  return `
    <section class="summary-grid">
      ${metric("Clientes", customers.length, "Cuentas activas")}
      ${metric("Cartera", formatMoney(customers.reduce((sum, item) => sum + item.balance, 0)), "Por cobrar")}
      ${metric("NIT registrados", customers.filter((item) => item.nit).length, "Datos fiscales")}
    </section>
    <section class="panel">
      <h3>Nuevo cliente <span class="panel-label">Datos completos</span></h3>
      <form class="form-grid" id="customerForm">
        <label>Razon social / Nombre <input name="name" required placeholder="Cliente"></label>
        <label>NIT / Documento <input name="nit" required placeholder="901.000.000-0"></label>
        <label>Canal <input name="channel" required placeholder="Retail, mayorista..."></label>
        <label>Contacto <input name="contactName" placeholder="Persona encargada"></label>
        <label>Correo <input name="contact" required type="email" placeholder="correo@empresa.com"></label>
        <label>Telefono <input name="phone" required placeholder="3001234567"></label>
        <label>Ciudad <input name="city" placeholder="Ciudad"></label>
        <label>Direccion <input name="address" placeholder="Direccion comercial"></label>
        <label>Notas <textarea name="notes" rows="3" placeholder="Condiciones, preferencias o informacion adicional"></textarea></label>
        <button class="primary-button" type="submit">Guardar cliente</button>
      </form>
    </section>
    ${renderTable("Clientes activos", ["Cliente", "NIT", "Canal", "Contacto", "Telefono", "Ciudad", "Cartera", "Acciones"], customers.map((item, index) => [
      item.name,
      item.nit || "Pendiente",
      item.channel,
      item.contact ? `${item.contactName ? `${item.contactName} - ` : ""}${item.contact}` : "Pendiente",
      item.phone || "Pendiente",
      item.city || "Pendiente",
      formatMoney(item.balance),
      renderDeleteAction("customers", index)
    ]))}
  `;
}

function renderSuppliers() {
  const suppliers = data.suppliers || [];
  return `
    <section class="summary-grid">
      ${metric("Proveedores", suppliers.length, "Terceros activos")}
      ${metric("Categorias", new Set(suppliers.map((item) => item.category)).size, "Tipos de compra")}
      ${metric("Con NIT", suppliers.filter((item) => item.nit).length, "Identificados")}
    </section>
    <section class="panel">
      <h3>Nuevo proveedor <span class="panel-label">Compras</span></h3>
      <form class="form-grid" id="supplierForm">
        <label>Razon social <input name="name" required placeholder="Proveedor"></label>
        <label>NIT / Documento <input name="nit" required placeholder="900.000.000-0"></label>
        <label>Categoria <input name="category" required placeholder="Inventario, tecnologia, servicios..."></label>
        <label>Contacto <input name="contactName" placeholder="Persona encargada"></label>
        <label>Correo <input name="email" required type="email" placeholder="proveedor@empresa.com"></label>
        <label>Telefono <input name="phone" required placeholder="3001234567"></label>
        <label>Ciudad <input name="city" placeholder="Ciudad"></label>
        <label>Direccion <input name="address" placeholder="Direccion"></label>
        <label>Condiciones de pago <input name="paymentTerms" placeholder="Contado, 15 dias, 30 dias..."></label>
        <label>Estado
          <select name="status">
            <option>Activo</option>
            <option>En revision</option>
            <option>Inactivo</option>
          </select>
        </label>
        <label>Notas <textarea name="notes" rows="3" placeholder="Productos, acuerdos, documentos pendientes"></textarea></label>
        <button class="primary-button" type="submit">Guardar proveedor</button>
      </form>
    </section>
    ${renderTable("Proveedores registrados", ["Proveedor", "NIT", "Categoria", "Contacto", "Telefono", "Pago", "Estado", "Acciones"], suppliers.map((item, index) => [
      item.name,
      item.nit || "Pendiente",
      item.category || "General",
      item.email ? `${item.contactName ? `${item.contactName} - ` : ""}${item.email}` : "Pendiente",
      item.phone || "Pendiente",
      item.paymentTerms || "Sin definir",
      badge(item.status || "Activo"),
      renderDeleteAction("suppliers", index)
    ]))}
  `;
}

function renderReports() {
  const totals = getTotals();
  return `
    <section class="dashboard-grid">
      <article class="panel">
        <h3>Resumen ejecutivo <span class="panel-label">Gerencia</span></h3>
        <ul class="insight-list">
          <li><span>Facturacion total</span><b>${formatMoney(totals.sales)}</b></li>
          <li><span>Resultado contable</span><b>${formatMoney(totals.balance)}</b></li>
          <li><span>Inventario valorizado</span><b>${formatMoney(totals.inventoryValue)}</b></li>
          <li><span>Costo mensual de nomina</span><b>${formatMoney(totals.payrollFull)}</b></li>
        </ul>
      </article>
      <article class="panel">
        <h3>Semaforo operativo <span class="panel-label">Riesgo</span></h3>
        <div class="score-grid">
          <span><b>${totals.margin > 20 ? "A" : "B"}</b><small>Finanzas</small></span>
          <span><b>${totals.stockAlerts ? "B" : "A"}</b><small>Inventario</small></span>
          <span><b>${totals.pending ? "B" : "A"}</b><small>Cartera</small></span>
        </div>
      </article>
    </section>
  `;
}

function getAssistantInsights() {
  const totals = getTotals();
  const lowStock = data.inventory.filter((item) => item.stock <= item.min);
  const pendingInvoices = data.invoices.filter((item) => item.status !== "Pagada");
  const monthlyPayrollWeight = totals.income ? Math.round((totals.payrollFull / totals.income) * 100) : 0;
  const insights = [
    {
      title: pendingInvoices.length ? "Priorizar cartera" : "Cartera controlada",
      area: "Finanzas",
      tone: pendingInvoices.length ? "warn" : "good",
      detail: pendingInvoices.length
        ? `Hay ${pendingInvoices.length} factura(s) pendiente(s) por ${formatMoney(totals.pending)}.`
        : "No hay facturas pendientes.",
      action: pendingInvoices.length ? "Enviar recordatorio de pago" : "Mantener seguimiento semanal"
    },
    {
      title: lowStock.length ? "Reponer inventario" : "Inventario estable",
      area: "Inventario",
      tone: lowStock.length ? "warn" : "good",
      detail: lowStock.length
        ? `${lowStock.length} referencia(s) estan bajo el minimo definido.`
        : "No hay productos por debajo del stock minimo.",
      action: lowStock.length ? "Crear orden de compra sugerida" : "Actualizar costos y precios"
    },
    {
      title: totals.margin >= 20 ? "Margen saludable" : "Revisar rentabilidad",
      area: "Contabilidad",
      tone: totals.margin >= 20 ? "good" : "danger",
      detail: `El margen operativo estimado es ${totals.margin}%.`,
      action: totals.margin >= 20 ? "Escalar ventas de productos rentables" : "Reducir gastos o ajustar precios"
    },
    {
      title: monthlyPayrollWeight <= 65 ? "Nomina sostenible" : "Nomina pesada",
      area: "Nomina",
      tone: monthlyPayrollWeight <= 65 ? "good" : "warn",
      detail: `La nomina total equivale al ${monthlyPayrollWeight}% de los ingresos registrados.`,
      action: monthlyPayrollWeight <= 65 ? "Planear incentivos por venta" : "Revisar turnos, comisiones y carga laboral"
    }
  ];

  return insights;
}

function renderAssistant() {
  const totals = getTotals();
  const insights = getAssistantInsights();
  const score = Math.max(0, Math.min(100, 72 + (totals.margin > 20 ? 8 : -10) - (totals.stockAlerts * 4) - (totals.pending > 0 ? 6 : 0)));

  return `
    <section class="hero-panel app-hero">
      <div>
        <p class="eyebrow">Copiloto Quantrox</p>
        <h2>Decisiones claras antes de que el problema crezca.</h2>
        <p>El asistente convierte ventas, cartera, inventario, contabilidad y nomina en acciones listas para ejecutar.</p>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-generate-plan>Generar plan de accion</button>
          <button class="secondary-button" type="button" data-nav="reports">Ver reportes</button>
        </div>
      </div>
      <div class="command-center">
        <span>Salud operativa</span>
        <strong>${score}/100</strong>
        <div class="progress-track"><i style="width:${score}%"></i></div>
        <small>${escapeHtml(data.assistant.focus)}</small>
      </div>
    </section>

    <section class="summary-grid">
      ${metric("Alertas activas", insights.filter((item) => item.tone !== "good").length, "Prioridad operativa")}
      ${metric("Cartera", formatMoney(totals.pending), "Pendiente por cobrar", totals.pending ? "attention" : "")}
      ${metric("Stock bajo", totals.stockAlerts, "Referencias criticas", totals.stockAlerts ? "attention" : "")}
      ${metric("Margen", `${totals.margin}%`, "Resultado operativo")}
    </section>

    <section class="assistant-grid">
      ${insights.map((item) => `
        <article class="assistant-card ${item.tone}">
          <span class="panel-label">${escapeHtml(item.area)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.detail)}</p>
          <button class="quick-button" type="button" data-add-task="${escapeHtml(item.action)}">${escapeHtml(item.action)}</button>
        </article>
      `).join("")}
    </section>

    <section class="dashboard-grid">
      <article class="panel">
        <h3>Playbooks automaticos <span class="panel-label">Automatizacion</span></h3>
        <div class="playbook-list">
          ${data.playbooks.map((item) => `
            <div class="playbook-item">
              <span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.area)} - ${escapeHtml(item.impact)}</small></span>
              ${badge(item.enabled ? "Activo" : "Listo", item.enabled ? "good" : "info")}
            </div>
          `).join("")}
        </div>
      </article>
      <article class="panel">
        <h3>Proxima evolucion <span class="panel-label">IA real</span></h3>
        <ul class="insight-list">
          <li><span>Motor actual</span><b>Reglas de negocio</b></li>
          <li><span>Con base cloud</span><b>Analisis historico</b></li>
          <li><span>Con IA</span><b>Prediccion y recomendaciones</b></li>
          <li><span>Accion esperada</span><b>Tareas automaticas</b></li>
        </ul>
      </article>
    </section>
  `;
}

function renderGrowth() {
  const totals = getTotals();
  const activeAdvantages = data.advantages.filter((item) => item.status === "Activo" || item.status === "Listo").length;
  const readyCompliance = data.compliance.filter((item) => item.status === "Preparado").length;
  const readyIntegrations = data.integrations.filter((item) => item.status === "Activo").length;

  return `
    <section class="hero-panel app-hero">
      <div>
        <p class="eyebrow">Estrategia producto</p>
        <h2 class="balanced-title">Una suite que anticipa, recomienda y automatiza.</h2>
        <p>La apuesta de Quantrox es combinar operacion, cumplimiento, datos en nube, portal del cliente e inteligencia accionable en una sola experiencia.</p>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-nav="assistant">Abrir asistente</button>
          <button class="secondary-button" type="button" data-nav="settings">Preparar cloud</button>
        </div>
      </div>
      <div class="command-center">
        <span>Diferenciadores activos</span>
        <strong>${activeAdvantages}/${data.advantages.length}</strong>
        <div class="progress-track"><i style="width:${Math.round((activeAdvantages / data.advantages.length) * 100)}%"></i></div>
        <small>Meta: suite inteligente, modular y multiempresa</small>
      </div>
    </section>

    <section class="summary-grid">
      ${metric("Cumplimiento", `${readyCompliance}/${data.compliance.length}`, "Flujos preparados")}
      ${metric("Integraciones", `${readyIntegrations}/${data.integrations.length}`, "Conectores activos")}
      ${metric("Automatizaciones", data.playbooks.length, "Playbooks operativos")}
      ${metric("Valor medido", formatMoney(totals.pending + totals.inventoryValue), "Cartera + inventario")}
    </section>

    <section class="assistant-grid">
      ${data.advantages.map((item) => `
        <article class="assistant-card ${item.status === "Activo" ? "good" : ""}">
          <span class="panel-label">${escapeHtml(item.category)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.value)}</p>
          ${badge(item.status, item.status === "Activo" ? "good" : "info")}
        </article>
      `).join("")}
    </section>

    <section class="dashboard-grid">
      ${renderMiniTable("Checklist de cumplimiento", ["Flujo", "Responsable", "Estado"], data.compliance.map((item) => [
        item.item,
        item.owner,
        badge(item.status, item.status === "Preparado" ? "good" : "warn")
      ]))}
      ${renderMiniTable("Mapa de integraciones", ["Canal", "Uso", "Estado"], data.integrations.map((item) => [
        item.name,
        item.use,
        badge(item.status, item.status === "Activo" ? "good" : "info")
      ]))}
    </section>

    <section class="panel">
      <h3>Promesa comercial <span class="panel-label">Para clientes</span></h3>
      <div class="value-ladder">
        <span><b>1. Operar</b><small>Facturacion, POS, inventario, contabilidad, nomina y clientes.</small></span>
        <span><b>2. Controlar</b><small>Roles, datos en nube, auditoria y reportes por empresa.</small></span>
        <span><b>3. Anticipar</b><small>Asistente, alertas, tareas y recomendaciones antes del problema.</small></span>
        <span><b>4. Automatizar</b><small>Pagos, DIAN, WhatsApp, e-commerce y playbooks inteligentes.</small></span>
      </div>
    </section>
  `;
}

function renderPortal() {
  const pendingInvoices = data.invoices.filter((item) => item.status !== "Pagada");
  const paidInvoices = data.invoices.filter((item) => item.status === "Pagada");
  const portalUrl = `https://clientes.quantroxsystems.cloud/${encodeURIComponent(data.company.nit.replaceAll(".", "").replaceAll("-", ""))}`;

  return `
    <section class="hero-panel portal-hero">
      <div>
        <p class="eyebrow">Portal compartible</p>
        <h2 class="balanced-title">Un espacio para que tus clientes consulten, paguen y pidan soporte.</h2>
        <p>Este portal prepara la experiencia externa: facturas, pagos, historial, soporte WhatsApp y estado de cuenta desde un enlace unico por empresa.</p>
        <div class="hero-actions">
          <a class="primary-button" href="https://wa.me/573218247072?text=Hola,%20quiero%20activar%20el%20portal%20de%20clientes%20Quantrox" target="_blank" rel="noopener">Activar portal</a>
          <button class="secondary-button" type="button" data-nav="invoices">Ver facturas</button>
        </div>
      </div>
      <div class="portal-preview">
        <span>${escapeHtml(data.company.commercialName || data.company.name)}</span>
        <strong>Estado de cuenta</strong>
        <small>${escapeHtml(portalUrl)}</small>
        <div class="portal-line"><span>Pendiente</span><b>${formatMoney(pendingInvoices.reduce((sum, item) => sum + item.subtotal + item.tax, 0))}</b></div>
        <div class="portal-line"><span>Pagado</span><b>${formatMoney(paidInvoices.reduce((sum, item) => sum + item.subtotal + item.tax, 0))}</b></div>
      </div>
    </section>

    <section class="summary-grid">
      ${metric("Clientes", data.customers.length, "Con acceso potencial")}
      ${metric("Facturas pendientes", pendingInvoices.length, "Para cobro digital", pendingInvoices.length ? "attention" : "")}
      ${metric("Link de pago", "Listo", "Integracion preparada")}
      ${metric("Soporte", "WhatsApp", "Canal conectado")}
    </section>

    <section class="dashboard-grid">
      <article class="panel">
        <h3>Experiencia del cliente <span class="panel-label">Portal</span></h3>
        <div class="value-ladder">
          <span><b>Consultar</b><small>Facturas, pagos e historial comercial.</small></span>
          <span><b>Pagar</b><small>Link de pago cuando conectemos pasarela.</small></span>
          <span><b>Soporte</b><small>WhatsApp directo con contexto de factura.</small></span>
          <span><b>Recomprar</b><small>Pedidos recurrentes conectados al inventario.</small></span>
        </div>
      </article>
      ${renderMiniTable("Facturas visibles en portal", ["Numero", "Cliente", "Estado", "Total"], data.invoices.map((item) => [
        item.id,
        item.customer,
        badge(item.status, item.status === "Pagada" ? "good" : "warn"),
        formatMoney(getInvoiceTotal(item))
      ]))}
      ${renderMiniTable("Acciones de cobro", ["Factura", "Canal", "Accion"], pendingInvoices.map((item) => [
        item.id,
        "WhatsApp + pago",
        renderInvoiceActions(item)
      ]))}
    </section>
  `;
}

function renderAutomations() {
  const activeAutomations = data.automations.filter((item) => item.status === "Activo").length;

  return `
    <section class="hero-panel app-hero">
      <div>
        <p class="eyebrow">Centro de automatizacion</p>
        <h2 class="balanced-title">Menos digitacion, mas operacion conectada.</h2>
        <p>Quantrox puede ejecutar tareas al crear facturas, bajar stock, detectar cartera, vender online o cerrar caja.</p>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-run-automation>Simular automatizaciones</button>
          <button class="secondary-button" type="button" data-nav="portal">Abrir portal</button>
        </div>
      </div>
      <div class="command-center">
        <span>Automatizaciones activas</span>
        <strong>${activeAutomations}/${data.automations.length}</strong>
        <div class="progress-track"><i style="width:${Math.round((activeAutomations / data.automations.length) * 100)}%"></i></div>
        <small>WhatsApp, pagos, e-commerce y DIAN</small>
      </div>
    </section>

    <section class="assistant-grid">
      ${data.automations.map((item) => `
        <article class="assistant-card ${item.status === "Activo" ? "good" : ""}">
          <span class="panel-label">${escapeHtml(item.trigger)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.action)}</p>
          ${badge(item.status, item.status === "Activo" ? "good" : item.status === "Listo" ? "info" : "warn")}
        </article>
      `).join("")}
    </section>

    <section class="dashboard-grid">
      ${renderMiniTable("Integraciones clave", ["Canal", "Uso", "Estado"], data.integrations.map((item) => [
        item.name,
        item.use,
        badge(item.status, item.status === "Activo" ? "good" : "info")
      ]))}
      <article class="panel">
        <h3>Desarrollo a medida <span class="panel-label">Quantrox Lab</span></h3>
        <div class="timeline">
          <span><b>Diagnostico</b><small>Mapeamos el flujo real del cliente.</small></span>
          <span><b>Modulo propio</b><small>Campos, reglas, reportes y roles a medida.</small></span>
          <span><b>Integracion</b><small>Pagos, WhatsApp, tienda online, bancos o ERP externo.</small></span>
          <span><b>Soporte</b><small>Mejora continua por version del cliente.</small></span>
        </div>
      </article>
    </section>
  `;
}

function renderMiniTable(title, headers, rows) {
  return `
    <article class="panel table-panel">
      <h3>${escapeHtml(title)} <span class="panel-label">${rows.length} items</span></h3>
      <div class="table mini-table" style="--cols:${headers.length}">
        <div class="table-row header">${headers.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        ${rows.map((row) => `<div class="table-row">${row.map((item) => `<span>${item}</span>`).join("")}</div>`).join("")}
      </div>
    </article>
  `;
}

function renderSettings() {
  const cloudConfigured = isCloudConfigured();
  const manager = canManageCompanyData();
  const cloudSteps = [
    { label: "Credenciales", value: cloudConfigured ? "Listas" : "Pendientes", tone: cloudConfigured ? "good" : "warn" },
    { label: "Sesion", value: cloudSession ? "Activa" : "Local", tone: cloudSession ? "good" : "info" },
    { label: "Usuario cloud", value: cloudSession?.user?.email || "Sin sesion", tone: cloudSession ? "good" : "warn" },
    { label: "Empresa cloud", value: data.company.id ? "Vinculada" : "Sin ID", tone: data.company.id ? "good" : "warn" },
    { label: "Pendientes", value: Number(data.cloud.pendingSync || 0), tone: Number(data.cloud.pendingSync || 0) ? "warn" : "good" },
    { label: "Borrados pendientes", value: getDeletedRecords().filter((record) => record.pending && record.companyId === data.company.id).length, tone: getDeletedRecords().some((record) => record.pending && record.companyId === data.company.id) ? "warn" : "good" }
  ];

  return `
    <section class="summary-grid">
      ${metric("Modo de datos", data.cloud.mode, "Operando en este dispositivo")}
      ${metric("Usuarios", data.users.length, "Roles preparados")}
      ${metric("Base recomendada", "Supabase", "PostgreSQL multiempresa")}
      ${metric("Respaldo", "Pendiente", data.cloud.lastBackup, "attention")}
    </section>
    <section class="dashboard-grid">
      <article class="panel">
        <h3>Empresa <span class="panel-label">Perfil</span></h3>
        <form class="form-grid" id="settingsForm">
          <label>Empresa <input name="name" value="${escapeHtml(data.company.name)}" required></label>
          <label>NIT <input name="nit" value="${escapeHtml(data.company.nit)}" required></label>
          <label>Ciudad <input name="city" value="${escapeHtml(data.company.city)}" required></label>
          <label>Correo <input name="email" value="${escapeHtml(data.company.email)}" required type="email"></label>
          <label>Nombre comercial <input name="commercialName" value="${escapeHtml(data.company.commercialName || data.company.name)}" required></label>
          <label>Sector <input name="industry" value="${escapeHtml(data.company.industry || "Servicios")}" required></label>
          <label>Color de marca
            <select name="accent">
              <option value="#f59e0b" ${data.company.accent === "#f59e0b" || data.company.accent === "#0f766e" ? "selected" : ""}>Oro Quantrox</option>
              <option value="#4b5563" ${data.company.accent === "#4b5563" ? "selected" : ""}>Gris metalico</option>
              <option value="#111827" ${data.company.accent === "#111827" ? "selected" : ""}>Negro ejecutivo</option>
              <option value="#c2410c" ${data.company.accent === "#c2410c" ? "selected" : ""}>Naranja comercio</option>
            </select>
          </label>
          <label>Logo empresa <input name="logoUrl" value="${escapeHtml(data.company.logoUrl || "")}" placeholder="https://.../logo.png"></label>
          <label>Color cotizacion <input name="quoteAccent" value="${escapeHtml(data.company.quoteAccent || data.company.accent || "#f59e0b")}" type="color"></label>
          <label class="span-2">Texto final cotizacion <textarea name="quoteFooter" rows="3" placeholder="Condiciones comerciales, pago, garantias">${escapeHtml(data.company.quoteFooter || "")}</textarea></label>
          <button class="primary-button span-2" type="submit">Actualizar empresa</button>
        </form>
      </article>
      <article class="panel">
        <h3>Base de datos <span class="panel-label">Produccion</span></h3>
        <ul class="insight-list">
          <li><span>Estado actual</span><b>${escapeHtml(data.cloud.syncStatus)}</b></li>
          <li><span>Backend recomendado</span><b>${escapeHtml(data.cloud.database)}</b></li>
          <li><span>Seguridad</span><b>RLS por empresa</b></li>
          <li><span>Modelo</span><b>Multiempresa por tenant</b></li>
          <li><span>Ultima sync</span><b>${escapeHtml(data.cloud.lastSync || "Sin sincronizar")}</b></li>
        </ul>
      </article>
    </section>
    <section class="panel">
      <h3>Activacion Supabase <span class="panel-label">Cloud real</span></h3>
      <div class="cloud-checks">
        ${cloudSteps.map((item) => `
          <span>
            <b>${escapeHtml(item.label)}</b>
            ${badge(String(item.value), item.tone)}
          </span>
        `).join("")}
      </div>
      <div class="quick-actions">
        <a class="quick-button" href="https://supabase.com/dashboard/projects" target="_blank" rel="noopener">Abrir Supabase</a>
        <button class="quick-button" type="button" data-add-task="Configurar cloud-config.js con URL y anon key de Supabase">Crear tarea cloud</button>
      </div>
    </section>
    ${manager ? `
      <section class="panel danger-zone">
        <div>
          <h3>Limpieza de empresa <span class="panel-label">Administrador</span></h3>
          <p>Elimina productos, clientes, proveedores, facturas, movimientos, contabilidad, nomina, tareas e historial operativo de esta empresa. No elimina la empresa ni el usuario.</p>
        </div>
        <form class="form-grid" id="clearCompanyForm">
          <label>Confirmacion <input name="confirm" required placeholder="Escribe LIMPIAR"></label>
          <button class="secondary-button danger" type="submit">Eliminar datos operativos</button>
        </form>
      </section>
    ` : ""}
    <section class="dashboard-grid">
      <article class="panel">
        <h3>Usuarios y roles <span class="panel-label">Accesos</span></h3>
        <form class="form-grid" id="userForm">
          <label>Nombre <input name="name" required placeholder="Nombre"></label>
          <label>Correo <input name="email" required type="email" placeholder="usuario@empresa.com"></label>
          <label>Rol
            <select name="role">
              <option>Administrador</option>
              <option>Contador</option>
              <option>Cajero</option>
              <option>Inventario</option>
              <option>Gerencia</option>
            </select>
          </label>
          <button class="primary-button" type="submit">Agregar usuario</button>
        </form>
      </article>
      <article class="panel">
        <h3>Ruta a produccion <span class="panel-label">Siguiente</span></h3>
        <div class="timeline">
          <span><b>1. Crear Supabase</b><small>Proyecto, region y claves anonimas publicas.</small></span>
          <span><b>2. Ejecutar SQL</b><small>Tablas, indices y politicas por empresa.</small></span>
          <span><b>3. Conectar autenticacion</b><small>Usuarios reales con roles y permisos.</small></span>
          <span><b>4. Activar facturacion</b><small>Proveedor autorizado por API para DIAN.</small></span>
        </div>
      </article>
    </section>
    ${renderTable("Accesos preparados", ["Nombre", "Correo", "Rol", "Estado"], data.users.map((item) => [
      item.name,
      item.email,
      item.role,
      badge(item.status, item.status === "Activo" ? "good" : "warn")
    ]))}
    ${renderTable("Historial de cambios", ["Fecha", "Usuario", "Modulo", "Accion", "Detalle"], (data.activityLogs || []).slice(0, 25).map((item) => [
      formatDateTime(item.date),
      item.user,
      item.area,
      badge(item.action, "info"),
      item.detail
    ]))}
    ${renderTable("Checklist DIAN y documentos", ["Documento", "Responsable", "Estado"], data.compliance.map((item) => [
      item.item,
      item.owner,
      badge(item.status, ["Listo", "Activo", "Interfaz lista"].includes(item.status) ? "good" : "warn")
    ]))}
  `;
}

function renderTable(title, headers, rows) {
  return `
    <section class="panel table-panel">
      <h3>${escapeHtml(title)} <span class="panel-label">${rows.length} registros</span></h3>
      <div class="table" style="--cols:${headers.length}">
        <div class="table-row header">${headers.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        ${rows.map((row) => `<div class="table-row">${row.map((item) => `<span>${item}</span>`).join("")}</div>`).join("")}
      </div>
    </section>
  `;
}

function bindShellEvents() {
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      activeModule = button.dataset.nav;
      render();
    });
  });

  document.querySelector("[data-action='logout']").addEventListener("click", () => {
    logout();
  });
}

function bindModuleEvents() {
  const formHandlers = {
    async invoiceForm(event) {
      const form = new FormData(event.currentTarget);
      const sku = String(form.get("productSku"));
      const quantity = Number(form.get("quantity"));
      const product = getProductBySku(sku);

      if (!product) {
        window.alert("Selecciona un producto valido del inventario.");
        return;
      }

      if (quantity > product.stock) {
        await addTask(`Revisar stock insuficiente de ${product.name}`);
        saveData();
        window.alert(`Stock insuficiente. ${product.name} tiene ${product.stock} unidad(es) disponibles.`);
        return;
      }

      const invoiceNumber = `FE-${1049 + data.invoices.length}`;
      const subtotal = product.price * quantity;
      product.stock -= quantity;
      const invoice = {
        id: invoiceNumber,
        customer: String(form.get("customer")).trim(),
        product: product.name,
        sku: product.sku,
        quantity,
        status: String(form.get("status")),
        date: new Date().toISOString().slice(0, 10),
        subtotal,
        tax: Math.round(subtotal * 0.19),
        dianStatus: "Por enviar",
        paymentLink: `https://pay.quantroxsystems.cloud/${invoiceNumber}`
      };
      const inventoryMovement = {
        date: new Date().toISOString().slice(0, 10),
        type: "Salida",
        product: product.name,
        quantity,
        origin: `Factura ${invoiceNumber}`
      };
      const accountingEntry = {
        detail: `Venta ${invoiceNumber} - ${product.name}`,
        account: "Ingresos",
        category: "Ventas",
        type: "Ingreso",
        amount: subtotal,
        date: invoice.date
      };

      data.invoices.unshift(invoice);
      data.inventoryMovements.unshift(inventoryMovement);
      data.accounting.unshift(accountingEntry);

      try {
        await syncInvoiceToCloud(invoice, product, inventoryMovement, accountingEntry);
      } catch (error) {
        cloudError = error.message || "No se pudo sincronizar la factura.";
        data.cloud.syncStatus = "Factura guardada localmente, sincronizacion pendiente";
      }
      await recordActivity("Facturacion", "Factura creada", `${invoice.id} vendio ${quantity} x ${product.name}`);
    },
    async quotationForm(event) {
      const form = new FormData(event.currentTarget);
      const quotationNumber = `CT-${1001 + (data.quotations || []).length}`;
      const services = form.getAll("itemService").map((item) => String(item).trim());
      const quantities = form.getAll("itemQuantity").map((item) => Number(item));
      const unitPrices = form.getAll("itemUnitPrice").map((item) => Number(item));
      const items = services.map((service, index) => ({
        service,
        quantity: quantities[index] || 0,
        unitPrice: unitPrices[index] || 0
      })).filter((item) => item.service && item.quantity > 0);

      if (!items.length) {
        throw new Error("Agrega al menos un producto o servicio a la cotizacion.");
      }

      const quotation = {
        id: quotationNumber,
        customer: String(form.get("customer")).trim(),
        contact: String(form.get("contact")).trim(),
        service: items[0].service,
        items,
        taxRate: Number(form.get("taxRate")),
        status: String(form.get("status")),
        validUntil: String(form.get("validUntil") || ""),
        date: getToday(),
        notes: String(form.get("notes")).trim()
      };

      data.quotations = data.quotations || [];
      data.quotations.unshift(quotation);
      await syncQuotationToCloud(quotation);
      await recordActivity("Cotizaciones", "Cotizacion creada", `${quotation.id} para ${quotation.customer}`);
    },
    async dianForm(event) {
      const form = new FormData(event.currentTarget);
      data.dian.provider = String(form.get("provider")).trim();
      data.dian.environment = String(form.get("environment"));
      data.dian.resolution = String(form.get("resolution")).trim();
      data.dian.prefix = String(form.get("prefix")).trim();
      data.dian.range = String(form.get("range")).trim();
      data.dian.apiStatus = String(form.get("apiStatus")).trim();
      data.dian.lastResponse = "Configuracion actualizada";
      await recordActivity("DIAN", "Configuracion actualizada", `${data.dian.provider} en ${data.dian.environment}`);
    },
    async posForm(event) {
      const form = new FormData(event.currentTarget);
      data.pos.cart.push({
        sku: `POS-${Date.now().toString().slice(-4)}`,
        name: String(form.get("name")).trim(),
        quantity: Number(form.get("quantity")),
        price: Number(form.get("price"))
      });
      await recordActivity("POS", "Item agregado", String(form.get("name")).trim());
    },
    async inventoryForm(event) {
      const form = new FormData(event.currentTarget);
      const product = {
        sku: `PRD-${String(data.inventory.length + 1).padStart(3, "0")}`,
        name: String(form.get("name")).trim(),
        stock: Number(form.get("stock")),
        min: Number(form.get("min")),
        cost: Number(form.get("cost")),
        price: Number(form.get("price"))
      };
      data.inventory.unshift(product);
      await syncProductToCloud(product);
      await recordActivity("Inventario", "Producto creado", `${product.sku} - ${product.name}`);
    },
    async accountingForm(event) {
      const form = new FormData(event.currentTarget);
      const entry = {
        date: String(form.get("date") || getToday()),
        detail: String(form.get("detail")).trim(),
        account: String(form.get("account")).trim(),
        category: String(form.get("category") || form.get("account")).trim(),
        type: String(form.get("type")),
        amount: Number(form.get("amount")),
        thirdParty: String(form.get("thirdParty") || "").trim(),
        document: String(form.get("document") || "").trim(),
        project: String(form.get("project") || "").trim(),
        paymentMethod: String(form.get("paymentMethod") || "").trim(),
        paymentStatus: String(form.get("paymentStatus") || "Pagado").trim()
      };
      data.accounting.unshift(entry);
      await syncAccountingEntryToCloud(entry);
      await recordActivity("Contabilidad", "Movimiento registrado", `${entry.type}: ${entry.detail}`);
    },
    async payrollForm(event) {
      const form = new FormData(event.currentTarget);
      const employee = {
        name: String(form.get("name")).trim(),
        role: String(form.get("role")).trim(),
        salary: Number(form.get("salary")),
        status: "Activa"
      };
      data.payroll.push(employee);
      await syncEmployeeToCloud(employee);
      await recordActivity("Nomina", "Empleado agregado", employee.name);
    },
    async customerForm(event) {
      const form = new FormData(event.currentTarget);
      const customer = {
        name: String(form.get("name")).trim(),
        nit: String(form.get("nit")).trim(),
        channel: String(form.get("channel")).trim(),
        contactName: String(form.get("contactName")).trim(),
        balance: 0,
        contact: String(form.get("contact")).trim(),
        phone: String(form.get("phone")).trim(),
        city: String(form.get("city")).trim(),
        address: String(form.get("address")).trim(),
        notes: String(form.get("notes")).trim()
      };
      data.customers.push(customer);
      await syncCustomerToCloud(customer);
      await recordActivity("Clientes", "Cliente creado", customer.name);
    },
    async supplierForm(event) {
      const form = new FormData(event.currentTarget);
      const supplier = {
        name: String(form.get("name")).trim(),
        nit: String(form.get("nit")).trim(),
        category: String(form.get("category")).trim(),
        contactName: String(form.get("contactName")).trim(),
        email: String(form.get("email")).trim(),
        phone: String(form.get("phone")).trim(),
        city: String(form.get("city")).trim(),
        address: String(form.get("address")).trim(),
        paymentTerms: String(form.get("paymentTerms")).trim(),
        status: String(form.get("status") || "Activo"),
        notes: String(form.get("notes")).trim()
      };
      data.suppliers = data.suppliers || [];
      data.suppliers.push(supplier);
      await syncSupplierToCloud(supplier);
      await recordActivity("Proveedores", "Proveedor creado", supplier.name);
    },
    async settingsForm(event) {
      const form = new FormData(event.currentTarget);
      data.company.name = String(form.get("name")).trim();
      data.company.nit = String(form.get("nit")).trim();
      data.company.city = String(form.get("city")).trim();
      data.company.email = String(form.get("email")).trim();
      data.company.commercialName = String(form.get("commercialName")).trim();
      data.company.industry = String(form.get("industry")).trim();
      data.company.accent = String(form.get("accent"));
      data.company.logoUrl = String(form.get("logoUrl") || "").trim();
      data.company.quoteAccent = String(form.get("quoteAccent") || data.company.accent).trim();
      data.company.quoteFooter = String(form.get("quoteFooter") || "").trim();
      await syncCompanyToCloud();
      await recordActivity("Ajustes", "Empresa actualizada", data.company.name);
    },
    async userForm(event) {
      const form = new FormData(event.currentTarget);
      data.users.push({
        name: String(form.get("name")).trim(),
        email: String(form.get("email")).trim(),
        role: String(form.get("role")),
        status: "Invitado"
      });
      await recordActivity("Ajustes", "Usuario preparado", String(form.get("email")).trim());
    },
    async clearCompanyForm(event) {
      const form = new FormData(event.currentTarget);
      if (String(form.get("confirm")).trim().toUpperCase() !== "LIMPIAR") {
        cloudError = "Para eliminar los datos operativos debes escribir LIMPIAR.";
        return;
      }

      await clearCompanyOperationalData();
    }
  };

  Object.entries(formHandlers).forEach(([id, handler]) => {
    const form = document.querySelector(`#${id}`);
    if (!form) {
      return;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        await handler(event);
        await syncPendingRecords();
      } catch (error) {
        cloudError = error?.message || "No se pudo guardar la informacion.";
        data.cloud.syncStatus = "Error de guardado";
      } finally {
        saveData();
        render();
      }
    });
  });

  document.querySelectorAll("[data-task]").forEach((checkbox) => {
    checkbox.addEventListener("change", async () => {
      const task = data.tasks[Number(checkbox.dataset.task)];
      task.done = checkbox.checked;
      await updateCloudTaskStatus(task);
      await recordActivity("Tareas", checkbox.checked ? "Tarea completada" : "Tarea reabierta", task.text);
      saveData();
    });
  });

  document.querySelectorAll("[data-delete-type]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      try {
        await deleteRecord(button.dataset.deleteType, Number(button.dataset.deleteIndex));
      } catch (error) {
        cloudError = error?.message || "No se pudo eliminar el registro.";
        saveData();
        render();
      }
    });
  });

  document.querySelectorAll("[data-accounting-month]").forEach((select) => {
    select.addEventListener("change", () => {
      data.accountingCompare = {
        ...(data.accountingCompare || {}),
        [select.dataset.accountingMonth]: select.value
      };
      saveData();
      render();
    });
  });

  const addQuotationItem = document.querySelector("[data-add-quotation-item]");
  if (addQuotationItem) {
    addQuotationItem.addEventListener("click", () => {
      const container = document.querySelector("[data-quotation-items]");
      const nextIndex = container ? container.querySelectorAll("[data-quotation-item-row]").length + 1 : 1;
      if (container) {
        container.insertAdjacentHTML("beforeend", renderQuotationItemRow(nextIndex));
      }
      bindQuotationItemRemoveButtons();
    });
  }

  bindQuotationItemRemoveButtons();

  const samplePos = document.querySelector("[data-add-sample-pos]");
  if (samplePos) {
    samplePos.addEventListener("click", async () => {
      data.pos.cart.push({ sku: "PRD-003", name: "Impresora POS", quantity: 1, price: 318000 });
      await recordActivity("POS", "Producto rapido agregado", "Impresora POS");
      saveData();
      render();
    });
  }

  const clearPos = document.querySelector("[data-clear-pos]");
  if (clearPos) {
    clearPos.addEventListener("click", async () => {
      data.pos.cart = [];
      await recordActivity("POS", "Caja limpiada", "Carrito POS vaciado");
      saveData();
      render();
    });
  }

  document.querySelectorAll("[data-add-task]").forEach((button) => {
    button.addEventListener("click", async () => {
      await addTask(button.dataset.addTask);
      await recordActivity("Tareas", "Tarea creada", button.dataset.addTask);
      saveData();
      activeModule = "home";
      render();
    });
  });

  const generatePlan = document.querySelector("[data-generate-plan]");
  if (generatePlan) {
    generatePlan.addEventListener("click", async () => {
      const newTasks = getAssistantInsights()
        .filter((item) => item.tone !== "good")
        .map((item) => ({ text: item.action, done: false }));
      data.tasks = [...newTasks, ...data.tasks];
      await Promise.all(newTasks.map((task) => syncTaskToCloud(task)));
      data.assistant.lastRun = new Date().toISOString();
      await recordActivity("Asistente", "Plan generado", `${newTasks.length} acciones sugeridas`);
      saveData();
      render();
    });
  }

  const runAutomation = document.querySelector("[data-run-automation]");
  if (runAutomation) {
    runAutomation.addEventListener("click", async () => {
      await Promise.all([
        addTask("Enviar resumen automatico por WhatsApp"),
        addTask("Revisar integracion de pagos para portal cliente"),
        addTask("Preparar sincronizacion e-commerce con inventario")
      ]);
      await recordActivity("Automatizaciones", "Playbook ejecutado", "Se crearon tareas automaticas");
      saveData();
      activeModule = "home";
      render();
    });
  }

  document.querySelectorAll("[data-bot-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      data.quickBot.open = !data.quickBot.open;
      saveData();
      render();
    });
  });

  document.querySelectorAll("[data-bot-question]").forEach((button) => {
    button.addEventListener("click", async () => {
      await addBotResponse(button.dataset.botQuestion);
    });
  });

  document.querySelectorAll("[data-print-invoice]").forEach((button) => {
    button.addEventListener("click", () => {
      printInvoice(button.dataset.printInvoice);
    });
  });

  document.querySelectorAll("[data-print-quotation]").forEach((button) => {
    button.addEventListener("click", () => {
      printQuotation(button.dataset.printQuotation);
    });
  });

  document.querySelectorAll("[data-accept-quotation]").forEach((button) => {
    button.addEventListener("click", async () => {
      const quotation = (data.quotations || []).find((item) => item.id === button.dataset.acceptQuotation);
      if (!quotation) {
        return;
      }
      quotation.status = "Aceptada";
      await addTask(`Preparar factura de cotizacion ${quotation.id}`);
      await recordActivity("Cotizaciones", "Cotizacion aceptada", quotation.id);
      saveData();
      render();
    });
  });

  document.querySelectorAll("[data-mark-paid]").forEach((button) => {
    button.addEventListener("click", () => {
      markInvoicePaid(button.dataset.markPaid);
    });
  });

  document.querySelectorAll("[data-send-dian]").forEach((button) => {
    button.addEventListener("click", () => {
      sendInvoiceToDian(button.dataset.sendDian);
    });
  });

  const botForm = document.querySelector("#botForm");
  if (botForm) {
    botForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      await addBotResponse(String(form.get("question") || ""));
    });
  }
}

function bindQuotationItemRemoveButtons() {
  document.querySelectorAll("[data-remove-quotation-item]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const rows = document.querySelectorAll("[data-quotation-item-row]");
      if (rows.length <= 1) return;
      button.closest("[data-quotation-item-row]")?.remove();
    });
  });
}

function bindInstallButton() {
  const installButton = document.querySelector("#installButton");
  if (!installButton) {
    return;
  }

  if (deferredInstallPrompt) {
    installButton.classList.remove("hidden");
  }

  installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      return;
    }

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installButton.classList.add("hidden");
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  const installButton = document.querySelector("#installButton");
  if (installButton) {
    installButton.classList.remove("hidden");
  }
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  const installButton = document.querySelector("#installButton");
  if (installButton) {
    installButton.classList.add("hidden");
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js?v=18").catch((error) => {
      console.warn("No se pudo activar el modo offline.", error);
    });
  });
}

async function initializeApp() {
  initCloudClient();
  passwordRecoveryMode = isPasswordRecoveryUrl();
  await loadCloudSession();
  if (isCloudConfigured() && !passwordRecoveryMode && !cloudSession) {
    authenticated = false;
    localStorage.removeItem("quantrox-suite-auth");
  }
  render();
}

initializeApp();
