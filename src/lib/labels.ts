const TYPE_LABELS: Record<string, string> = {
  income: "Pajamos",
  expense: "Išlaidos",
};

const CATEGORY_NAME_LABELS: Record<string, string> = {
  Salary: "Atlyginimas",
  Freelance: "Laisvai samdomas darbas",
  Food: "Maistas",
  Transport: "Transportas",
  Shopping: "Pirkimai",
  Entertainment: "Pramogos",
  Utilities: "Komunalinės paslaugos",
};

const SCENARIO_LABELS: Record<string, string> = {
  Conservative: "Konservatyvus",
  Normal: "Normalus",
  Aggressive: "Agresyvus",
};

const CHART_LABELS: Record<string, string> = {
  scenario: "Scenarijus",
  months: "Mėnesiai",
  date: "Data",
  count: "Skaičius",
  amount: "Suma",
  name: "Pavadinimas",
  title: "Tikslas",
  current_amount: "Dabartinė suma",
};

export function formatType(type: string): string {
  return TYPE_LABELS[type] ?? type;
}

export function formatCategoryName(name: string): string {
  return CATEGORY_NAME_LABELS[name] ?? name;
}

export function formatScenario(scenario: string): string {
  return SCENARIO_LABELS[scenario] ?? scenario;
}

export function formatChartLabel(key: string): string {
  return CHART_LABELS[key] ?? key;
}
