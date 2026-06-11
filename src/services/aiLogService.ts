import { requireUserId } from "../lib/auth";
import { supabase } from "../lib/supabase";

function hiddenKey(userId: string) {
  return `ai_logs_hidden_${userId}`;
}

function getHiddenIds(userId: string): number[] {
  try {
    return JSON.parse(
      localStorage.getItem(hiddenKey(userId)) || "[]"
    );
  } catch {
    return [];
  }
}

function hideLocalAILog(userId: string, id: number) {
  const ids = getHiddenIds(userId);
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(hiddenKey(userId), JSON.stringify(ids));
  }
}

function unhideLocalAILog(userId: string, id: number) {
  const ids = getHiddenIds(userId).filter((hiddenId) => hiddenId !== id);
  localStorage.setItem(hiddenKey(userId), JSON.stringify(ids));
}

export async function saveAILog(
  prompt: string,
  response: string
) {
  const userId = await requireUserId();

  const { error } = await supabase
    .from("ai_logs")
    .insert([
      {
        user_id: userId,
        prompt,
        response,
      },
    ]);

  if (error) throw error;
}

export async function getAILogs() {
  const userId = await requireUserId();
  const hiddenIds = new Set(getHiddenIds(userId));

  const { data, error } = await supabase
    .from("ai_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data || []).filter((log) => !hiddenIds.has(log.id));
}

export async function deleteAILog(id: number) {
  const userId = await requireUserId();

  const { data, error } = await supabase
    .from("ai_logs")
    .delete()
    .eq("id", id)
    .eq("user_id", userId)
    .select("id");

  if (error) {
    hideLocalAILog(userId, id);
    throw error;
  }

  if (!data || data.length === 0) {
    hideLocalAILog(userId, id);
    return false;
  }

  unhideLocalAILog(userId, id);
  return true;
}
