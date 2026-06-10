import { supabase } from "../lib/supabase";
import type { Category } from "../types/category";
import { getTransactions } from "./transactionService";

function categoryKey(category: Pick<Category, "name" | "type">) {
  return `${category.type}:${category.name.trim().toLowerCase()}`;
}

function dedupeCategories(categories: Category[]) {
  const grouped = new Map<
    string,
    { category: Category; ids: number[] }
  >();

  for (const category of categories) {
    const key = categoryKey(category);
    const existing = grouped.get(key);

    if (!existing) {
      grouped.set(key, {
        category,
        ids: [category.id],
      });
      continue;
    }

    existing.ids.push(category.id);

    if (category.id < existing.category.id) {
      existing.category = category;
    }
  }

  return Array.from(grouped.values()).map(({ category, ids }) => ({
    ...category,
    duplicateIds: ids,
  }));
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;

  return dedupeCategories(data || []).map(
    ({ duplicateIds: _duplicateIds, ...category }) => category
  );
}

export async function getCategoriesWithStats() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;

  const transactions = await getTransactions();
  const uniqueCategories = dedupeCategories(data || []);

  return uniqueCategories.map(({ duplicateIds, ...category }) => {
    const matched = (transactions || []).filter((t) =>
      duplicateIds.includes(t.category_id)
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
