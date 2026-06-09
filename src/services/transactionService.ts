import { supabase } from "../lib/supabase";

export async function addTransaction(
  type: string,
  amount: number,
  note: string,
  category_id: number
) {
  const { error } = await supabase
    .from("transactions")
    .insert([
      {
        user_id: "11111111-1111-1111-1111-111111111111",
        amount,
        type,
        note,
        category_id,
        date: new Date()
      }
    ]);

  if (error) throw error;
}

export async function getTransactions() {
  const { data, error } = await supabase
    .from("transactions")
    .select("*, categories(name, type)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function deleteTransaction(id: number) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
