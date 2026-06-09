import Loading from "../components/Loading";
import { useDashboard } from "../hooks/useDashboard";

export default function Dashboard() {
  const { dashboard, loading } = useDashboard();

  if (loading) return <Loading />;

  return (
    <div className="page">
      <header className="page-header">
        <h1>Apžvalga</h1>
        <p className="page-subtitle">
          Jūsų finansų būsena viename žvilgsnyje
        </p>
      </header>

      <div className="stat-grid">
        <div className="stat-card stat-card--income">
          <div className="stat-card__icon">📈</div>
          <p className="stat-card__label">Bendros pajamos</p>
          <p className="stat-card__value">{dashboard.totalIncome} €</p>
        </div>

        <div className="stat-card stat-card--expense">
          <div className="stat-card__icon">📉</div>
          <p className="stat-card__label">Bendros išlaidos</p>
          <p className="stat-card__value">{dashboard.totalExpenses} €</p>
        </div>

        <div className="stat-card stat-card--balance">
          <div className="stat-card__icon">💎</div>
          <p className="stat-card__label">Balansas</p>
          <p className="stat-card__value">{dashboard.balance} €</p>
        </div>

        <div className="stat-card stat-card--goals">
          <div className="stat-card__icon">🎯</div>
          <p className="stat-card__label">Aktyvūs tikslai</p>
          <p className="stat-card__value">{dashboard.goalsCount}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Greita nuoroda</h2>
        <p style={{ margin: 0, color: "var(--text-muted)" }}>
          Pridėkite naują operaciją skiltyje <strong style={{ color: "var(--text-h)" }}>Operacijos</strong>,
          stebėkite tikslus skiltyje <strong style={{ color: "var(--text-h)" }}>Tikslai</strong>,
          arba gaukite DI patarimų skiltyje <strong style={{ color: "var(--accent)" }}>DI įžvalgos</strong>.
        </p>
      </div>
    </div>
  );
}
