import { useEffect, useState } from "react";
import { getAnalyticsData } from "../services/analyticsService";

export function useAnalytics() {

  const [transactions, setTransactions] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadAnalytics() {

    try {

      setLoading(true);

      const data = await getAnalyticsData();

      setTransactions(data.transactions);

      setGoals(data.goals);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    loadAnalytics();

  }, []);

  return {

    transactions,
    goals,
    loading,

  };
}
