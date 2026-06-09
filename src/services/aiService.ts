import { formatScenario } from "../lib/labels";
import { saveAILog } from "./aiLogService";

function getTotals(
  transactions: any[]
) {

  const totalIncome =
    transactions
      .filter(
        (t) => t.type === "income"
      )
      .reduce(
        (sum, t) =>
          sum + Number(t.amount),
        0
      );

  const totalExpenses =
    transactions
      .filter(
        (t) => t.type === "expense"
      )
      .reduce(
        (sum, t) =>
          sum + Number(t.amount),
        0
      );

  return {
    totalIncome,
    totalExpenses,
    balance:
      totalIncome - totalExpenses,
  };
}

function localInsights(
  transactions: any[],
  goals: any[]
) {

  const {
    totalIncome,
    totalExpenses,
    balance,
  } = getTotals(transactions);

  let message = "";

  if (balance > 0) {
    message +=
      "Jūsų balansas yra teigiamas. ";
  }

  if (totalExpenses > totalIncome) {
    message +=
      "Įspėjimas: išlaidos viršija pajamas. ";
  }

  message +=
    `Šiuo metu turite ${goals.length} aktyvius tikslus. `;

  message +=
    `Bendros pajamos: ${totalIncome} EUR. Bendros išlaidos: ${totalExpenses} EUR.`;

  return message;
}

function localRecommendations(
  transactions: any[],
  goals: any[]
) {

  const { totalExpenses, balance } =
    getTotals(transactions);

  const tips = [];

  if (totalExpenses > 0) {
    tips.push(
      "Peržiūrėkite didžiausias išlaidų kategorijas ir nustatykite savaitinį limitą."
    );
  }

  if (balance < 0) {
    tips.push(
      "Stenkitės mažinti nebūtinas išlaidas, kol balansas vėl taps teigiamas."
    );
  }

  if (goals.length > 0) {
    tips.push(
      "Kiekvieną mėnesį skirti fiksuotą sumą taupymo tikslams."
    );
  }

  if (tips.length === 0) {
    tips.push(
      "Pridėkite daugiau operacijų, kad gautumėte asmenines rekomendacijas."
    );
  }

  return tips.join(" ");
}

function localMonthlySummary(
  transactions: any[],
  goals: any[]
) {

  const now = new Date();

  const monthlyTransactions =
    transactions.filter((t) => {

      const date = new Date(
        t.date || t.created_at
      );

      return (
        date.getMonth() ===
          now.getMonth() &&
        date.getFullYear() ===
          now.getFullYear()
      );
    });

  const {
    totalIncome,
    totalExpenses,
    balance,
  } = getTotals(monthlyTransactions);

  const monthName =
    now.toLocaleString("lt", {
      month: "long",
    });

  return (
    `${monthName} santrauka: pajamos ${totalIncome} EUR, ` +
    `išlaidos ${totalExpenses} EUR, ` +
    `balansas ${balance} EUR. ` +
    `Aktyvūs tikslai: ${goals.length}.`
  );
}

async function callAI(
  prompt: string,
  fallback: () => string
) {

  try {

    const response = await fetch(
      "/api/ai",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          prompt,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "AI API failed"
      );
    }

    const data =
      await response.json();

    if (!data.insight) {
      throw new Error(
        "Empty AI response"
      );
    }

    return {
      result: data.insight as string,
      usedFallback: false,
    };

  } catch {

    return {
      result: fallback(),
      usedFallback: true,
    };
  }
}

async function saveLogSafe(
  prompt: string,
  response: string
) {

  try {
    await saveAILog(prompt, response);
  } catch {
    // istorija neblokuoja puslapio
  }
}

export async function generateInsights(
  transactions: any[],
  goals: any[]
) {

  const prompt = `
Transactions:

${JSON.stringify(transactions)}

Goals:

${JSON.stringify(goals)}

Give 3 brief insights about the user's financial situation. Respond in Lithuanian.
`;

  const { result } = await callAI(
    prompt,
    () =>
      localInsights(
        transactions,
        goals
      )
  );

  await saveLogSafe(prompt, result);

  return result;
}

export async function generateRecommendations(
  transactions: any[],
  goals: any[]
) {

  const prompt = `
Transactions:

${JSON.stringify(transactions)}

Goals:

${JSON.stringify(goals)}

Analyze spending habits and give 3 practical saving recommendations. Respond in Lithuanian.
`;

  const { result } = await callAI(
    prompt,
    () =>
      localRecommendations(
        transactions,
        goals
      )
  );

  await saveLogSafe(prompt, result);

  return result;
}

export async function generateMonthlySummary(
  transactions: any[],
  goals: any[]
) {

  const now = new Date();

  const monthlyTransactions =
    transactions.filter((t) => {

      const date = new Date(
        t.date || t.created_at
      );

      return (
        date.getMonth() ===
          now.getMonth() &&
        date.getFullYear() ===
          now.getFullYear()
      );
    });

  const prompt = `
Monthly transactions:

${JSON.stringify(monthlyTransactions)}

Goals:

${JSON.stringify(goals)}

Write a short monthly financial summary with income, expenses, and balance. Respond in Lithuanian.
`;

  const { result } = await callAI(
    prompt,
    () =>
      localMonthlySummary(
        transactions,
        goals
      )
  );

  await saveLogSafe(prompt, result);

  return result;
}

function localScenarioAnalysis(
  scenarios: any[]
) {

  const best = [...scenarios].sort(
    (a, b) => a.months - b.months
  )[0];

  if (!best || best.months <= 0) {
    return (
      "Nepakanka lėšų taupymui. Sumažinkite išlaidas arba padidinkite pajamas."
    );
  }

  return (
    `Geriausias variantas: ${formatScenario(best.scenario)} — tikslas pasiekiamas per ${best.months} mėn. ` +
    "Rekomenduojama reguliariai sekti išlaidas ir koreguoti taupymo planą."
  );
}

export async function analyzeScenario(
  scenarios: any[]
) {

  try {

    const response =
      await fetch(
        "/api/ai",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            prompt: `

These are financial scenarios:

${JSON.stringify(scenarios)}

Explain which scenario is best and provide recommendations. Respond in Lithuanian.

`

          })

        }
      );

    if (!response.ok) {
      throw new Error("AI API failed");
    }

    const data =
      await response.json();

    if (!data.insight) {
      throw new Error("Empty AI response");
    }

    return data.insight as string;

  } catch {

    return localScenarioAnalysis(scenarios);

  }

}
