"use strict";

const STORAGE_KEY = "toushi.cashflow.properties.v1";
const LEGACY_STORAGE_KEY = "toushi.cashflow.v1";
const COOKIE_KEY = "toushi_cashflow_properties_v1";
const LEGACY_COOKIE_KEY = "toushi_cashflow_v1";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

const palette = {
  green: "#24765a",
  blue: "#2f64a3",
  amber: "#b16b18",
  red: "#b84c48",
  teal: "#2d8b86",
  olive: "#687b38",
  plum: "#7a5a80",
  gray: "#817a70",
  line: "#dfd8ca",
  text: "#202124",
  muted: "#6f6f68",
};

const defaultScenario = {
  propertyName: "",
  propertyType: "",
  location: "",
  buildingAge: 0,
  floorArea: 0,
  propertyPrice: 0,
  downPayment: 0,
  loanAmount: 0,
  loanYears: 0,
  interestRate: 0,
  loanFee: 0,
  guaranteeFee: 0,
  monthlyRent: 0,
  commonIncome: 0,
  parkingIncome: 0,
  otherIncome: 0,
  vacancyRate: 0,
  rentDeclineRate: 0,
  managementFeeRate: 0,
  buildingManagementFee: 0,
  reserveFund: 0,
  propertyTaxAnnual: 0,
  cityPlanningTaxAnnual: 0,
  fireInsuranceAnnual: 0,
  earthquakeInsuranceAnnual: 0,
  repairReserveMonthly: 0,
  otherMonthlyCost: 0,
  otherAnnualCost: 0,
  brokerageFee: 0,
  registrationCost: 0,
  judicialScrivenerFee: 0,
  stampTax: 0,
  acquisitionTax: 0,
  propertyTaxSettlement: 0,
  initialInsuranceCost: 0,
  loanAdminFee: 0,
  initialRenovationCost: 0,
  equipmentCost: 0,
  otherInitialCost: 0,
  moveOutCycleYears: 0,
  vacancyMonthsOnTurnover: 0,
  restorationCost: 0,
  cleaningCost: 0,
  advertisingFeeMonths: 0,
  leasingCommissionMonths: 0,
  keyReplacementCost: 0,
  depositSettlement: 0,
  turnoverRentDeclineRate: 0,
  targetCashOnCash: 0,
};

const formSections = [
  {
    title: "物件情報",
    open: true,
    fields: [
      { key: "propertyName", label: "物件名", type: "text" },
      {
        key: "propertyType",
        label: "物件種別",
        type: "select",
        options: ["区分マンション", "一棟アパート", "一棟マンション", "戸建て", "その他"],
      },
      { key: "location", label: "所在地", type: "text" },
      { key: "buildingAge", label: "築年数", unit: "年", min: 0, step: 1 },
      { key: "floorArea", label: "面積", unit: "m2", min: 0, step: 0.1 },
      { key: "propertyPrice", label: "物件価格", unit: "円", min: 0, step: 10000 },
    ],
  },
  {
    title: "融資条件",
    open: true,
    fields: [
      { key: "downPayment", label: "頭金", unit: "円", min: 0, step: 10000 },
      { key: "loanAmount", label: "融資額", unit: "円", min: 0, step: 10000 },
      { key: "loanYears", label: "借入期間", unit: "年", min: 1, step: 1 },
      { key: "interestRate", label: "金利", unit: "%", min: 0, step: 0.01 },
      { key: "loanFee", label: "融資手数料", unit: "円", min: 0, step: 1000 },
      { key: "guaranteeFee", label: "保証料", unit: "円", min: 0, step: 1000 },
    ],
  },
  {
    title: "収入条件",
    open: true,
    fields: [
      { key: "monthlyRent", label: "月額家賃", unit: "円", min: 0, step: 1000 },
      { key: "commonIncome", label: "共益費・管理費収入", unit: "円", min: 0, step: 1000 },
      { key: "parkingIncome", label: "駐車場収入", unit: "円", min: 0, step: 1000 },
      { key: "otherIncome", label: "その他収入", unit: "円", min: 0, step: 1000 },
      { key: "vacancyRate", label: "空室率", unit: "%", min: 0, max: 100, step: 0.1 },
      { key: "rentDeclineRate", label: "年次家賃下落率", unit: "%", min: 0, max: 20, step: 0.1 },
    ],
  },
  {
    title: "運営費条件",
    open: false,
    fields: [
      { key: "managementFeeRate", label: "管理委託費率", unit: "%", min: 0, max: 100, step: 0.1 },
      { key: "buildingManagementFee", label: "建物管理費", unit: "円/月", min: 0, step: 1000 },
      { key: "reserveFund", label: "修繕積立金", unit: "円/月", min: 0, step: 1000 },
      { key: "propertyTaxAnnual", label: "固定資産税", unit: "円/年", min: 0, step: 1000 },
      { key: "cityPlanningTaxAnnual", label: "都市計画税", unit: "円/年", min: 0, step: 1000 },
      { key: "fireInsuranceAnnual", label: "火災保険料", unit: "円/年", min: 0, step: 1000 },
      { key: "earthquakeInsuranceAnnual", label: "地震保険料", unit: "円/年", min: 0, step: 1000 },
      { key: "repairReserveMonthly", label: "修繕予備費", unit: "円/月", min: 0, step: 1000 },
      { key: "otherMonthlyCost", label: "その他月次費用", unit: "円/月", min: 0, step: 1000 },
      { key: "otherAnnualCost", label: "その他年次費用", unit: "円/年", min: 0, step: 1000 },
    ],
  },
  {
    title: "初期費用条件",
    open: false,
    fields: [
      { key: "brokerageFee", label: "仲介手数料", unit: "円", min: 0, step: 1000 },
      { key: "registrationCost", label: "登記費用", unit: "円", min: 0, step: 1000 },
      { key: "judicialScrivenerFee", label: "司法書士報酬", unit: "円", min: 0, step: 1000 },
      { key: "stampTax", label: "印紙税", unit: "円", min: 0, step: 1000 },
      { key: "acquisitionTax", label: "不動産取得税", unit: "円", min: 0, step: 1000 },
      { key: "propertyTaxSettlement", label: "固定資産税等精算金", unit: "円", min: 0, step: 1000 },
      { key: "initialInsuranceCost", label: "保険料初年度分", unit: "円", min: 0, step: 1000 },
      { key: "loanAdminFee", label: "ローン事務手数料", unit: "円", min: 0, step: 1000 },
      { key: "initialRenovationCost", label: "初期リフォーム費用", unit: "円", min: 0, step: 1000 },
      { key: "equipmentCost", label: "設備交換費用", unit: "円", min: 0, step: 1000 },
      { key: "otherInitialCost", label: "その他購入時費用", unit: "円", min: 0, step: 1000 },
    ],
  },
  {
    title: "退去条件",
    open: false,
    fields: [
      { key: "moveOutCycleYears", label: "想定入居期間", unit: "年", min: 0.1, step: 0.1 },
      { key: "vacancyMonthsOnTurnover", label: "退去時空室期間", unit: "か月", min: 0, step: 0.1 },
      { key: "restorationCost", label: "原状回復費", unit: "円", min: 0, step: 1000 },
      { key: "cleaningCost", label: "クリーニング費", unit: "円", min: 0, step: 1000 },
      { key: "advertisingFeeMonths", label: "募集広告費", unit: "家賃か月分", min: 0, step: 0.1 },
      { key: "leasingCommissionMonths", label: "客付け仲介手数料", unit: "家賃か月分", min: 0, step: 0.1 },
      { key: "keyReplacementCost", label: "鍵交換費用", unit: "円", min: 0, step: 1000 },
      { key: "depositSettlement", label: "敷金精算額", unit: "円", min: 0, step: 1000 },
      { key: "turnoverRentDeclineRate", label: "退去時家賃下落率", unit: "%", min: 0, max: 30, step: 0.1 },
      { key: "targetCashOnCash", label: "目標自己資金利回り", unit: "%", min: 0, step: 0.1 },
    ],
  },
];

let state = loadScenario();
let activeChart = "initial";
let toastTimer = null;

const formEl = document.getElementById("scenarioForm");
const formSectionsEl = document.getElementById("formSections");
const propertySelectorEl = document.getElementById("propertySelector");
const yamlModalEl = document.getElementById("yamlModal");
const yamlModalTitleEl = document.getElementById("yamlModalTitle");
const yamlModalHelpEl = document.getElementById("yamlModalHelp");
const yamlTextEl = document.getElementById("yamlText");
const yamlCopyButtonEl = document.getElementById("yamlCopyButton");
const yamlApplyButtonEl = document.getElementById("yamlApplyButton");
const kpiGridEl = document.getElementById("kpiGrid");
const chartStageEl = document.getElementById("chartStage");
const monthlyTableEl = document.getElementById("monthlyTable");
const annualTableEl = document.getElementById("annualTable");
const riskListEl = document.getElementById("riskList");
const toastEl = document.getElementById("toast");

renderForm();
bindEvents();
renderApp();

function renderForm() {
  syncActiveProperty();
  renderPropertySelector();
  formSectionsEl.innerHTML = formSections
    .map((section) => {
      const fields = section.fields.map(renderField).join("");
      return `
        <details class="form-section" ${section.open ? "open" : ""}>
          <summary>${escapeHtml(section.title)}</summary>
          <div class="field-grid">${fields}</div>
        </details>
      `;
    })
    .join("");

  Object.entries(state.values).forEach(([key, value]) => {
    const input = formEl.elements[key];
    if (input) {
      input.value = value;
    }
  });

}

function renderPropertySelector() {
  const activeProperty = syncActiveProperty();
  propertySelectorEl.innerHTML = state.properties
    .map((property) => {
      const label = propertyLabel(property);
      const selected = property.id === activeProperty.id ? "selected" : "";
      return `<option value="${escapeHtml(property.id)}" ${selected}>${escapeHtml(label)}</option>`;
    })
    .join("");
  propertySelectorEl.value = activeProperty.id;
}

function renderField(field) {
  const value = state.values[field.key] ?? "";
  const id = `field-${field.key}`;
  const unit = field.unit ? `<span class="unit">${escapeHtml(field.unit)}</span>` : "";
  const constraints = [
    field.min !== undefined ? `min="${field.min}"` : "",
    field.max !== undefined ? `max="${field.max}"` : "",
    field.step !== undefined ? `step="${field.step}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  let control = "";
  if (field.type === "select") {
    control = `
      <select id="${id}" name="${field.key}">
        <option value="" ${value === "" ? "selected" : ""}>未選択</option>
        ${field.options
          .map((option) => `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>`)
          .join("")}
      </select>
    `;
  } else if (field.type === "text") {
    control = `<input id="${id}" name="${field.key}" type="text" value="${escapeHtml(value)}">`;
  } else {
    control = `<input id="${id}" name="${field.key}" type="number" value="${Number(value)}" ${constraints}>`;
  }

  return `
    <div class="field">
      <label for="${id}">${escapeHtml(field.label)}</label>
      <div class="input-wrap">
        ${control}
        ${unit}
      </div>
    </div>
  `;
}

function bindEvents() {
  formEl.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
    const field = getField(target.name);
    if (!field) return;
    state.values[target.name] = field.type === "text" || field.type === "select" ? target.value : toNumber(target.value);
    persistScenario();
    if (target.name === "propertyName" || target.name === "location") {
      renderPropertySelector();
    }
    renderApp();
  });

  propertySelectorEl.addEventListener("change", () => {
    const property = state.properties.find((item) => item.id === propertySelectorEl.value);
    if (!property) return;
    state.activePropertyId = property.id;
    state.values = property.values;
    renderForm();
    persistScenario();
    renderApp();
    showToast("保存物件を切り替えました");
  });

  document.getElementById("resetButton").addEventListener("click", () => {
    const property = createProperty();
    state.properties.push(property);
    state.activePropertyId = property.id;
    state.values = property.values;
    renderForm();
    persistScenario();
    renderApp();
    showToast("新規物件を作成しました");
  });

  document.getElementById("clearStorageButton").addEventListener("click", () => {
    deleteActiveProperty();
    renderForm();
    persistScenario();
    renderApp();
  });

  document.getElementById("yamlImportButton").addEventListener("click", () => {
    openYamlModal("import");
  });

  document.getElementById("yamlExportButton").addEventListener("click", () => {
    openYamlModal("export");
  });

  document.getElementById("yamlCloseButton").addEventListener("click", closeYamlModal);

  yamlModalEl.addEventListener("click", (event) => {
    if (event.target === yamlModalEl) closeYamlModal();
  });

  yamlCopyButtonEl.addEventListener("click", copyYamlText);

  yamlApplyButtonEl.addEventListener("click", importYamlText);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !yamlModalEl.hidden) {
      closeYamlModal();
    }
  });

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeChart = button.dataset.chart;
      document.querySelectorAll(".tab-button").forEach((tab) => tab.classList.toggle("active", tab === button));
      renderChart(calculate(state.values));
    });
  });
}

function renderApp() {
  const result = calculate(state.values);
  renderScenarioTitle(result);
  renderJudge(result);
  renderKpis(result);
  renderRisks(result);
  renderChart(result);
  renderTables(result);
}

function renderScenarioTitle(result) {
  document.getElementById("scenarioName").textContent = state.values.propertyName || "名称未設定";
  document.getElementById("scenarioMeta").textContent = [
    state.values.propertyType || "種別未設定",
    state.values.location || "所在地未設定",
    `${formatNumber(state.values.buildingAge)}年`,
    `${formatNumber(state.values.floorArea)}m2`,
  ].join(" / ");

  if (result.warnings.length > 0) {
    document.getElementById("scenarioMeta").textContent += ` / 警告 ${result.warnings.length}件`;
  }
}

function renderJudge(result) {
  const judge = judgeInvestment(result);
  const card = document.getElementById("judgeCard");
  card.classList.toggle("warn", judge.level === "warn");
  card.classList.toggle("danger", judge.level === "danger");
  document.getElementById("judgeValue").textContent = judge.label;
  document.getElementById("judgeReason").textContent = judge.reason;
}

function renderKpis(result) {
  const kpis = [
    ["必要自己資金", formatYen(result.initial.requiredEquity), "購入時に必要な現金", ""],
    ["月次CF", formatYen(result.monthly.cashflow), "ローン返済後", result.monthly.cashflow >= 0 ? "positive" : "negative"],
    ["年次CF", formatYen(result.annual.cashflow), "税引前", result.annual.cashflow >= 0 ? "positive" : "negative"],
    [
      "退去考慮後CF",
      formatYen(result.turnover.annualCashflowAfterTurnover),
      "年換算退去コスト反映",
      result.turnover.annualCashflowAfterTurnover >= 0 ? "positive" : "negative",
    ],
    ["表面利回り", formatPercent(result.yields.grossYield), "満室収入 ÷ 物件価格", ""],
    ["実質利回り", formatPercent(result.yields.netYield), "NOI ÷ 物件価格", ""],
    [
      "自己資金利回り",
      formatPercent(result.yields.cashOnCash),
      `目標 ${formatPercent(state.values.targetCashOnCash / 100)}`,
      result.yields.cashOnCash >= state.values.targetCashOnCash / 100 ? "positive" : "negative",
    ],
    ["DSCR", formatRatio(result.yields.dscr), "年間NOI ÷ 年間返済", result.yields.dscr >= 1.2 ? "positive" : result.yields.dscr < 1 ? "negative" : ""],
  ];

  kpiGridEl.innerHTML = kpis
    .map(
      ([label, value, sub, stateClass]) => `
        <article class="kpi-card ${stateClass}">
          <div class="label">${label}</div>
          <div class="value">${value}</div>
          <div class="sub">${sub}</div>
        </article>
      `,
    )
    .join("");
}

function renderRisks(result) {
  const riskItems = [
    {
      title: `損益分岐家賃 ${formatYen(result.breakEven.monthlyRent)}`,
      detail: `現在家賃との差 ${formatYen(result.monthly.fullIncome - result.breakEven.monthlyRent)}`,
      status: result.monthly.fullIncome >= result.breakEven.monthlyRent * 1.1 ? "good" : result.monthly.fullIncome >= result.breakEven.monthlyRent ? "warn" : "bad",
    },
    {
      title: `損益分岐空室率 ${formatPercent(result.breakEven.vacancyRate)}`,
      detail: "この空室率を超えると月次CFが赤字化",
      status: result.breakEven.vacancyRate >= 0.2 ? "good" : result.breakEven.vacancyRate >= 0.1 ? "warn" : "bad",
    },
    {
      title: `退去1回損失 ${formatYen(result.turnover.eventLoss)}`,
      detail: `年換算 ${formatYen(result.turnover.annualizedCost)}`,
      status: result.turnover.annualCashflowAfterTurnover > 0 ? "good" : result.annual.cashflow > 0 ? "warn" : "bad",
    },
  ];

  if (result.warnings.length > 0) {
    riskItems.push({
      title: "入力値の確認",
      detail: result.warnings[0],
      status: "bad",
    });
  }

  riskListEl.innerHTML = riskItems
    .map(
      (item) => `
        <div class="risk-item ${item.status}">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.detail)}</span>
        </div>
      `,
    )
    .join("");
}

function renderChart(result) {
  const chartMap = {
    initial: () => renderInitialChart(result),
    monthly: () => renderMonthlyChart(result),
    annual: () => renderAnnualChart(result),
    projection: () => renderProjectionChart(result),
    turnover: () => renderTurnoverChart(result),
    sensitivity: () => renderSensitivity(result),
  };
  chartStageEl.innerHTML = chartMap[activeChart]();
}

function renderInitialChart(result) {
  const parts = result.initial.parts.filter((part) => part.value > 0);
  return `
    <div class="chart-grid">
      <div>
        <p class="chart-card-title">初期費用内訳</p>
        ${donutSvg(parts, "初期費用内訳")}
      </div>
      ${legend(parts, result.initial.total)}
    </div>
  `;
}

function renderMonthlyChart(result) {
  const parts = [
    { name: "実効月収", value: result.monthly.effectiveIncome, color: palette.green },
    { name: "運営費", value: -result.monthly.operatingCost, color: palette.amber },
    { name: "ローン返済", value: -result.monthly.loanPayment, color: palette.blue },
    { name: "月次CF", value: result.monthly.cashflow, color: result.monthly.cashflow >= 0 ? palette.green : palette.red },
  ];

  return `
    <div>
      <p class="chart-card-title">月次収支ウォーターフォール</p>
      ${barSvg(parts, "月次収支", true)}
    </div>
  `;
}

function renderAnnualChart(result) {
  const parts = [
    { name: "年間実効収入", value: result.annual.effectiveIncome, color: palette.green },
    { name: "年間運営費", value: -result.annual.operatingCost, color: palette.amber },
    { name: "年間返済", value: -result.annual.loanPayment, color: palette.blue },
    { name: "年次CF", value: result.annual.cashflow, color: result.annual.cashflow >= 0 ? palette.green : palette.red },
    {
      name: "退去考慮後CF",
      value: result.turnover.annualCashflowAfterTurnover,
      color: result.turnover.annualCashflowAfterTurnover >= 0 ? palette.teal : palette.red,
    },
  ];

  return `
    <div>
      <p class="chart-card-title">年次収支</p>
      ${barSvg(parts, "年次収支", false)}
    </div>
  `;
}

function renderProjectionChart(result) {
  return `
    <div>
      <p class="chart-card-title">ローン残債・累計CF推移</p>
      ${projectionSvg(result.projection)}
    </div>
  `;
}

function renderTurnoverChart(result) {
  const parts = [
    { name: "空室損失", value: result.turnover.vacancyLoss, color: palette.blue },
    { name: "原状回復", value: result.values.restorationCost, color: palette.amber },
    { name: "清掃", value: result.values.cleaningCost, color: palette.olive },
    { name: "広告費", value: result.turnover.advertisingFee, color: palette.plum },
    { name: "仲介手数料", value: result.turnover.leasingCommission, color: palette.teal },
    { name: "鍵交換", value: result.values.keyReplacementCost, color: palette.gray },
    { name: "敷金精算", value: -result.values.depositSettlement, color: palette.green },
    { name: "家賃下落年損", value: result.turnover.rentDeclineLoss, color: palette.red },
  ].filter((part) => part.value !== 0);

  return `
    <div class="chart-grid">
      <div>
        <p class="chart-card-title">退去イベント損失</p>
        ${barSvg(parts, "退去イベント損失", true)}
      </div>
      ${legend(parts.map((part) => ({ ...part, value: Math.abs(part.value) })), result.turnover.eventLoss + result.turnover.rentDeclineLoss)}
    </div>
  `;
}

function renderSensitivity(result) {
  const vacancies = [0, 5, 10, 15, 20, 25, 30];
  const baseRate = Number(result.values.interestRate) || 0;
  const rates = [baseRate, baseRate + 0.5, baseRate + 1, baseRate + 2, baseRate + 3];
  const header = rates.map((rate) => `<th>${formatNumber(rate, 1)}%</th>`).join("");
  const rows = vacancies
    .map((vacancy) => {
      const cells = rates
        .map((rate) => {
          const scenario = { ...result.values, vacancyRate: vacancy, interestRate: rate };
          const scenarioResult = calculate(scenario);
          const value = scenarioResult.annual.cashflow;
          const cls = value >= 300000 ? "heat-good" : value >= 0 ? "heat-warn" : "heat-bad";
          return `<td class="${cls}">${formatYen(value)}</td>`;
        })
        .join("");
      return `<tr><th>空室率 ${vacancy}%</th>${cells}</tr>`;
    })
    .join("");

  return `
    <div>
      <p class="chart-card-title">空室率・金利感度分析 年次CF</p>
      <div class="sensitivity-wrap">
        <table class="sensitivity-table">
          <thead><tr><th></th>${header}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTables(result) {
  monthlyTableEl.innerHTML = dataTable([
    ["満室月収", result.monthly.fullIncome],
    ["空室控除", -result.monthly.vacancyLoss],
    ["実効月収", result.monthly.effectiveIncome],
    ["管理委託費", -result.monthly.managementFee],
    ["その他運営費", -(result.monthly.operatingCost - result.monthly.managementFee)],
    ["NOI", result.monthly.noi],
    ["ローン返済", -result.monthly.loanPayment],
    ["月次CF", result.monthly.cashflow],
  ]);

  annualTableEl.innerHTML = dataTable([
    ["満室年収", result.annual.fullIncome],
    ["実効年収", result.annual.effectiveIncome],
    ["年間運営費", -result.annual.operatingCost],
    ["年間NOI", result.annual.noi],
    ["年間ローン返済", -result.annual.loanPayment],
    ["年次CF", result.annual.cashflow],
    ["年換算退去コスト", -result.turnover.annualizedCost],
    ["退去考慮後年次CF", result.turnover.annualCashflowAfterTurnover],
  ]);
}

function dataTable(rows) {
  return `
    <table class="data-table">
      <thead><tr><th>項目</th><th>金額</th></tr></thead>
      <tbody>
        ${rows
          .map((row) => {
            const cls = row[1] >= 0 ? "positive-text" : "negative-text";
            return `<tr><td>${escapeHtml(row[0])}</td><td class="${cls}">${formatYen(row[1])}</td></tr>`;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function calculate(inputValues) {
  const values = normalizeValues(inputValues);
  const fullMonthlyIncome = values.monthlyRent + values.commonIncome + values.parkingIncome + values.otherIncome;
  const vacancyLoss = fullMonthlyIncome * ratio(values.vacancyRate);
  const effectiveMonthlyIncome = fullMonthlyIncome - vacancyLoss;
  const managementFee = effectiveMonthlyIncome * ratio(values.managementFeeRate);
  const taxMonthly = (values.propertyTaxAnnual + values.cityPlanningTaxAnnual) / 12;
  const insuranceMonthly = (values.fireInsuranceAnnual + values.earthquakeInsuranceAnnual) / 12;
  const annualCostMonthly = values.otherAnnualCost / 12;
  const fixedMonthlyCosts =
    values.buildingManagementFee +
    values.reserveFund +
    taxMonthly +
    insuranceMonthly +
    values.repairReserveMonthly +
    values.otherMonthlyCost +
    annualCostMonthly;
  const operatingCost = managementFee + fixedMonthlyCosts;
  const noi = effectiveMonthlyIncome - operatingCost;
  const loanPayment = calcMonthlyLoanPayment(values.loanAmount, values.interestRate, values.loanYears);
  const monthlyCashflow = noi - loanPayment;

  const initialParts = [
    { name: "頭金", value: values.downPayment, color: palette.green },
    { name: "仲介手数料", value: values.brokerageFee, color: palette.blue },
    { name: "登記・司法書士", value: values.registrationCost + values.judicialScrivenerFee, color: palette.amber },
    { name: "税金・精算金", value: values.stampTax + values.acquisitionTax + values.propertyTaxSettlement, color: palette.red },
    { name: "保険・融資費用", value: values.initialInsuranceCost + values.loanAdminFee + values.loanFee + values.guaranteeFee, color: palette.teal },
    { name: "リフォーム・設備", value: values.initialRenovationCost + values.equipmentCost, color: palette.plum },
    { name: "その他", value: values.otherInitialCost, color: palette.gray },
  ];
  const initialTotal = sum(initialParts.map((part) => part.value));

  const annual = {
    fullIncome: fullMonthlyIncome * 12,
    effectiveIncome: effectiveMonthlyIncome * 12,
    operatingCost: operatingCost * 12,
    noi: noi * 12,
    loanPayment: loanPayment * 12,
    cashflow: monthlyCashflow * 12,
  };

  const advertisingFee = values.monthlyRent * values.advertisingFeeMonths;
  const leasingCommission = values.monthlyRent * values.leasingCommissionMonths;
  const vacancyLossOnTurnover = fullMonthlyIncome * values.vacancyMonthsOnTurnover;
  const rentDeclineLoss = fullMonthlyIncome * ratio(values.turnoverRentDeclineRate) * 12;
  const turnoverEventLoss =
    vacancyLossOnTurnover +
    values.restorationCost +
    values.cleaningCost +
    advertisingFee +
    leasingCommission +
    values.keyReplacementCost -
    values.depositSettlement;
  const annualizedTurnoverCost = safeDivide(turnoverEventLoss, values.moveOutCycleYears) + rentDeclineLoss;

  const yields = {
    grossYield: safeDivide(annual.fullIncome, values.propertyPrice),
    netYield: safeDivide(annual.noi, values.propertyPrice),
    cashOnCash: safeDivide(annual.cashflow, initialTotal),
    dscr: safeDivide(annual.noi, annual.loanPayment),
  };

  const breakEven = {
    monthlyRent: operatingCost + loanPayment,
    vacancyRate: clamp(1 - safeDivide(operatingCost + loanPayment, fullMonthlyIncome), -1, 1),
  };

  const projection = buildProjection(values, monthlyCashflow, fullMonthlyIncome, operatingCost, loanPayment);
  const warnings = validate(values, fullMonthlyIncome, initialTotal);

  return {
    values,
    monthly: {
      fullIncome: fullMonthlyIncome,
      vacancyLoss,
      effectiveIncome: effectiveMonthlyIncome,
      managementFee,
      operatingCost,
      noi,
      loanPayment,
      cashflow: monthlyCashflow,
    },
    annual,
    initial: {
      parts: initialParts,
      total: initialTotal,
      requiredEquity: initialTotal,
    },
    yields,
    turnover: {
      vacancyLoss: vacancyLossOnTurnover,
      advertisingFee,
      leasingCommission,
      rentDeclineLoss,
      eventLoss: turnoverEventLoss,
      annualizedCost: annualizedTurnoverCost,
      annualCashflowAfterTurnover: annual.cashflow - annualizedTurnoverCost,
    },
    breakEven,
    projection,
    warnings,
  };
}

function buildProjection(values, currentMonthlyCashflow, fullMonthlyIncome, operatingCost, loanPayment) {
  const maxYears = Math.max(1, Math.min(30, Math.ceil(values.loanYears || 1)));
  const monthlyRate = ratio(values.interestRate) / 12;
  let balance = values.loanAmount;
  let cumulativeCashflow = 0;
  const rows = [];

  for (let year = 1; year <= maxYears; year += 1) {
    let debtPaidThisYear = 0;
    for (let month = 1; month <= 12; month += 1) {
      if (balance <= 0) break;
      const interest = balance * monthlyRate;
      const payment = Math.min(loanPayment, balance + interest);
      debtPaidThisYear += payment;
      const principal = Math.max(0, payment - interest);
      balance = Math.max(0, balance - principal);
    }

    const declineFactor = Math.pow(1 - ratio(values.rentDeclineRate), year - 1);
    const annualIncome = fullMonthlyIncome * declineFactor * (1 - ratio(values.vacancyRate)) * 12;
    const annualOperating = operatingCost * 12;
    const annualDebt = debtPaidThisYear;
    const annualCashflow = annualIncome - annualOperating - annualDebt;
    cumulativeCashflow += Number.isFinite(annualCashflow) ? annualCashflow : currentMonthlyCashflow * 12;

    rows.push({
      year,
      balance,
      annualCashflow,
      cumulativeCashflow,
    });
  }

  return rows;
}

function calcMonthlyLoanPayment(amount, annualRate, years) {
  const months = Math.max(1, years * 12);
  const monthlyRate = ratio(annualRate) / 12;
  if (amount <= 0) return 0;
  if (monthlyRate <= 0) return amount / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (amount * monthlyRate * factor) / (factor - 1);
}

function judgeInvestment(result) {
  if (result.warnings.length > 0) {
    return {
      level: "danger",
      label: "要確認",
      reason: result.warnings[0],
    };
  }

  const good =
    result.monthly.cashflow > 0 &&
    result.yields.dscr >= 1.2 &&
    result.yields.cashOnCash >= result.values.targetCashOnCash / 100 &&
    result.turnover.annualCashflowAfterTurnover > 0 &&
    result.breakEven.vacancyRate >= 0.2;

  if (good) {
    return {
      level: "good",
      label: "良好",
      reason: "CF、DSCR、退去耐性が基準を満たしています",
    };
  }

  const danger =
    result.monthly.cashflow < 0 ||
    result.yields.dscr < 1 ||
    result.turnover.annualCashflowAfterTurnover < 0 ||
    result.breakEven.vacancyRate < 0.1;

  if (danger) {
    return {
      level: "danger",
      label: "危険",
      reason: "赤字化または返済余力不足の可能性があります",
    };
  }

  return {
    level: "warn",
    label: "注意",
    reason: "条件悪化時の収支耐性を確認してください",
  };
}

function validate(values, fullMonthlyIncome, initialTotal) {
  const warnings = [];
  if (values.propertyPrice <= 0) warnings.push("物件価格を入力してください");
  if (fullMonthlyIncome <= 0) warnings.push("月額収入を入力してください");
  if (initialTotal <= 0) warnings.push("初期費用または頭金を入力してください");
  if (values.loanAmount > values.propertyPrice * 1.2) warnings.push("融資額が物件価格に対して大きすぎます");
  if (values.vacancyRate >= 100) warnings.push("空室率が100%以上です");
  return warnings;
}

function donutSvg(parts, title) {
  const total = sum(parts.map((part) => part.value));
  if (total <= 0) return emptyChart("初期費用が未入力です");

  let angle = -90;
  const paths = parts
    .map((part) => {
      const slice = (part.value / total) * 360;
      const path = describeDonutSlice(160, 160, 114, 64, angle, angle + slice);
      angle += slice;
      return `<path d="${path}" fill="${part.color}"><title>${escapeHtml(part.name)} ${formatYen(part.value)}</title></path>`;
    })
    .join("");

  return `
    <svg class="chart-svg donut-chart" viewBox="0 0 320 320" role="img" aria-label="${escapeHtml(title)}">
      ${paths}
      <circle cx="160" cy="160" r="62" fill="#fff"></circle>
      <text x="160" y="150" text-anchor="middle" fill="${palette.muted}" font-size="13" font-weight="800">合計</text>
      <text x="160" y="178" text-anchor="middle" fill="${palette.text}" font-size="22" font-weight="900">${formatShortYen(total)}</text>
    </svg>
  `;
}

function describeDonutSlice(cx, cy, outerR, innerR, startAngle, endAngle) {
  const startOuter = polarToCartesian(cx, cy, outerR, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
  const startInner = polarToCartesian(cx, cy, innerR, startAngle);
  const endInner = polarToCartesian(cx, cy, innerR, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    startOuter.x,
    startOuter.y,
    "A",
    outerR,
    outerR,
    0,
    largeArcFlag,
    0,
    endOuter.x,
    endOuter.y,
    "L",
    startInner.x,
    startInner.y,
    "A",
    innerR,
    innerR,
    0,
    largeArcFlag,
    1,
    endInner.x,
    endInner.y,
    "Z",
  ].join(" ");
}

function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function barSvg(parts, title, showSigned) {
  if (!parts.length) return emptyChart(`${title}のデータがありません`);

  const width = 880;
  const height = 330;
  const pad = { top: 28, right: 24, bottom: 70, left: 70 };
  const values = parts.map((part) => part.value);
  const maxAbs = Math.max(1, ...values.map((value) => Math.abs(value)));
  const yMax = maxAbs * 1.2;
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const zeroY = pad.top + plotH / 2;
  const barW = Math.min(96, plotW / parts.length - 22);

  const y = (value) => zeroY - (value / yMax) * (plotH / 2);
  const x = (index) => pad.left + (plotW / parts.length) * index + (plotW / parts.length - barW) / 2;

  const bars = parts
    .map((part, index) => {
      const valueY = y(part.value);
      const rectY = part.value >= 0 ? valueY : zeroY;
      const rectH = Math.max(2, Math.abs(zeroY - valueY));
      return `
        <g>
          <rect x="${x(index)}" y="${rectY}" width="${barW}" height="${rectH}" rx="5" fill="${part.color}"></rect>
          <text x="${x(index) + barW / 2}" y="${part.value >= 0 ? rectY - 8 : rectY + rectH + 18}" text-anchor="middle" fill="${palette.text}" font-size="13" font-weight="850">
            ${showSigned ? formatShortSignedYen(part.value) : formatShortYen(part.value)}
          </text>
          <text x="${x(index) + barW / 2}" y="${height - 28}" text-anchor="middle" fill="${palette.muted}" font-size="12" font-weight="800">
            ${escapeHtml(part.name)}
          </text>
        </g>
      `;
    })
    .join("");

  return `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(title)}">
      <line x1="${pad.left}" y1="${zeroY}" x2="${width - pad.right}" y2="${zeroY}" stroke="${palette.line}" stroke-width="2"></line>
      <text x="${pad.left}" y="${pad.top}" fill="${palette.muted}" font-size="12">${formatShortYen(yMax)}</text>
      <text x="${pad.left}" y="${height - pad.bottom + 52}" fill="${palette.muted}" font-size="12">${formatShortYen(-yMax)}</text>
      ${bars}
    </svg>
  `;
}

function projectionSvg(rows) {
  const width = 880;
  const height = 340;
  const pad = { top: 28, right: 40, bottom: 48, left: 70 };
  if (!rows.length) return emptyChart("推移データがありません");

  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const maxBalance = Math.max(1, ...rows.map((row) => row.balance));
  const cfValues = rows.map((row) => row.cumulativeCashflow);
  const minCf = Math.min(0, ...cfValues);
  const maxCf = Math.max(1, ...cfValues);
  const cfRange = maxCf - minCf || 1;
  const x = (index) => pad.left + (plotW * index) / Math.max(1, rows.length - 1);
  const yBalance = (value) => pad.top + plotH - (value / maxBalance) * plotH;
  const yCf = (value) => pad.top + plotH - ((value - minCf) / cfRange) * plotH;
  const balanceLine = rows.map((row, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${yBalance(row.balance)}`).join(" ");
  const cfLine = rows.map((row, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${yCf(row.cumulativeCashflow)}`).join(" ");
  const yearTicks = rows
    .filter((row) => row.year === 1 || row.year % 5 === 0 || row.year === rows.length)
    .map((row) => {
      const index = rows.indexOf(row);
      return `
        <line x1="${x(index)}" y1="${height - pad.bottom}" x2="${x(index)}" y2="${height - pad.bottom + 5}" stroke="${palette.line}"></line>
        <text x="${x(index)}" y="${height - 18}" text-anchor="middle" fill="${palette.muted}" font-size="11">${row.year}年</text>
      `;
    })
    .join("");

  return `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="ローン残債・累計CF推移">
      <rect x="${pad.left}" y="${pad.top}" width="${plotW}" height="${plotH}" fill="#fbfaf7" stroke="${palette.line}"></rect>
      <path d="${balanceLine}" fill="none" stroke="${palette.blue}" stroke-width="4" stroke-linecap="round"></path>
      <path d="${cfLine}" fill="none" stroke="${palette.green}" stroke-width="4" stroke-linecap="round"></path>
      ${yearTicks}
      <text x="${pad.left}" y="18" fill="${palette.blue}" font-size="12" font-weight="850">ローン残債 最大 ${formatShortYen(maxBalance)}</text>
      <text x="${width - pad.right}" y="18" text-anchor="end" fill="${palette.green}" font-size="12" font-weight="850">累計CF ${formatShortYen(rows[rows.length - 1].cumulativeCashflow)}</text>
    </svg>
  `;
}

function legend(parts, total) {
  return `
    <div class="legend">
      ${parts
        .map(
          (part) => `
            <div class="legend-row">
              <span class="legend-swatch" style="background:${part.color}"></span>
              <span>${escapeHtml(part.name)}</span>
              <strong>${formatYen(part.value)}</strong>
            </div>
          `,
        )
        .join("")}
      <div class="legend-row">
        <span class="legend-swatch" style="background:${palette.text}"></span>
        <span>合計</span>
        <strong>${formatYen(total)}</strong>
      </div>
    </div>
  `;
}

function emptyChart(message) {
  return `
    <div class="risk-item warn">
      <strong>${escapeHtml(message)}</strong>
      <span>入力値を更新してください</span>
    </div>
  `;
}

function loadScenario() {
  try {
    const local = window.localStorage.getItem(STORAGE_KEY);
    if (local) {
      return normalizeLoadedState(JSON.parse(local), "local");
    }
    const legacyLocal = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyLocal) {
      return normalizeLegacyState(JSON.parse(legacyLocal), "local");
    }
  } catch (error) {
    console.warn("localStorage load failed", error);
  }

  const cookie = readCookie(COOKIE_KEY);
  if (cookie) {
    try {
      return normalizeLoadedState(JSON.parse(cookie), "cookie");
    } catch (error) {
      console.warn("cookie load failed", error);
    }
  }

  const legacyCookie = readCookie(LEGACY_COOKIE_KEY);
  if (legacyCookie) {
    try {
      return normalizeLegacyState(JSON.parse(legacyCookie), "cookie");
    } catch (error) {
      console.warn("legacy cookie load failed", error);
    }
  }

  return createState([createProperty()]);
}

function normalizeLoadedState(loaded, fallbackMode) {
  if (!loaded || typeof loaded !== "object") {
    return createState([createProperty()], fallbackMode);
  }
  if (!Array.isArray(loaded.properties)) {
    return normalizeLegacyState(loaded, fallbackMode);
  }
  const properties = loaded.properties
    .map((property) => createProperty(property.values, property.id))
    .filter((property) => property.id);
  return createState(properties.length > 0 ? properties : [createProperty()], fallbackMode, loaded.activePropertyId);
}

function normalizeLegacyState(loaded, fallbackMode) {
  if (!loaded || typeof loaded !== "object") {
    return createState([createProperty()], fallbackMode);
  }
  return createState([createProperty(loaded.values || loaded)], fallbackMode);
}

function createState(properties, storageMode = "local", activePropertyId = "") {
  const nextState = {
    storageMode,
    activePropertyId: activePropertyId || properties[0]?.id || "",
    properties,
    values: {},
  };
  syncActiveProperty(nextState);
  return nextState;
}

function createProperty(values = createEmptyScenario(), id = createPropertyId()) {
  return {
    id,
    values: normalizeValues(values),
  };
}

function createPropertyId() {
  return `property-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function syncActiveProperty(targetState = state) {
  if (!Array.isArray(targetState.properties) || targetState.properties.length === 0) {
    targetState.properties = [createProperty()];
  }
  let activeProperty = targetState.properties.find((property) => property.id === targetState.activePropertyId);
  if (!activeProperty) {
    activeProperty = targetState.properties[0];
    targetState.activePropertyId = activeProperty.id;
  }
  activeProperty.values = normalizeValues(activeProperty.values);
  targetState.values = activeProperty.values;
  return activeProperty;
}

function propertyLabel(property) {
  const values = property.values || {};
  const name = values.propertyName || "名称未設定";
  return values.location ? `${name} / ${values.location}` : name;
}

function persistScenario() {
  syncActiveProperty();
  const payload = JSON.stringify({
    activePropertyId: state.activePropertyId,
    properties: state.properties,
  });

  try {
    window.localStorage.setItem(STORAGE_KEY, payload);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    state.storageMode = "local";
    document.cookie = `${COOKIE_KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = `${LEGACY_COOKIE_KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
  } catch (error) {
    writeCookie(COOKIE_KEY, payload);
    state.storageMode = "cookie";
    showToast("ローカルストレージが使えないためCookieに保存しました");
  }
}

function deleteActiveProperty() {
  const activeProperty = syncActiveProperty();
  const deletedLabel = propertyLabel(activeProperty);
  if (state.properties.length <= 1) {
    const property = createProperty();
    state.properties = [property];
    state.activePropertyId = property.id;
    state.values = property.values;
    showToast("物件を初期化しました");
    return;
  }
  state.properties = state.properties.filter((property) => property.id !== activeProperty.id);
  state.activePropertyId = state.properties[0].id;
  state.values = state.properties[0].values;
  showToast(`${deletedLabel}を削除しました`);
}

function openYamlModal(mode) {
  const isExport = mode === "export";
  yamlModalTitleEl.textContent = isExport ? "YML表示" : "YML貼付";
  yamlModalHelpEl.textContent = isExport
    ? "保存済み物件一覧のYMLです。選択してコピーできます。"
    : "YMLを貼り付けて取り込むと、現在の保存済み物件一覧を置き換えます。";
  yamlTextEl.value = isExport ? stringifyPropertiesYaml() : "";
  yamlCopyButtonEl.hidden = !isExport;
  yamlApplyButtonEl.hidden = isExport;
  yamlModalEl.hidden = false;
  yamlTextEl.focus();
  if (isExport) {
    yamlTextEl.select();
  }
}

function closeYamlModal() {
  yamlModalEl.hidden = true;
}

function copyYamlText() {
  yamlTextEl.select();
  const text = yamlTextEl.value;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast("YMLをコピーしました"))
      .catch(() => fallbackCopyYamlText());
    return;
  }
  fallbackCopyYamlText();
}

function fallbackCopyYamlText() {
  yamlTextEl.select();
  document.execCommand("copy");
  showToast("YMLをコピーしました");
}

function importYamlText() {
  const source = yamlTextEl.value.trim();
  if (!source) {
    showToast("YMLを貼り付けてください");
    return;
  }

  try {
    const importedState = parsePropertiesYaml(source);
    if (!window.confirm("現在の保存物件をYMLの内容で置き換えます。よろしいですか？")) {
      return;
    }
    state = importedState;
    renderForm();
    persistScenario();
    renderApp();
    closeYamlModal();
    showToast(`${state.properties.length}件の物件を取り込みました`);
  } catch (error) {
    console.warn("YML import failed", error);
    showToast("YMLの形式を確認してください");
  }
}

function stringifyPropertiesYaml() {
  const keys = Object.keys(defaultScenario);
  const activeProperty = syncActiveProperty();
  const activePropertyIndex = Math.max(0, state.properties.findIndex((property) => property.id === activeProperty.id));
  const lines = ["version: 1", `activePropertyIndex: ${activePropertyIndex}`, "properties:"];

  state.properties.forEach((property) => {
    const values = normalizeValues(property.values);
    const [firstKey, ...restKeys] = keys;
    lines.push(`  - ${firstKey}: ${yamlScalar(values[firstKey])}`);
    restKeys.forEach((key) => {
      lines.push(`    ${key}: ${yamlScalar(values[key])}`);
    });
  });

  return `${lines.join("\n")}\n`;
}

function parsePropertiesYaml(source) {
  const properties = [];
  let activePropertyIndex = 0;
  let inProperties = false;
  let currentValues = null;

  String(source)
    .replace(/\r/g, "")
    .split("\n")
    .forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const activeMatch = trimmed.match(/^activePropertyIndex:\s*(.+)$/);
      if (activeMatch) {
        activePropertyIndex = Math.max(0, toNumber(parseYamlScalar(activeMatch[1])));
        return;
      }

      if (trimmed === "properties:") {
        inProperties = true;
        return;
      }

      if (!inProperties) return;

      const itemMatch = line.match(/^  -(?:\s+(.+))?$/);
      if (itemMatch) {
        currentValues = {};
        properties.push(currentValues);
        if (itemMatch[1]) {
          assignYamlField(currentValues, itemMatch[1]);
        }
        return;
      }

      const fieldMatch = line.match(/^    (.+)$/);
      if (fieldMatch && currentValues) {
        assignYamlField(currentValues, fieldMatch[1]);
        return;
      }

      throw new Error("Invalid YML format");
    });

  if (properties.length === 0) {
    throw new Error("YML contains no properties");
  }

  const importedProperties = properties.map((values) => createProperty(values));
  const activeProperty = importedProperties[Math.min(activePropertyIndex, importedProperties.length - 1)];
  return createState(importedProperties, "local", activeProperty.id);
}

function assignYamlField(target, source) {
  const match = source.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
  if (!match) {
    throw new Error("Invalid YML field");
  }

  const [, key, rawValue] = match;
  if (!(key in defaultScenario)) return;

  const field = getField(key);
  const value = parseYamlScalar(rawValue);
  target[key] = field?.type === "text" || field?.type === "select" ? String(value ?? "") : toNumber(value);
}

function yamlScalar(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : "0";
  }
  return JSON.stringify(String(value ?? ""));
}

function parseYamlScalar(value) {
  const text = String(value ?? "").trim();
  if (text === "" || text === "null" || text === "~") return "";
  if (text.startsWith('"') && text.endsWith('"')) {
    return JSON.parse(text);
  }
  if (text.startsWith("'") && text.endsWith("'")) {
    return text.slice(1, -1).replaceAll("''", "'");
  }
  if (/^(true|false)$/i.test(text)) {
    return text.toLowerCase() === "true";
  }
  const number = Number(text);
  return Number.isFinite(number) ? number : text;
}

function readCookie(name) {
  const target = `${name}=`;
  const found = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(target));
  return found ? decodeURIComponent(found.slice(target.length)) : "";
}

function writeCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

function createEmptyScenario() {
  return Object.fromEntries(
    Object.entries(defaultScenario).map(([key, value]) => [key, typeof value === "number" ? 0 : ""]),
  );
}

function normalizeValues(inputValues) {
  const values = { ...defaultScenario, ...inputValues };
  formSections
    .flatMap((section) => section.fields)
    .forEach((field) => {
      if (field.type !== "text" && field.type !== "select") {
        values[field.key] = toNumber(values[field.key]);
      }
    });
  return values;
}

function getField(key) {
  return formSections.flatMap((section) => section.fields).find((field) => field.key === key);
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function ratio(percent) {
  return toNumber(percent) / 100;
}

function safeDivide(numerator, denominator) {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return 0;
  return numerator / denominator;
}

function sum(values) {
  return values.reduce((total, value) => total + toNumber(value), 0);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatYen(value) {
  const number = Math.round(toNumber(value));
  const sign = number < 0 ? "-" : "";
  return `${sign}¥${Math.abs(number).toLocaleString("ja-JP")}`;
}

function formatShortYen(value) {
  const number = toNumber(value);
  const sign = number < 0 ? "-" : "";
  const abs = Math.abs(number);
  if (abs >= 100000000) return `${sign}${formatNumber(abs / 100000000, 1)}億円`;
  if (abs >= 10000) return `${sign}${formatNumber(abs / 10000, 1)}万円`;
  return `${sign}${formatNumber(abs, 0)}円`;
}

function formatShortSignedYen(value) {
  const number = toNumber(value);
  return `${number >= 0 ? "+" : "-"}${formatShortYen(Math.abs(number))}`;
}

function formatPercent(value) {
  return `${formatNumber(toNumber(value) * 100, 2)}%`;
}

function formatRatio(value) {
  return `${formatNumber(value, 2)}x`;
}

function formatNumber(value, digits = 0) {
  const number = toNumber(value);
  return number.toLocaleString("ja-JP", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
}
