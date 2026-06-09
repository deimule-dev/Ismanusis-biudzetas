import { supabase } from "../lib/supabase";
import { getTransactions } from "./transactionService";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}

export async function getCategoriesWithStats() {
  const [categories, transactions] = await Promise.all([
    getCategories(),
    getTransactions(),
  ]);

  return (categories || []).map((category) => {
    const matched = (transactions || []).filter(
      (t) => t.category_id === category.id
    );

    const total = matched.reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

    return {
      ...category,
      transactionCount: matched.length,
      total,
    };
  });
}
