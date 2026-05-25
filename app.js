const STORAGE_KEY = "quantrox-suite-data-v4";

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
    email: "admin@empresa.com"
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
  ["settings", "Ajustes", "S"]
];

let data = mergeData(loadData(), defaultData);
let activeModule = "home";
let authenticated = localStorage.getItem("quantrox-suite-auth") === "true";
let deferredInstallPrompt = null;

const app = document.querySelector("#app");

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
          ${badge("Lista para base de datos", "warn")}
        </div>
      </section>
      <section class="login-panel">
        <p class="eyebrow">Acceso demo</p>
        <h2>Entrar a la suite</h2>
        <form id="loginForm" class="form-grid single">
          <label>Empresa <input name="company" value="${escapeHtml(data.company.name)}" required></label>
          <label>Usuario <input name="user" value="${escapeHtml(data.company.user)}" required></label>
          <label>NIT <input name="nit" value="${escapeHtml(data.company.nit)}" required></label>
          <button class="primary-button" type="submit">Ingresar</button>
        </form>
      </section>
    </main>
  `;

  document.querySelector("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    data.company.name = String(form.get("company")).trim();
    data.company.user = String(form.get("user")).trim();
    data.company.nit = String(form.get("nit")).trim();
    authenticated = true;
    localStorage.setItem("quantrox-suite-auth", "true");
    saveData();
    window.scrollTo(0, 0);
    render();
  });
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
  return `
    <section class="summary-grid">
      ${metric("Facturado", formatMoney(totals.sales), `${data.invoices.length} documentos`)}
      ${metric("Pagado", formatMoney(totals.paid), "Recaudo confirmado")}
      ${metric("Pendiente", formatMoney(totals.pending), "Cartera activa", totals.pending > 0 ? "attention" : "")}
    </section>
    <section class="dashboard-grid">
      <article class="panel">
        <h3>Nueva factura <span class="panel-label">Electronica</span></h3>
        <form class="form-grid" id="invoiceForm">
          <label>Cliente <input name="customer" required placeholder="Nombre del cliente"></label>
          <label>Subtotal <input name="subtotal" required min="0" type="number" placeholder="0"></label>
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
        </ul>
      </article>
    </section>
    ${renderTable("Facturas recientes", ["Numero", "Cliente", "Estado", "Total"], data.invoices.map((item) => [
      item.id,
      item.customer,
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
    authenticated = false;
    localStorage.removeItem("quantrox-suite-auth");
    render();
  });
}

function bindModuleEvents() {
  const formHandlers = {
    invoiceForm(event) {
      const form = new FormData(event.currentTarget);
      const subtotal = Number(form.get("subtotal"));
      data.invoices.unshift({
        id: `FE-${1049 + data.invoices.length}`,
        customer: String(form.get("customer")).trim(),
        status: String(form.get("status")),
        date: new Date().toISOString().slice(0, 10),
        subtotal,
        tax: Math.round(subtotal * 0.19)
      });
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

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handler(event);
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
    navigator.serviceWorker.register("sw.js?v=5").catch((error) => {
      console.warn("No se pudo activar el modo offline.", error);
    });
  });
}

render();
