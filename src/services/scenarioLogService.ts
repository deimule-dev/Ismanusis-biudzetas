import { supabase }
from "../lib/supabase";

export async function saveScenarioLog(

income:number,

expenses:number,

goalAmount:number,

scenarioResult:any,

aiResponse:string

) {

  const { error } =
    await supabase
      .from("scenario_logs")
      .insert([{

        income,

        expenses,

        goal_amount:goalAmount,

        scenario_result:scenarioResult,

        ai_response:aiResponse

      }]);

  if(error)
    throw error;

}

export async function getScenarioLogs() {

  const {
    data,
    error
  }
  =
  await supabase
    .from("scenario_logs")
    .select("*")
    .order(
      "created_at",
      {
        ascending:false
      }
    );

  if(error)
    throw error;

  return data;

}
