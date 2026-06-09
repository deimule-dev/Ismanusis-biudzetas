import Loading from "../components/Loading";
import { useExchangeRates } from "../hooks/useExchangeRates";

export default function ExchangeRates() {
  const { rates, loading, error } = useExchangeRates();

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="page">
        <p className="alert alert--error">{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Valiutų kursai</h1>
        <p className="page-subtitle">EUR keitimo kursai į kitas valiutas</p>
      </header>

      <div className="stat-grid">
        <div className="stat-card stat-card--balance">
          <div className="stat-card__icon">🇺🇸</div>
          <p className="stat-card__label">EUR → USD</p>
          <p className="stat-card__value">{rates?.USD}</p>
        </div>

        <div className="stat-card stat-card--goals">
          <div className="stat-card__icon">🇬🇧</div>
          <p className="stat-card__label">EUR → GBP</p>
          <p className="stat-card__value">{rates?.GBP}</p>
        </div>

        <div className="stat-card stat-card--income">
          <div className="stat-card__icon">🇵🇱</div>
          <p className="stat-card__label">EUR → PLN</p>
          <p className="stat-card__value">{rates?.PLN}</p>
        </div>
      </div>
    </div>
  );
}
