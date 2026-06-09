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

  async function loadLogs(){

    setLoading(true);

    const data =
      await getScenarioLogs();

    setLogs(
      data || []
    );

    setLoading(false);

  }

  useEffect(()=>{

    loadLogs();

  },[]);

  return {

    logs,

    loading

  };

}
