import Loading from "../components/Loading";
import { useScenarioLogs } from "../hooks/useScenarioLogs";

export default function ScenarioHistory() {
  const { logs, loading, error } = useScenarioLogs();

  if (loading) return <Loading />;

  return (
    <div className="page">
      <header className="page-header">
        <h1>DI scenarijų istorija</h1>
        <p className="page-subtitle">
          Ankstesni simuliatoriaus rezultatai ir DI analizės
        </p>
      </header>

      {error && <p className="alert alert--error">{error}</p>}

      {!error && logs.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">📜</div>
          <p>
            Istorijos dar nėra. Eikite į Simuliatorių, įveskite duomenis ir
            paspauskite „Simuliuoti".
          </p>
        </div>
      )}

      <div className="card-grid">
        {logs.map((log) => (
          <div key={log.id} className="card">
            <h3 style={{ margin: "0 0 1rem", color: "var(--accent)" }}>
              Tikslas: {log.goal_amount} €
            </h3>

            <div className="stat-grid" style={{ marginBottom: "1rem" }}>
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>Pajamos</p>
                <p style={{ margin: 0, fontWeight: 600, color: "var(--income)" }}>{log.income} €</p>
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>Išlaidos</p>
                <p style={{ margin: 0, fontWeight: 600, color: "var(--expense)" }}>{log.expenses} €</p>
              </div>
            </div>

            <div className="ai-block" style={{ fontSize: "0.9rem" }}>
              {log.ai_response}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
