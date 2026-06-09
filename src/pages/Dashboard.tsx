import { useDashboard } from "../hooks/useDashboard";

export default function Dashboard() {
  const { dashboard, loading } =
    useDashboard();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <hr />

      <h2>
        Total Income:
        {" "}
        {dashboard.totalIncome} €
      </h2>

      <h2>
        Total Expenses:
        {" "}
        {dashboard.totalExpenses} €
      </h2>

      <h2>
        Balance:
        {" "}
        {dashboard.balance} €
      </h2>

      <h2>
        Active Goals:
        {" "}
        {dashboard.goalsCount}
      </h2>
    </div>
  );
}
