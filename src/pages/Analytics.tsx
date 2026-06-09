import ExpenseLineChart from "../components/charts/ExpenseLineChart";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import GoalsBarChart from "../components/charts/GoalsBarChart";
import Loading from "../components/Loading";
import { useAnalytics } from "../hooks/useAnalytics";

export default function Analytics() {
  const { transactions, goals, loading } = useAnalytics();

  if (loading) return <Loading />;

  const expenseHistory = transactions
    .filter((t) => t.type === "expense")
    .map((t) => ({ date: t.date, amount: t.amount }));

  const categoryTotals: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const category = t.note || "Kita";
      categoryTotals[category] =
        (categoryTotals[category] || 0) + Number(t.amount);
    });

  const categoryData = Object.entries(categoryTotals).map(
    ([name, amount]) => ({ name, amount })
  );

  const goalsData = goals.map((goal) => ({
    title: goal.title,
    current_amount: goal.current_amount,
  }));

  return (
    <div className="page">
      <header className="page-header">
        <h1>Analitika</h1>
        <p className="page-subtitle">Išlaidų ir tikslų vizualizacija</p>
      </header>

      <div className="chart-card">
        <h2 className="card-title">Išlaidos laikui bėgant</h2>
        <ExpenseLineChart data={expenseHistory} />
      </div>

      <div className="chart-card">
        <h2 className="card-title">Išlaidos pagal kategoriją</h2>
        <ExpensePieChart data={categoryData} />
      </div>

      <div className="chart-card">
        <h2 className="card-title">Tikslų progresas</h2>
        <GoalsBarChart data={goalsData} />
      </div>
    </div>
  );
}
