const STORAGE_KEY = "suite-empresarial-data-v2";

const defaultModules = {
  accounting: {
    title: "Sistema Contable",
    subtitle: "Visualiza el pulso financiero de la empresa con ingresos, gastos y balance en tiempo real.",
    movements: [
      { detail: "Venta mostrador", type: "Ingreso", amount: 1250000 },
      { detail: "Pago arriendo", type: "Gasto", amount: 620000 },
      { detail: "Servicio técnico", type: "Ingreso", amount: 380000 },
      { detail: "Compra de insumos", type: "Gasto", amount: 240000 }
    ]
  },
  pos: {
    title: "Sistema POS y Facturación",
    subtitle: "Crea facturas, calcula IVA y muestra el total de venta en una pantalla clara para caja.",
    items: [
      { name: "Producto A", quantity: 2, price: 45000 },
      { name: "Servicio B", quantity: 1, price: 90000 },
      { name: "Producto premium", quantity: 1, price: 135000 }
    ]
  },
  payroll: {
    title: "Sistema de Nómina",
    subtitle: "Controla empleados, salarios, provisiones y costos mensuales de manera ordenada.",
    employees: [
      { name: "Ana Martínez", role: "Administración", salary: 1800000 },
      { name: "Carlos Ruiz", role: "Ventas", salary: 1650000 },
      { name: "Laura Gómez", role: "Caja", salary: 1750000 }
    ]
  }
};

const savedModules = loadSavedModules();
const modules = mergeModuleData(savedModules, defaultModules);
let currentModule = "accounting";
let deferredInstallPrompt = null;

const selectorView = document.querySelector("#selectorView");
const workspaceView = document.querySelector("#workspaceView");
const modulePanel = document.querySelector("#modulePanel");
const moduleTitle = document.querySelector("#moduleTitle");
const installButton = document.querySelector("#installButton");
const optionButtons = document.querySelectorAll(".module-option");
const tabButtons = document.querySelectorAll(".tab");
const heroButtons = document.querySelectorAll("[data-open-module]");

const money = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

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

function mergeModuleData(savedValue, defaults) {
  if (!savedValue) {
    return defaults;
  }

  return {
    accounting: { ...defaults.accounting, ...savedValue.accounting },
    pos: { ...defaults.pos, ...savedValue.pos },
    payroll: { ...defaults.payroll, ...savedValue.payroll }
  };
}

function loadSavedModules() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    return savedValue ? JSON.parse(savedValue) : null;
  } catch (error) {
    console.warn("No se pudo cargar la información guardada.", error);
    return null;
  }
}

function saveModules() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
}

function setActiveModule(moduleKey) {
  currentModule = moduleKey;
  moduleTitle.textContent = modules[moduleKey].title;

  optionButtons.forEach((button) => {
    button.setAttribute("aria-checked", String(button.dataset.module === moduleKey));
  });

  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.module === moduleKey);
  });

  renderModule();
}

function openWorkspace(moduleKey) {
  selectorView.classList.add("hidden");
  workspaceView.classList.remove("hidden");
  setActiveModule(moduleKey);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderModule() {
  if (currentModule === "accounting") {
    renderAccounting();
  }

  if (currentModule === "pos") {
    renderPos();
  }

  if (currentModule === "payroll") {
    renderPayroll();
  }
}

function moduleHero(moduleKey, badge) {
  const module = modules[moduleKey];
  return `
    <section class="module-hero">
      <div>
        <p class="eyebrow">Demo interactiva</p>
        <h3>${escapeHtml(module.title)}</h3>
        <p>${escapeHtml(module.subtitle)}</p>
      </div>
      <span class="module-badge">${escapeHtml(badge)}</span>
    </section>
  `;
}

function metricCard(label, value, trend) {
  return `
    <article class="metric">
      <span>${escapeHtml(label)}</span>
      <strong>${value}</strong>
      <em class="trend">${escapeHtml(trend)}</em>
    </article>
  `;
}

function getAccountingTotals() {
  const income = modules.accounting.movements
    .filter((item) => item.type === "Ingreso")
    .reduce((sum, item) => sum + item.amount, 0);
  const expense = modules.accounting.movements
    .filter((item) => item.type === "Gasto")
    .reduce((sum, item) => sum + item.amount, 0);

  return { income, expense, balance: income - expense };
}

function renderAccounting() {
  const totals = getAccountingTotals();
  const margin = totals.income ? Math.max(0, Math.round((totals.balance / totals.income) * 100)) : 0;
  const expenseRatio = totals.income ? Math.min(100, Math.round((totals.expense / totals.income) * 100)) : 0;

  modulePanel.innerHTML = `
    ${moduleHero("accounting", `Balance ${formatMoney(totals.balance)}`)}
    <div class="panel-grid">
      <div class="summary-grid">
        ${metricCard("Ingresos", formatMoney(totals.income), "+18% frente al periodo anterior")}
        ${metricCard("Gastos", formatMoney(totals.expense), "Control operativo visible")}
        ${metricCard("Margen estimado", `${margin}%`, "Salud financiera")}
      </div>

      <div class="dashboard-grid">
        <section class="tool-panel">
          <h3>Nuevo movimiento <span class="panel-label">Contabilidad</span></h3>
          <p>Registra un ingreso o gasto y mira cómo cambia el balance de la empresa al instante.</p>
          <form class="form-grid" id="accountingForm">
            <label>Detalle <input name="detail" required placeholder="Ej. Compra de insumos"></label>
            <label>Tipo
              <select name="type">
                <option>Ingreso</option>
                <option>Gasto</option>
              </select>
            </label>
            <label>Monto <input name="amount" required min="0" type="number" placeholder="0"></label>
            <button class="primary-button" type="submit">Registrar movimiento</button>
          </form>
          <div class="quick-actions">
            <button class="quick-button" type="button" data-demo-accounting="income">+ Ingreso demo</button>
            <button class="quick-button" type="button" data-demo-accounting="expense">+ Gasto demo</button>
          </div>
        </section>

        <aside class="insight-card">
          <h3>Lectura financiera <span class="panel-label">Insight</span></h3>
          <div class="progress-stack">
            <div class="progress-item">
              <span><b>Margen</b><b>${margin}%</b></span>
              <div class="progress-track"><i style="width: ${Math.min(100, margin)}%"></i></div>
            </div>
            <div class="progress-item">
              <span><b>Gasto sobre ingresos</b><b>${expenseRatio}%</b></span>
              <div class="progress-track"><i style="width: ${expenseRatio}%"></i></div>
            </div>
          </div>
          <ul class="insight-list">
            <li><span>Estado</span><b>${totals.balance >= 0 ? "Rentable" : "Revisar gastos"}</b></li>
            <li><span>Movimientos</span><b>${modules.accounting.movements.length}</b></li>
            <li><span>Próxima acción</span><b>Exportar reporte</b></li>
          </ul>
        </aside>
      </div>

      <section class="data-panel">
        <h3>Movimientos recientes <span class="panel-label">Actividad</span></h3>
        <div class="table">
          <div class="table-row header"><span>Detalle</span><span>Tipo</span><span>Monto</span></div>
          ${modules.accounting.movements.map((item) => `
            <div class="table-row">
              <span>${escapeHtml(item.detail)}</span>
              <span>${escapeHtml(item.type)}</span>
              <span class="${item.type === "Ingreso" ? "amount-in" : "amount-out"}">${formatMoney(item.amount)}</span>
            </div>
          `).join("")}
        </div>
      </section>
    </div>
  `;

  document.querySelector("#accountingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    modules.accounting.movements.unshift({
      detail: String(data.get("detail")).trim(),
      type: data.get("type"),
      amount: Number(data.get("amount"))
    });
    saveModules();
    renderAccounting();
  });

  document.querySelectorAll("[data-demo-accounting]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.demoAccounting === "income" ? "Ingreso" : "Gasto";
      modules.accounting.movements.unshift({
        detail: type === "Ingreso" ? "Venta demo digital" : "Gasto operativo demo",
        type,
        amount: type === "Ingreso" ? 480000 : 175000
      });
      saveModules();
      renderAccounting();
    });
  });
}

function renderPos() {
  const subtotal = modules.pos.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + tax;
  const units = modules.pos.items.reduce((sum, item) => sum + item.quantity, 0);
  const average = modules.pos.items.length ? Math.round(subtotal / modules.pos.items.length) : 0;

  modulePanel.innerHTML = `
    ${moduleHero("pos", "Factura lista")}
    <div class="panel-grid">
      <div class="summary-grid">
        ${metricCard("Total venta", formatMoney(total), "IVA incluido")}
        ${metricCard("Unidades", units, "Productos en factura")}
        ${metricCard("Ticket promedio", formatMoney(average), "Venta sugerida")}
      </div>

      <div class="dashboard-grid">
        <section class="tool-panel">
          <h3>Agregar producto o servicio <span class="panel-label">Caja</span></h3>
          <p>Construye una factura de prueba y muestra al cliente cómo se vería el flujo de venta.</p>
          <form class="invoice-row" id="posForm">
            <label>Nombre <input name="name" required placeholder="Producto"></label>
            <label>Cant. <input name="quantity" required min="1" type="number" value="1"></label>
            <label>Precio <input name="price" required min="0" type="number" placeholder="0"></label>
            <button class="primary-button" type="submit">+</button>
          </form>
          <div class="quick-actions">
            <button class="quick-button" type="button" data-demo-pos="product">Agregar producto demo</button>
            <button class="quick-button" type="button" data-clear-pos>Limpiar factura</button>
          </div>
        </section>

        <aside class="data-panel">
          <h3>Resumen de factura <span class="panel-label">POS</span></h3>
          <div class="table">
            <div class="table-row header"><span>Item</span><span>Cant.</span><span>Total</span></div>
            ${modules.pos.items.map((item) => `
              <div class="table-row">
                <span>${escapeHtml(item.name)}</span>
                <span>${item.quantity}</span>
                <span>${formatMoney(item.quantity * item.price)}</span>
              </div>
            `).join("")}
          </div>
          <div class="total-line"><span>Subtotal</span><span>${formatMoney(subtotal)}</span></div>
          <div class="total-line"><span>IVA 19%</span><span>${formatMoney(tax)}</span></div>
          <div class="total-line"><span>Total</span><span>${formatMoney(total)}</span></div>
        </aside>
      </div>

      <section class="insight-card">
        <h3>Experiencia de venta <span class="panel-label">Cliente</span></h3>
        <ul class="insight-list">
          <li><span>Tiempo estimado de caja</span><b>Menos de 1 minuto</b></li>
          <li><span>Estado de pago</span><b>Listo para integrar</b></li>
          <li><span>Salida esperada</span><b>Factura PDF / ticket</b></li>
        </ul>
      </section>
    </div>
  `;

  document.querySelector("#posForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    modules.pos.items.push({
      name: String(data.get("name")).trim(),
      quantity: Number(data.get("quantity")),
      price: Number(data.get("price"))
    });
    saveModules();
    renderPos();
  });

  document.querySelector("[data-demo-pos]").addEventListener("click", () => {
    modules.pos.items.push({
      name: "Producto demo",
      quantity: 1,
      price: 78000
    });
    saveModules();
    renderPos();
  });

  document.querySelector("[data-clear-pos]").addEventListener("click", () => {
    modules.pos.items = [];
    saveModules();
    renderPos();
  });
}

function renderPayroll() {
  const monthlyTotal = modules.payroll.employees.reduce((sum, employee) => sum + employee.salary, 0);
  const benefits = Math.round(monthlyTotal * 0.28);
  const fullCost = monthlyTotal + benefits;
  const averageSalary = modules.payroll.employees.length ? Math.round(monthlyTotal / modules.payroll.employees.length) : 0;

  modulePanel.innerHTML = `
    ${moduleHero("payroll", `${modules.payroll.employees.length} empleados`)}
    <div class="panel-grid">
      <div class="summary-grid">
        ${metricCard("Nómina mensual", formatMoney(monthlyTotal), "Salarios base")}
        ${metricCard("Provisión", formatMoney(benefits), "Estimado 28%")}
        ${metricCard("Costo total", formatMoney(fullCost), "Planificación mensual")}
      </div>

      <div class="dashboard-grid">
        <section class="tool-panel">
          <h3>Nuevo empleado <span class="panel-label">Talento</span></h3>
          <p>Agrega un empleado y muestra cómo cambian los costos de nómina en tiempo real.</p>
          <form class="form-grid" id="payrollForm">
            <label>Nombre <input name="name" required placeholder="Nombre completo"></label>
            <label>Cargo <input name="role" required placeholder="Cargo"></label>
            <label>Salario <input name="salary" required min="0" type="number" placeholder="0"></label>
            <button class="primary-button" type="submit">Guardar empleado</button>
          </form>
          <div class="quick-actions">
            <button class="quick-button" type="button" data-demo-payroll>Agregar empleado demo</button>
          </div>
        </section>

        <aside class="insight-card">
          <h3>Planificación <span class="panel-label">Costos</span></h3>
          <div class="progress-stack">
            <div class="progress-item">
              <span><b>Salarios</b><b>${formatMoney(monthlyTotal)}</b></span>
              <div class="progress-track"><i style="width: 72%"></i></div>
            </div>
            <div class="progress-item">
              <span><b>Provisión</b><b>${formatMoney(benefits)}</b></span>
              <div class="progress-track"><i style="width: 28%"></i></div>
            </div>
          </div>
          <ul class="insight-list">
            <li><span>Promedio salarial</span><b>${formatMoney(averageSalary)}</b></li>
            <li><span>Periodo sugerido</span><b>Mensual</b></li>
            <li><span>Exportación</span><b>Lista para PDF</b></li>
          </ul>
        </aside>
      </div>

      <section class="data-panel">
        <h3>Equipo activo <span class="panel-label">Nómina</span></h3>
        <div class="table">
          <div class="table-row header"><span>Nombre</span><span>Cargo</span><span>Salario</span></div>
          ${modules.payroll.employees.map((employee) => `
            <div class="table-row">
              <span>${escapeHtml(employee.name)}</span>
              <span>${escapeHtml(employee.role)}</span>
              <span>${formatMoney(employee.salary)}</span>
            </div>
          `).join("")}
        </div>
      </section>
    </div>
  `;

  document.querySelector("#payrollForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    modules.payroll.employees.push({
      name: String(data.get("name")).trim(),
      role: String(data.get("role")).trim(),
      salary: Number(data.get("salary"))
    });
    saveModules();
    renderPayroll();
  });

  document.querySelector("[data-demo-payroll]").addEventListener("click", () => {
    modules.payroll.employees.push({
      name: "Empleado demo",
      role: "Operaciones",
      salary: 1680000
    });
    saveModules();
    renderPayroll();
  });
}

optionButtons.forEach((button) => {
  button.addEventListener("click", () => openWorkspace(button.dataset.module));
});

heroButtons.forEach((button) => {
  button.addEventListener("click", () => openWorkspace(button.dataset.openModule));
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveModule(button.dataset.module));
});

document.querySelector("#backButton").addEventListener("click", () => {
  workspaceView.classList.add("hidden");
  selectorView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.classList.remove("hidden");
});

installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    return;
  }

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.classList.add("hidden");
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installButton.classList.add("hidden");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.warn("No se pudo activar el modo offline.", error);
    });
  });
}

setActiveModule(currentModule);
