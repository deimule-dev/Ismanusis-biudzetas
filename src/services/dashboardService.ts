import { supabase } from "../lib/supabase";

export async function getDashboardData() {
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*");

  const { data: goals } = await supabase
    .from("goals")
    .select("*");

  const totalIncome =
    transactions
      ?.filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0) || 0;

  const totalExpenses =
    transactions
      ?.filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0) || 0;

  const balance = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    balance,
    goalsCount: goals?.length || 0,
  };
}
