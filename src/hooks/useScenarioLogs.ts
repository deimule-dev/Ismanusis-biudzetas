import { useCallback, useEffect, useState } from "react";
import {
  deleteScenarioLog,
  getScenarioLogs,
} from "../services/scenarioLogService";

export function useScenarioLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getScenarioLogs();
      setLogs(data || []);
    } catch {
      setError(
        "Nepavyko įkelti scenarijų istorijos."
      );
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  async function removeLog(
    id: number,
    source?: "local"
  ) {
    await deleteScenarioLog(id, source);
    await loadLogs();
  }

  return {
    logs,
    loading,
    error,
    reload: loadLogs,
    removeLog,
  };
}
