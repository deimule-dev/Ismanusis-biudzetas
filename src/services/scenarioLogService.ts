import { supabase } from "../lib/supabase";

const TEST_USER_ID =
  "11111111-1111-1111-1111-111111111111";

const LOCAL_KEY = "scenario_logs_local";

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

function getLocalLogs(): ScenarioLogEntry[] {
  try {
    return JSON.parse(
      localStorage.getItem(LOCAL_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

function saveLocalLog(
  income: number,
  expenses: number,
  goalAmount: number,
  scenarioResult: unknown,
  aiResponse: string
) {
  const entry: ScenarioLogEntry = {
    id: Date.now(),
    user_id: TEST_USER_ID,
    income,
    expenses,
    goal_amount: goalAmount,
    scenario_result: scenarioResult,
    ai_response: aiResponse,
    created_at: new Date().toISOString(),
    source: "local",
  };

  const logs = getLocalLogs();
  logs.unshift(entry);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(logs));

  return entry;
}

export async function saveScenarioLog(
  income: number,
  expenses: number,
  goalAmount: number,
  scenarioResult: unknown,
  aiResponse: string
) {
  const response = aiResponse || "DI analizė negeneruota.";

  const { error } = await supabase
    .from("scenario_logs")
    .insert([{
      user_id: TEST_USER_ID,
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
  const { data, error } = await supabase
    .from("scenario_logs")
    .select("*")
    .eq("user_id", TEST_USER_ID)
    .order("created_at", { ascending: false });

  const localLogs = getLocalLogs();

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

function deleteLocalLog(id: number) {
  const logs = getLocalLogs().filter((log) => log.id !== id);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(logs));
}

export async function deleteScenarioLog(
  id: number,
  source?: "local"
) {
  if (source === "local") {
    deleteLocalLog(id);
    return;
  }

  const { error } = await supabase
    .from("scenario_logs")
    .delete()
    .eq("id", id)
    .eq("user_id", TEST_USER_ID);

  if (error) {
    deleteLocalLog(id);
  }
}
