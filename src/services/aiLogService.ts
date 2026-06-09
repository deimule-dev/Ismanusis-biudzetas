import { supabase } from "../lib/supabase";

const TEST_USER_ID =
  "11111111-1111-1111-1111-111111111111";

export async function saveAILog(
  prompt: string,
  response: string
) {

  const { error } = await supabase
    .from("ai_logs")
    .insert([
      {
        user_id: TEST_USER_ID,
        prompt,
        response,
      },
    ]);

  if (error) throw error;
}

export async function getAILogs() {

  const { data, error } = await supabase
    .from("ai_logs")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data || [];
}
