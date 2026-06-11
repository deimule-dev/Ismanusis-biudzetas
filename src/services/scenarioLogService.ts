import { requireUserId } from "../lib/auth";
import { supabase } from "../lib/supabase";

function localKey(userId: string) {
  return `scenario_logs_local_${userId}`;
}

interface ScenarioLogEntry {
  id: number;
  user_id: string;
  income: number;
  expenses: number;
  goal_amount: number;
  scenario_result: unknown;
  ai_response: string;
  created_at: string;
  source?: "local";
}

function getLocalLogs(userId: string): ScenarioLogEntry[] {
  try {
    return JSON.parse(
      localStorage.getItem(localKey(userId)) || "[]"
    );
  } catch {
    return [];
  }
}

function saveLocalLog(
  userId: string,
  income: number,
  expenses: number,
  goalAmount: number,
  scenarioResult: unknown,
  aiResponse: string
) {
  const entry: ScenarioLogEntry = {
    id: Date.now(),
    user_id: userId,
    income,
    expenses,
    goal_amount: goalAmount,
    scenario_result: scenarioResult,
    ai_response: aiResponse,
    created_at: new Date().toISOString(),
    source: "local",
  };

  const logs = getLocalLogs(userId);
  logs.unshift(entry);
  localStorage.setItem(localKey(userId), JSON.stringify(logs));

  return entry;
}

export async function saveScenarioLog(
  income: number,
  expenses: number,
  goalAmount: number,
  scenarioResult: unknown,
  aiResponse: string
) {
  const userId = await requireUserId();
  const response = aiResponse || "DI analizė negeneruota.";

  const { error } = await supabase
    .from("scenario_logs")
    .insert([{
      user_id: userId,
      income,
      expenses,
      goal_amount: goalAmount,
      scenario_result: scenarioResult,
      ai_response: response,
    }]);

  if (!error) {
    return { savedTo: "supabase" as const };
  }

  saveLocalLog(
    userId,
    income,
    expenses,
    goalAmount,
    scenarioResult,
    response
  );

  return {
    savedTo: "local" as const,
    error: error.message,
  };
}

export async function getScenarioLogs() {
  const userId = await requireUserId();

  const { data, error } = await supabase
    .from("scenario_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const localLogs = getLocalLogs(userId);

  if (error) {
    return localLogs.sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );
  }

  const remoteIds = new Set(
    (data || []).map((log) => log.id)
  );

  const merged = [
    ...(data || []),
    ...localLogs.filter((log) => !remoteIds.has(log.id)),
  ];

  return merged.sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  );
}

function deleteLocalLog(userId: string, id: number) {
  const logs = getLocalLogs(userId).filter((log) => log.id !== id);
  localStorage.setItem(localKey(userId), JSON.stringify(logs));
}

export async function deleteScenarioLog(
  id: number,
  source?: "local"
) {
  const userId = await requireUserId();

  if (source === "local") {
    deleteLocalLog(userId, id);
    return;
  }

  const { error } = await supabase
    .from("scenario_logs")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    deleteLocalLog(userId, id);
  }
}
