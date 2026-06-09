import {
useScenarioLogs
}
from "../hooks/useScenarioLogs";

export default function ScenarioHistory() {

  const {

    logs,

    loading

  }
  =
  useScenarioLogs();

  if(loading)
    return <p>Loading...</p>;

  return(

    <div>

      <h1>

        AI Scenario History

      </h1>

      <hr />

      {

        logs.map(
          (log)=>(

            <div key={log.id}>

              <h3>

                Goal:

                {log.goal_amount} €

              </h3>

              <p>

                Income:

                {log.income} €

              </p>

              <p>

                Expenses:

                {log.expenses} €

              </p>

              <p>

                {log.ai_response}

              </p>

              <hr />

            </div>

          )
        )

      }

    </div>

  );

}
