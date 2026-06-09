import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";

export function useDashboard() {
  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    goalsCount: 0,
  });

  const [loading, setLoading] = useState(false);

  async function loadDashboard() {
    setLoading(true);

    const data = await getDashboardData();

    setDashboard(data);

    setLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
  };
}
