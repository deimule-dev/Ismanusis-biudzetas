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
      "Your balance is positive. ";
  }

  if (totalExpenses > totalIncome) {
    message +=
      "Warning: expenses exceed income. ";
  }

  message +=
    `You currently have ${goals.length} active goals. `;

  message +=
    `Total income: ${totalIncome} EUR. Total expenses: ${totalExpenses} EUR.`;

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
      "Review your biggest expense categories and set a weekly spending limit."
    );
  }

  if (balance < 0) {
    tips.push(
      "Try to reduce non-essential spending until your balance is positive again."
    );
  }

  if (goals.length > 0) {
    tips.push(
      "Allocate a fixed amount each month toward your savings goals."
    );
  }

  if (tips.length === 0) {
    tips.push(
      "Add more transactions to get personalized recommendations."
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
    now.toLocaleString("en", {
      month: "long",
    });

  return (
    `${monthName} summary: income ${totalIncome} EUR, ` +
    `expenses ${totalExpenses} EUR, ` +
    `balance ${balance} EUR. ` +
    `Active goals: ${goals.length}.`
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

Give 3 brief insights about the user's financial situation.
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

Analyze spending habits and give 3 practical saving recommendations.
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

Write a short monthly financial summary with income, expenses, and balance.
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

export async function analyzeScenario(
  scenarios: any[]
) {

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

Explain which scenario is best and provide recommendations.

`

        })

      }
    );

  const data =
    await response.json();

  return data.insight;

}
