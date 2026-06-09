import { useState } from "react";
import Loading from "../components/Loading";
import { useGoals } from "../hooks/useGoals";

export default function Goals() {
  const {
    goals,
    loading,
    saveGoal,
    removeGoal,
  } = useGoals();

  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  async function handleSave() {
    await saveGoal(title, Number(targetAmount), targetDate);
    setTitle("");
    setTargetAmount("");
    setTargetDate("");
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Tikslai</h1>
        <p className="page-subtitle">
          Planuokite ir stebėkite taupymo tikslus
        </p>
      </header>

      <div className="card form-card">
        <h2 className="card-title">Naujas tikslas</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Pavadinimas</label>
            <input
              placeholder="Pvz. Atostogos"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tikslinė suma (€)</label>
            <input
              type="number"
              placeholder="1000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Terminas</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={handleSave}>
            Išsaugoti tikslą
          </button>
        </div>
      </div>

      {loading && <Loading />}

      {!loading && goals.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">🎯</div>
          <p>Tikslų dar nėra. Sukurkite pirmąjį aukščiau!</p>
        </div>
      )}

      {!loading && goals.length > 0 && (
        <div className="card-grid">
          {goals.map((goal) => {
            const progress = goal.target_amount > 0
              ? Math.min((goal.current_amount / goal.target_amount) * 100, 100)
              : 0;

            return (
              <div key={goal.id} className="card">
                <h3 style={{ margin: "0 0 0.5rem", color: "var(--text-h)" }}>
                  {goal.title}
                </h3>
                <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                  Tikslas: {goal.target_amount} €
                </p>
                <p style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "var(--primary)" }}>
                  Dabartinė suma: {goal.current_amount} € ({Math.round(progress)}%)
                </p>
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => removeGoal(goal.id)}
                >
                  Ištrinti
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
