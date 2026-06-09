import { useState }
from "react";

import {
  calculateScenarios
}
from "../services/simulatorService";

import { analyzeScenario }
from "../services/aiService";

import {
saveScenarioLog
}
from "../services/scenarioLogService";

export function useSimulator() {

  const [results, setResults] =
    useState<any[]>([]);

  const [aiInsight, setAiInsight] =
    useState("");

  async function simulate(
    income:number,
    expenses:number,
    goalAmount:number
  ) {

    const data =
      calculateScenarios(
        income,
        expenses,
        goalAmount
      );

    setResults(data);

    const insight =
      await analyzeScenario(data);

    setAiInsight(insight);

    try {
      await saveScenarioLog(
        income,
        expenses,
        goalAmount,
        data,
        insight
      );
    } catch {
      // istorija neblokuoja simuliatoriaus
    }

  }

  return {

    results,

    aiInsight,

    simulate

  };

}
