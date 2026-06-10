import { supabase } from "../lib/supabase";

const TEST_USER_ID =
  "11111111-1111-1111-1111-111111111111";

const HIDDEN_KEY = "ai_logs_hidden";

function getHiddenIds(): number[] {
  try {
    return JSON.parse(
      localStorage.getItem(HIDDEN_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

function hideLocalAILog(id: number) {
  const ids = getHiddenIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(HIDDEN_KEY, JSON.stringify(ids));
  }
}

function unhideLocalAILog(id: number) {
  const ids = getHiddenIds().filter((hiddenId) => hiddenId !== id);
  localStorage.setItem(HIDDEN_KEY, JSON.stringify(ids));
}

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
  const hiddenIds = new Set(getHiddenIds());

  const { data, error } = await supabase
    .from("ai_logs")
    .select("*")
    .eq("user_id", TEST_USER_ID)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data || []).filter((log) => !hiddenIds.has(log.id));
}

export async function deleteAILog(id: number) {
  const { data, error } = await supabase
    .from("ai_logs")
    .delete()
    .eq("id", id)
    .eq("user_id", TEST_USER_ID)
    .select("id");

  if (error) {
    hideLocalAILog(id);
    throw error;
  }

  if (!data || data.length === 0) {
    hideLocalAILog(id);
    return false;
  }

  unhideLocalAILog(id);
  return true;
}
