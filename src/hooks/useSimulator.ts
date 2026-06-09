import { useState } from "react";
import { analyzeScenario } from "../services/aiService";
import { saveScenarioLog } from "../services/scenarioLogService";
import { calculateScenarios } from "../services/simulatorService";

export function useSimulator() {
  const [results, setResults] = useState<any[]>([]);
  const [aiInsight, setAiInsight] = useState("");
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  async function simulate(
    income: number,
    expenses: number,
    goalAmount: number
  ) {
    setSaveNotice(null);

    const data = calculateScenarios(
      income,
      expenses,
      goalAmount
    );

    setResults(data);

    const insight = await analyzeScenario(data);
    setAiInsight(insight);

    const result = await saveScenarioLog(
      income,
      expenses,
      goalAmount,
      data,
      insight
    );

    if (result.savedTo === "local") {
      setSaveNotice(
        "Istorija išsaugota šioje naršyklėje. Kad veiktų visur, Supabase SQL Editor paleiskite failą supabase/rls-scenario-logs.sql"
      );
    } else {
      setSaveNotice("Scenarijus išsaugotas istorijoje ✓");
    }
  }

  return {
    results,
    aiInsight,
    saveNotice,
    simulate,
  };
}
