import {
useEffect,
useState
}
from "react";

import {
getScenarioLogs
}
from "../services/scenarioLogService";

export function useScenarioLogs() {

  const [logs,setLogs] =
    useState<any[]>([]);

  const [loading,setLoading] =
    useState(false);

  const [error,setError] =
    useState<string | null>(null);

  async function loadLogs(){

    try {
      setLoading(true);
      setError(null);

      const data =
        await getScenarioLogs();

      setLogs(
        data || []
      );
    } catch {
      setError(
        "Nepavyko įkelti scenarijų istorijos. Patikrinkite, ar Supabase sukurta scenario_logs lentelė."
      );
      setLogs([]);
    } finally {
      setLoading(false);
    }

  }

  useEffect(()=>{

    loadLogs();

  },[]);

  return {

    logs,

    loading,

    error,

  };

}
