const STORAGE_KEY = "suite-empresarial-data";

const defaultModules = {
  accounting: {
    title: "Sistema Contable",
    movements: [
      { detail: "Venta mostrador", type: "Ingreso", amount: 1250000 },
      { detail: "Pago arriendo", type: "Gasto", amount: 620000 },
      { detail: "Servicio técnico", type: "Ingreso", amount: 380000 }
    ]
  },
  pos: {
    title: "Sistema POS y Facturación",
    items: [
      { name: "Producto A", quantity: 2, price: 45000 },
      { name: "Servicio B", quantity: 1, price: 90000 }
    ]
  },
  payroll: {
    title: "Sistema de Nómina",
    employees: [
      { name: "Ana Martínez", role: "Administración", salary: 1800000 },
      { name: "Carlos Ruiz", role: "Ventas", salary: 1650000 }
    ]
  }
};

const savedModules = loadSavedModules();
const modules = savedModules || defaultModules;
let currentModule = "accounting";

const selectorView = document.querySelector("#selectorView");
const workspaceView = document.querySelector("#workspaceView");
const modulePanel = document.querySelector("#modulePanel");
const moduleTitle = document.querySelector("#moduleTitle");
const installButton = document.querySelector("#installButton");
const optionButtons = document.querySelectorAll(".module-option");
const tabButtons = document.querySelectorAll(".tab");
let deferredInstallPrompt = null;

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
  modulePanel.innerHTML = `
    <div class="panel-grid">
      <div class="summary-grid">
        <article class="metric"><span>Ingresos</span><strong>${formatMoney(totals.income)}</strong></article>
        <article class="metric"><span>Gastos</span><strong>${formatMoney(totals.expense)}</strong></article>
        <article class="metric"><span>Balance</span><strong>${formatMoney(totals.balance)}</strong></article>
      </div>
      <section class="tool-panel">
        <h3>Nuevo movimiento</h3>
        <form class="form-grid" id="accountingForm">
          <label>Detalle <input name="detail" required placeholder="Ej. Compra de insumos"></label>
          <label>Tipo
            <select name="type">
              <option>Ingreso</option>
              <option>Gasto</option>
            </select>
          </label>
          <label>Monto <input name="amount" required min="0" type="number" placeholder="0"></label>
          <button class="primary-button" type="submit">Registrar</button>
        </form>
      </section>
      <section class="data-panel">
        <h3>Movimientos</h3>
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
}

function renderPos() {
  const subtotal = modules.pos.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + tax;

  modulePanel.innerHTML = `
    <div class="panel-grid">
      <section class="tool-panel">
        <h3>Agregar producto o servicio</h3>
        <form class="invoice-row" id="posForm">
          <label>Nombre <input name="name" required placeholder="Producto"></label>
          <label>Cant. <input name="quantity" required min="1" type="number" value="1"></label>
          <label>Precio <input name="price" required min="0" type="number" placeholder="0"></label>
          <button class="primary-button" type="submit">+</button>
        </form>
      </section>
      <section class="data-panel">
        <h3>Factura</h3>
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
}

function renderPayroll() {
  const monthlyTotal = modules.payroll.employees.reduce((sum, employee) => sum + employee.salary, 0);
  const benefits = Math.round(monthlyTotal * 0.28);

  modulePanel.innerHTML = `
    <div class="panel-grid">
      <div class="summary-grid">
        <article class="metric"><span>Empleados</span><strong>${modules.payroll.employees.length}</strong></article>
        <article class="metric"><span>Nómina mensual</span><strong>${formatMoney(monthlyTotal)}</strong></article>
        <article class="metric"><span>Provisión</span><strong>${formatMoney(benefits)}</strong></article>
      </div>
      <section class="tool-panel">
        <h3>Nuevo empleado</h3>
        <form class="form-grid" id="payrollForm">
          <label>Nombre <input name="name" required placeholder="Nombre completo"></label>
          <label>Cargo <input name="role" required placeholder="Cargo"></label>
          <label>Salario <input name="salary" required min="0" type="number" placeholder="0"></label>
          <button class="primary-button" type="submit">Guardar</button>
        </form>
      </section>
      <section class="data-panel">
        <h3>Empleados</h3>
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
}

optionButtons.forEach((button) => {
  button.addEventListener("click", () => openWorkspace(button.dataset.module));
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveModule(button.dataset.module));
});

document.querySelector("#backButton").addEventListener("click", () => {
  workspaceView.classList.add("hidden");
  selectorView.classList.remove("hidden");
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
