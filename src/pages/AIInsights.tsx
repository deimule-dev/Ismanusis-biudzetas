import AILogsChart from "../components/charts/AILogsChart";
import Loading from "../components/Loading";
import { useAIInsights } from "../hooks/useAIInsights";

export default function AIInsights() {
  const {
    insight,
    recommendations,
    monthlySummary,
    logs,
    loading,
    error,
    removeLog,
  } = useAIInsights();

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="page">
        <p className="alert alert--error">{error}</p>
      </div>
    );
  }

  const chartData = Object.entries(
    logs.reduce<Record<string, number>>((acc, log) => {
      const date = new Date(log.created_at).toLocaleDateString("lt");
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {})
  ).map(([date, count]) => ({ date, count }));

  return (
    <div className="page">
      <header className="page-header">
        <h1>DI įžvalgos</h1>
        <p className="page-subtitle">
          Išmanūs finansiniai patarimai pagal jūsų duomenis
        </p>
      </header>

      <div className="card-grid card-grid--2">
        <div className="card">
          <h2 className="card-title">✨ DI įžvalgos</h2>
          <p style={{ margin: 0, lineHeight: 1.7 }}>{insight}</p>
        </div>

        <div className="card">
          <h2 className="card-title">💡 DI rekomendacijos</h2>
          <p style={{ margin: 0, lineHeight: 1.7 }}>{recommendations}</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: "1.25rem" }}>
        <h2 className="card-title">📅 DI mėnesio santrauka</h2>
        <p style={{ margin: 0, lineHeight: 1.7 }}>{monthlySummary}</p>
      </div>

      <h2 className="section-title">DI istorija</h2>

      <div className="chart-card">
        <h3 className="card-title">DI naudojimo diagrama</h3>
        <AILogsChart data={chartData} />
      </div>

      <h3 className="card-title">Paskutiniai DI įrašai</h3>

      {logs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">✨</div>
          <p>DI istorijos dar nėra.</p>
        </div>
      ) : (
        logs.map((log) => (
          <div key={log.id} className="ai-log">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              <time>
                {new Date(log.created_at).toLocaleString("lt")}
              </time>
              <button
                className="btn btn-danger"
                onClick={() => removeLog(log.id)}
              >
                Ištrinti
              </button>
            </div>
            <p style={{ margin: 0 }}>{log.response}</p>
          </div>
        ))
      )}
    </div>
  );
}
