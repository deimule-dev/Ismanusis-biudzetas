import { useEffect, useState } from "react";
import { getAnalyticsData }
from "../services/analyticsService";

import {
  generateInsights,
  generateRecommendations,
  generateMonthlySummary,
} from "../services/aiService";

import {
  deleteAILog,
  getAILogs,
} from "../services/aiLogService";

import type { AILog }
from "../types/aiLog";

export function useAIInsights() {

  const [insight, setInsight] =
    useState("");

  const [recommendations, setRecommendations] =
    useState("");

  const [monthlySummary, setMonthlySummary] =
    useState("");

  const [logs, setLogs] =
    useState<AILog[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function loadAI() {

    try {

      setLoading(true);

      setError("");

      const data =
        await getAnalyticsData();

      let history: AILog[] = [];

      try {
        history = await getAILogs();
        setLogs(history);
      } catch {
        setLogs([]);
      }

      const [
        insightResult,
        recommendationsResult,
        summaryResult,
      ] = await Promise.all([
        generateInsights(
          data.transactions,
          data.goals
        ),
        generateRecommendations(
          data.transactions,
          data.goals
        ),
        generateMonthlySummary(
          data.transactions,
          data.goals
        ),
      ]);

      setInsight(insightResult);

      setRecommendations(
        recommendationsResult
      );

      setMonthlySummary(
        summaryResult
      );

      try {
        const updatedLogs =
          await getAILogs();
        setLogs(updatedLogs);
      } catch {
        // istorija neprivaloma
      }

    } catch (err) {

      console.error(err);

      setError(
        "Nepavyko įkelti DI įžvalgų"
      );

    } finally {

      setLoading(false);

    }
  }

  async function removeLog(id: number) {
    try {
      await deleteAILog(id);
      const updated = await getAILogs();
      setLogs(updated);
    } catch {
      // tyliai — mygtukas gali neveikti be RLS delete taisyklės
    }
  }

  useEffect(() => {

    loadAI();

  }, []);

  return {

    insight,
    recommendations,
    monthlySummary,
    logs,
    loading,
    error,
    removeLog,

  };
}
