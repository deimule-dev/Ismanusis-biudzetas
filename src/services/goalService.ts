import { supabase } from "../lib/supabase";

const USER_ID = "11111111-1111-1111-1111-111111111111";

export async function getGoals() {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .order("id");

  if (error) throw error;

  return data;
}

export async function addGoal(
  title: string,
  target_amount: number,
  target_date: string
) {
  const { error } = await supabase
    .from("goals")
    .insert([
      {
        user_id: USER_ID,
        title,
        target_amount,
        current_amount: 0,
        target_date,
      },
    ]);

  if (error) throw error;
}

export async function deleteGoal(id: number) {
  const { error } = await supabase
    .from("goals")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
