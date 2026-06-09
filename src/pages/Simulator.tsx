import { useState }
from "react";

import {
  useSimulator
}
from "../hooks/useSimulator";

import SimulatorChart
from "../components/charts/SimulatorChart";

export default function Simulator() {

  const {

    results,

    aiInsight,

    simulate

  }
  =
  useSimulator();

  const [income, setIncome] =
    useState("");

  const [expenses, setExpenses] =
    useState("");

  const [goal, setGoal] =
    useState("");

  return (

    <div>

      <h1>
        What-if Simulator
      </h1>

      <input
        type="number"
        placeholder="Income"
        value={income}
        onChange={(e)=>
          setIncome(e.target.value)
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Expenses"
        value={expenses}
        onChange={(e)=>
          setExpenses(e.target.value)
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Goal Amount"
        value={goal}
        onChange={(e)=>
          setGoal(e.target.value)
        }
      />

      <br /><br />

      <button
        onClick={()=>
          simulate(
            Number(income),
            Number(expenses),
            Number(goal)
          )
        }
      >

        Simulate

      </button>

      <hr />

      {
        results.map(
          (item)=>(

            <div key={item.scenario}>

              <h3>

                {item.scenario}

              </h3>

              <p>

                Goal in

                {item.months}

                months

              </p>

            </div>

          ))
      }

      <SimulatorChart
        data={results}
      />

      <hr />

      <h2>

        AI Analysis

      </h2>

      <div>

        {aiInsight}

      </div>

    </div>

  );

}
