import { supabase } from "../lib/supabase";

export async function getAnalyticsData() {

  const { data: transactions, error: transactionError } =
    await supabase
      .from("transactions")
      .select("*");

  if (transactionError) throw transactionError;

  const { data: goals, error: goalsError } =
    await supabase
      .from("goals")
      .select("*");

  if (goalsError) throw goalsError;

  return {
    transactions: transactions || [],
    goals: goals || [],
  };
}
