const STORAGE_KEY = "quantrox-suite-data-v9";

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
    accent: "#0f766e"
  },
  cloud: {
    mode: "Demo local",
    database: "Supabase/PostgreSQL",
    syncStatus: "Pendiente de conexion",
    lastBackup: "Sin respaldo cloud"
  },
  users: [
    { name: "Administrador", email: "admin@empresa.com", role: "Propietario", status: "Activo" },
    { name: "Caja principal", email: "caja@empresa.com", role: "Cajero", status: "Invitado" },
    { name: "Contabilidad", email: "contabilidad@empresa.com", role: "Contador", status: "Invitado" }
  ],
  invoices: [
    { id: "FE-1048", customer: "Drogueria Central", status: "Pagada", date: "2026-05-24", subtotal: 1280000, tax: 243200 },
    { id: "FE-1047", customer: "Mercado La 80", status: "Pendiente", date: "2026-05-23", subtotal: 760000, tax: 144400 },
    { id: "FE-1046", customer: "Cafe Norte", status: "Pagada", date: "2026-05-23", subtotal: 420000, tax: 79800 }
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
    { detail: "Ventas facturadas", account: "Ingresos", type: "Ingreso", amount: 3120000 },
    { detail: "Compras de inventario", account: "Costo de venta", type: "Gasto", amount: 1260000 },
    { detail: "Nomina quincenal", account: "Gasto laboral", type: "Gasto", amount: 1890000 },
    { detail: "Servicio tecnico", account: "Ingresos", type: "Ingreso", amount: 540000 }
  ],
  payroll: [
    { name: "Ana Martinez", role: "Administracion", salary: 2100000, status: "Activa" },
    { name: "Carlos Ruiz", role: "Ventas", salary: 1900000, status: "Activa" },
    { name: "Laura Gomez", role: "Caja", salary: 1800000, status: "Activa" },
    { name: "Mateo Rios", role: "Soporte", salary: 2250000, status: "Activa" }
  ],
  customers: [
    { name: "Drogueria Central", channel: "Mayorista", balance: 0, contact: "compras@central.com" },
    { name: "Mercado La 80", channel: "Retail", balance: 904400, contact: "admin@la80.com" },
    { name: "Cafe Norte", channel: "Servicios", balance: 0, contact: "gerencia@cafenorte.com" }
  ],
  tasks: [
    { text: "Revisar cartera pendiente", done: false },
    { text: "Validar stock bajo", done: false },
    { text: "Enviar reporte semanal", done: true }
  ],
  assistant: {
    focus: "Crecimiento rentable",
    lastRun: "Analisis demo"
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
    { item: "Facturacion electronica", owner: "Ventas", status: "Preparado" },
    { item: "POS electronico", owner: "Caja", status: "Preparado" },
    { item: "Nomina electronica", owner: "Talento", status: "Pendiente API" },
    { item: "Documento soporte", owner: "Compras", status: "Pendiente API" }
  ],
  integrations: [
    { name: "WhatsApp", use: "Cobros, soporte y envio de reportes", status: "Activo" },
    { name: "Pasarela de pagos", use: "Pagos de facturas y links de cobro", status: "Planeado" },
    { name: "Proveedor DIAN", use: "CUFE, XML, QR y validacion", status: "Planeado" },
    { name: "E-commerce", use: "Ventas online sincronizadas", status: "Planeado" }
  ]
};

const moduleMeta = {
  home: { title: "Centro de control", eyebrow: "Operacion en vivo" },
  invoices: { title: "Facturacion electronica", eyebrow: "Ventas y DIAN" },
  pos: { title: "POS inteligente", eyebrow: "Caja y pagos" },
  inventory: { title: "Inventario", eyebrow: "Stock y costos" },
  accounting: { title: "Contabilidad", eyebrow: "Balance y estados" },
  payroll: { title: "Nomina", eyebrow: "Equipo y provisiones" },
  customers: { title: "Clientes", eyebrow: "CRM comercial" },
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
  ["pos", "POS", "P"],
  ["inventory", "Inventario", "I"],
  ["accounting", "Contabilidad", "C"],
  ["payroll", "Nomina", "N"],
  ["customers", "Clientes", "R"],
  ["reports", "Reportes", "B"],
  ["assistant", "Asistente", "A"],
  ["growth", "Ventajas", "Q"],
  ["portal", "Portal", "L"],
  ["automations", "Auto", "Z"],
  ["settings", "Ajustes", "S"]
];

let data = mergeData(loadData(), defaultData);
let activeModule = "home";
let authenticated = localStorage.getItem("quantrox-suite-auth") === "true";
let deferredInstallPrompt = null;
let cloudClient = null;
let cloudSession = null;
let cloudReady = false;
let cloudError = "";

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

function initCloudClient() {
  if (!isCloudConfigured()) {
    cloudReady = false;
    data.cloud.mode = "Demo local";
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

async function loadCloudData() {
  if (!cloudReady || !cloudSession?.user) {
    return;
  }

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
    productsResult,
    invoicesResult,
    accountingResult,
    employeesResult,
    tasksResult,
    movementsResult
  ] = await Promise.all([
    cloudClient.from("companies").select("*").eq("id", companyId).single(),
    cloudClient.from("customers").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("products").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("invoices").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("accounting_entries").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("employees").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("tasks").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
    cloudClient.from("inventory_movements").select("*").eq("company_id", companyId).order("created_at", { ascending: false })
  ]);

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
      industry: data.company.industry
    };
  }

  data.users = [{
    name: profile.full_name,
    email: cloudSession.user.email || "usuario@empresa.com",
    role: profile.role,
    status: profile.status
  }];

  if (customersResult.data?.length) {
    data.customers = customersResult.data.map((item) => ({
      id: item.id,
      name: item.name,
      channel: item.channel,
      balance: Number(item.balance || 0),
      contact: item.contact_email || ""
    }));
  }

  if (productsResult.data?.length) {
    data.inventory = productsResult.data.map((item) => ({
      id: item.id,
      sku: item.sku,
      name: item.name,
      stock: Number(item.stock || 0),
      min: Number(item.min_stock || 0),
      cost: Number(item.cost || 0),
      price: Number(item.price || 0)
    }));
  }

  if (invoicesResult.data?.length) {
    data.invoices = invoicesResult.data.map((item) => ({
      dbId: item.id,
      id: item.number,
      customer: "Cliente registrado",
      status: item.status,
      date: item.issued_at,
      subtotal: Number(item.subtotal || 0),
      tax: Number(item.tax || 0)
    }));
  }

  if (accountingResult.data?.length) {
    data.accounting = accountingResult.data.map((item) => ({
      id: item.id,
      detail: item.detail,
      account: item.account,
      type: item.type,
      amount: Number(item.amount || 0)
    }));
  }

  if (employeesResult.data?.length) {
    data.payroll = employeesResult.data.map((item) => ({
      id: item.id,
      name: item.full_name,
      role: item.role,
      salary: Number(item.salary || 0),
      status: item.status
    }));
  }

  if (tasksResult.data?.length) {
    data.tasks = tasksResult.data.map((item) => ({
      id: item.id,
      text: item.text,
      done: item.done
    }));
  }

  if (movementsResult.data?.length) {
    data.inventoryMovements = movementsResult.data.map((item) => ({
      id: item.id,
      date: item.movement_date,
      type: item.type,
      product: item.product_id ? "Producto registrado" : "Movimiento",
      quantity: Number(item.quantity || 0),
      origin: item.origin
    }));
  }

  data.cloud.mode = "Cloud conectado";
  data.cloud.syncStatus = "Datos sincronizados";
  data.cloud.lastBackup = new Date().toLocaleString("es-CO");
  saveData();
}

async function syncInvoiceToCloud(invoice, product, inventoryMovement, accountingEntry) {
  if (!cloudReady || !cloudSession || !data.company.id || !product.id) {
    return;
  }

  const { error: invoiceError } = await cloudClient.from("invoices").insert({
    company_id: data.company.id,
    number: invoice.id,
    status: invoice.status,
    subtotal: invoice.subtotal,
    tax: invoice.tax,
    issued_at: invoice.date
  });

  if (invoiceError) {
    throw invoiceError;
  }

  await Promise.all([
    cloudClient.from("products").update({ stock: product.stock }).eq("id", product.id),
    cloudClient.from("inventory_movements").insert({
      company_id: data.company.id,
      product_id: product.id,
      type: inventoryMovement.type,
      quantity: inventoryMovement.quantity,
      origin: inventoryMovement.origin,
      movement_date: inventoryMovement.date
    }),
    cloudClient.from("accounting_entries").insert({
      company_id: data.company.id,
      detail: accountingEntry.detail,
      account: accountingEntry.account,
      type: accountingEntry.type,
      amount: accountingEntry.amount,
      entry_date: invoice.date
    })
  ]);

  data.cloud.syncStatus = "Ultima factura sincronizada";
  data.cloud.lastBackup = new Date().toLocaleString("es-CO");
}

function applyBrandTheme() {
  document.documentElement.style.setProperty("--accent", data.company.accent || "#0f766e");
  document.documentElement.style.setProperty("--accent-2", data.company.accent || "#18a999");
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

function render() {
  applyBrandTheme();

  if (!authenticated) {
    renderLogin();
    return;
  }

  const meta = moduleMeta[activeModule];
  app.innerHTML = `
    <aside class="sidebar">
      <a class="brand" href="https://quantroxsystems.cloud/" aria-label="Quantrox Systems">
        <span class="brand-mark">Q</span>
        <span><strong>Quantrox Suite</strong><small>${escapeHtml(data.company.plan)}</small></span>
      </a>
      <nav class="nav-list" aria-label="Modulos">
        ${navItems.map(([key, label, icon]) => `
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
          <a class="contact-button" href="https://wa.me/573218247072?text=Hola%20Quantrox%20Systems,%20quiero%20una%20demo%20de%20la%20Suite%20Empresarial" target="_blank" rel="noopener">Solicitar demo</a>
          <button class="avatar-button" type="button" data-action="logout">${escapeHtml(data.company.user.charAt(0))}</button>
        </div>
      </header>
      <section id="modulePanel">${renderActiveModule()}</section>
    </main>
  `;

  bindShellEvents();
  bindModuleEvents();
  bindInstallButton();
  window.scrollTo(0, 0);
}

function renderLogin() {
  const cloudConfigured = isCloudConfigured();
  app.innerHTML = `
    <main class="login-screen">
      <section class="login-copy">
        <a class="brand" href="https://quantroxsystems.cloud/">
          <span class="brand-mark">Q</span>
          <span><strong>Quantrox Suite</strong><small>Plataforma empresarial</small></span>
        </a>
        <h1>Tu empresa completa en una sola app.</h1>
        <p>Facturacion, POS, inventario, contabilidad, nomina, clientes y reportes listos para operar desde Android, iPhone, iPad, Windows y navegador.</p>
        <div class="hero-actions">
          ${badge("Multiempresa", "good")}
          ${badge("PWA instalable", "info")}
          ${badge(cloudConfigured ? "Supabase activo" : "Lista para base de datos", cloudConfigured ? "good" : "warn")}
        </div>
      </section>
      <section class="login-panel">
        <p class="eyebrow">${cloudConfigured ? "Acceso cloud" : "Acceso demo"}</p>
        <h2>${cloudConfigured ? "Entrar con Supabase" : "Entrar a la suite"}</h2>
        ${cloudError ? `<p class="cloud-error">${escapeHtml(cloudError)}</p>` : ""}
        <form id="loginForm" class="form-grid single">
          ${cloudConfigured ? `
            <label>Correo <input name="email" required type="email" placeholder="usuario@empresa.com"></label>
            <label>Clave <input name="password" required type="password" placeholder="Clave Supabase"></label>
            <button class="primary-button" type="submit">Ingresar en cloud</button>
            <button class="secondary-button" type="button" data-demo-login>Usar demo local</button>
          ` : `
            <label>Empresa <input name="company" value="${escapeHtml(data.company.name)}" required></label>
            <label>Usuario <input name="user" value="${escapeHtml(data.company.user)}" required></label>
            <label>NIT <input name="nit" value="${escapeHtml(data.company.nit)}" required></label>
            <button class="primary-button" type="submit">Ingresar</button>
          `}
        </form>
      </section>
    </main>
  `;

  document.querySelector("#loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    try {
      if (cloudConfigured) {
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
      cloudError = error.message || "No se pudo iniciar sesion.";
      renderLogin();
    }
  });

  const demoButton = document.querySelector("[data-demo-login]");
  if (demoButton) {
    demoButton.addEventListener("click", () => {
      cloudSession = null;
      authenticated = true;
      data.cloud.mode = "Demo local";
      data.cloud.syncStatus = "Usando demo aunque Supabase este configurado";
      localStorage.setItem("quantrox-suite-auth", "true");
      saveData();
      render();
    });
  }
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
    pos: renderPos,
    inventory: renderInventory,
    accounting: renderAccounting,
    payroll: renderPayroll,
    customers: renderCustomers,
    reports: renderReports,
    assistant: renderAssistant,
    growth: renderGrowth,
    portal: renderPortal,
    automations: renderAutomations,
    settings: renderSettings
  };

  return renderers[activeModule]();
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
        <ul class="insight-list">
          <li><span>Modo actual</span><b>Demo comercial</b></li>
          <li><span>Siguiente paso</span><b>Proveedor autorizado por API</b></li>
          <li><span>Salida</span><b>PDF, XML y CUFE</b></li>
          <li><span>Inventario</span><b>Descuento automatico</b></li>
        </ul>
      </article>
    </section>
    ${renderTable("Facturas recientes", ["Numero", "Cliente", "Producto", "Estado", "Total"], data.invoices.map((item) => [
      item.id,
      item.customer,
      item.product || "Venta general",
      badge(item.status, item.status === "Pagada" ? "good" : "warn"),
      formatMoney(item.subtotal + item.tax)
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
          <button class="quick-button" type="button" data-add-sample-pos>Producto demo</button>
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
    ${renderTable("Movimientos de inventario", ["Fecha", "Tipo", "Producto", "Cantidad", "Origen"], data.inventoryMovements.map((item) => [
      item.date,
      badge(item.type, item.type === "Entrada" ? "good" : "warn"),
      item.product,
      item.quantity,
      item.origin
    ]))}
    ${renderTable("Inventario activo", ["SKU", "Producto", "Stock", "Precio"], data.inventory.map((item) => [
      item.sku,
      item.name,
      `${item.stock} ${item.stock <= item.min ? badge("Bajo", "warn") : ""}`,
      formatMoney(item.price)
    ]))}
  `;
}

function renderAccounting() {
  const totals = getTotals();
  return `
    <section class="summary-grid">
      ${metric("Ingresos", formatMoney(totals.income), "Movimientos positivos")}
      ${metric("Gastos", formatMoney(totals.expense), "Costos y egresos")}
      ${metric("Resultado", formatMoney(totals.balance), `${totals.margin}% margen`, totals.balance < 0 ? "attention" : "")}
    </section>
    <section class="dashboard-grid">
      <article class="panel">
        <h3>Movimiento contable <span class="panel-label">Libro diario</span></h3>
        <form class="form-grid" id="accountingForm">
          <label>Detalle <input name="detail" required placeholder="Detalle"></label>
          <label>Cuenta <input name="account" required placeholder="Cuenta"></label>
          <label>Tipo <select name="type"><option>Ingreso</option><option>Gasto</option></select></label>
          <label>Monto <input name="amount" required min="0" type="number" placeholder="0"></label>
          <button class="primary-button span-2" type="submit">Registrar</button>
        </form>
      </article>
      <article class="panel">
        <h3>Lectura financiera <span class="panel-label">AI ready</span></h3>
        <div class="progress-stack">
          <div class="progress-item"><span><b>Margen</b><b>${totals.margin}%</b></span><div class="progress-track"><i style="width:${Math.max(0, Math.min(100, totals.margin))}%"></i></div></div>
          <div class="progress-item"><span><b>Gasto / ingreso</b><b>${totals.income ? Math.round((totals.expense / totals.income) * 100) : 0}%</b></span><div class="progress-track"><i style="width:${totals.income ? Math.min(100, Math.round((totals.expense / totals.income) * 100)) : 0}%"></i></div></div>
        </div>
      </article>
    </section>
    ${renderTable("Movimientos", ["Detalle", "Cuenta", "Tipo", "Monto"], data.accounting.map((item) => [
      item.detail,
      item.account,
      badge(item.type, item.type === "Ingreso" ? "good" : "danger"),
      formatMoney(item.amount)
    ]))}
  `;
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
    ${renderTable("Equipo", ["Nombre", "Cargo", "Estado", "Salario"], data.payroll.map((item) => [
      item.name,
      item.role,
      badge(item.status),
      formatMoney(item.salary)
    ]))}
  `;
}

function renderCustomers() {
  return `
    <section class="summary-grid">
      ${metric("Clientes", data.customers.length, "Cuentas activas")}
      ${metric("Cartera", formatMoney(data.customers.reduce((sum, item) => sum + item.balance, 0)), "Por cobrar")}
      ${metric("Canales", new Set(data.customers.map((item) => item.channel)).size, "Segmentos")}
    </section>
    <section class="panel">
      <h3>Nuevo cliente <span class="panel-label">CRM</span></h3>
      <form class="form-grid" id="customerForm">
        <label>Nombre <input name="name" required placeholder="Cliente"></label>
        <label>Canal <input name="channel" required placeholder="Retail, mayorista..."></label>
        <label>Correo <input name="contact" required type="email" placeholder="correo@empresa.com"></label>
        <button class="primary-button" type="submit">Guardar cliente</button>
      </form>
    </section>
    ${renderTable("Clientes activos", ["Nombre", "Canal", "Cartera", "Contacto"], data.customers.map((item) => [
      item.name,
      item.channel,
      formatMoney(item.balance),
      item.contact
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
        : "No hay facturas pendientes en la demo.",
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
        formatMoney(item.subtotal + item.tax)
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
              <option value="#0f766e" ${data.company.accent === "#0f766e" ? "selected" : ""}>Verde Quantrox</option>
              <option value="#2563eb" ${data.company.accent === "#2563eb" ? "selected" : ""}>Azul confianza</option>
              <option value="#7c3aed" ${data.company.accent === "#7c3aed" ? "selected" : ""}>Violeta tecnologia</option>
              <option value="#c2410c" ${data.company.accent === "#c2410c" ? "selected" : ""}>Naranja comercio</option>
            </select>
          </label>
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
        </ul>
      </article>
    </section>
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
        data.tasks.unshift({
          text: `Revisar stock insuficiente de ${product.name}`,
          done: false
        });
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
        tax: Math.round(subtotal * 0.19)
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
        type: "Ingreso",
        amount: subtotal
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
    },
    posForm(event) {
      const form = new FormData(event.currentTarget);
      data.pos.cart.push({
        sku: `POS-${Date.now().toString().slice(-4)}`,
        name: String(form.get("name")).trim(),
        quantity: Number(form.get("quantity")),
        price: Number(form.get("price"))
      });
    },
    inventoryForm(event) {
      const form = new FormData(event.currentTarget);
      data.inventory.unshift({
        sku: `PRD-${String(data.inventory.length + 1).padStart(3, "0")}`,
        name: String(form.get("name")).trim(),
        stock: Number(form.get("stock")),
        min: Number(form.get("min")),
        cost: Number(form.get("cost")),
        price: Number(form.get("price"))
      });
    },
    accountingForm(event) {
      const form = new FormData(event.currentTarget);
      data.accounting.unshift({
        detail: String(form.get("detail")).trim(),
        account: String(form.get("account")).trim(),
        type: String(form.get("type")),
        amount: Number(form.get("amount"))
      });
    },
    payrollForm(event) {
      const form = new FormData(event.currentTarget);
      data.payroll.push({
        name: String(form.get("name")).trim(),
        role: String(form.get("role")).trim(),
        salary: Number(form.get("salary")),
        status: "Activa"
      });
    },
    customerForm(event) {
      const form = new FormData(event.currentTarget);
      data.customers.push({
        name: String(form.get("name")).trim(),
        channel: String(form.get("channel")).trim(),
        balance: 0,
        contact: String(form.get("contact")).trim()
      });
    },
    settingsForm(event) {
      const form = new FormData(event.currentTarget);
      data.company.name = String(form.get("name")).trim();
      data.company.nit = String(form.get("nit")).trim();
      data.company.city = String(form.get("city")).trim();
      data.company.email = String(form.get("email")).trim();
      data.company.commercialName = String(form.get("commercialName")).trim();
      data.company.industry = String(form.get("industry")).trim();
      data.company.accent = String(form.get("accent"));
    },
    userForm(event) {
      const form = new FormData(event.currentTarget);
      data.users.push({
        name: String(form.get("name")).trim(),
        email: String(form.get("email")).trim(),
        role: String(form.get("role")),
        status: "Invitado"
      });
    }
  };

  Object.entries(formHandlers).forEach(([id, handler]) => {
    const form = document.querySelector(`#${id}`);
    if (!form) {
      return;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await handler(event);
      saveData();
      render();
    });
  });

  document.querySelectorAll("[data-task]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      data.tasks[Number(checkbox.dataset.task)].done = checkbox.checked;
      saveData();
    });
  });

  const samplePos = document.querySelector("[data-add-sample-pos]");
  if (samplePos) {
    samplePos.addEventListener("click", () => {
      data.pos.cart.push({ sku: "PRD-003", name: "Impresora POS", quantity: 1, price: 318000 });
      saveData();
      render();
    });
  }

  const clearPos = document.querySelector("[data-clear-pos]");
  if (clearPos) {
    clearPos.addEventListener("click", () => {
      data.pos.cart = [];
      saveData();
      render();
    });
  }

  document.querySelectorAll("[data-add-task]").forEach((button) => {
    button.addEventListener("click", () => {
      data.tasks.unshift({
        text: button.dataset.addTask,
        done: false
      });
      saveData();
      activeModule = "home";
      render();
    });
  });

  const generatePlan = document.querySelector("[data-generate-plan]");
  if (generatePlan) {
    generatePlan.addEventListener("click", () => {
      const newTasks = getAssistantInsights()
        .filter((item) => item.tone !== "good")
        .map((item) => ({ text: item.action, done: false }));
      data.tasks = [...newTasks, ...data.tasks];
      data.assistant.lastRun = new Date().toISOString();
      saveData();
      render();
    });
  }

  const runAutomation = document.querySelector("[data-run-automation]");
  if (runAutomation) {
    runAutomation.addEventListener("click", () => {
      data.tasks.unshift(
        { text: "Enviar resumen automatico por WhatsApp", done: false },
        { text: "Revisar integracion de pagos para portal cliente", done: false },
        { text: "Preparar sincronizacion e-commerce con inventario", done: false }
      );
      saveData();
      activeModule = "home";
      render();
    });
  }
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
    navigator.serviceWorker.register("sw.js?v=10").catch((error) => {
      console.warn("No se pudo activar el modo offline.", error);
    });
  });
}

async function initializeApp() {
  initCloudClient();
  await loadCloudSession();
  render();
}

initializeApp();
