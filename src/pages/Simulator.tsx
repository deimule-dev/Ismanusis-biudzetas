import { useState } from "react";
import SimulatorChart from "../components/charts/SimulatorChart";
import { useSimulator } from "../hooks/useSimulator";
import { formatScenario } from "../lib/labels";

export default function Simulator() {
  const { results, aiInsight, simulate } = useSimulator();

  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [goal, setGoal] = useState("");

  return (
    <div className="page">
      <header className="page-header">
        <h1>„Kas jei" simuliatorius</h1>
        <p className="page-subtitle">
          Išbandykite skirtingus taupymo scenarijus
        </p>
      </header>

      <div className="card form-card">
        <h2 className="card-title">Įveskite duomenis</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Pajamos (€)</label>
            <input
              type="number"
              placeholder="2000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Išlaidos (€)</label>
            <input
              type="number"
              placeholder="1500"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tikslo suma (€)</label>
            <input
              type="number"
              placeholder="5000"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <button
            className="btn btn-accent"
            onClick={() =>
              simulate(Number(income), Number(expenses), Number(goal))
            }
          >
            ✨ Simuliuoti
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <>
          <h2 className="section-title">Scenarijų rezultatai</h2>
          <div className="scenario-grid">
            {results.map((item) => (
              <div key={item.scenario} className="scenario-card">
                <h3>{formatScenario(item.scenario)}</h3>
                <p>
                  Tikslas pasiekiamas per{" "}
                  <strong>{item.months}</strong> mėn.
                </p>
              </div>
            ))}
          </div>

          <div className="chart-card">
            <SimulatorChart data={results} />
          </div>

          {aiInsight && (
            <>
              <h2 className="section-title">DI analizė</h2>
              <div className="ai-block">{aiInsight}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}
