import ExpenseLineChart from "../components/charts/ExpenseLineChart";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import GoalsBarChart from "../components/charts/GoalsBarChart";
import { useAnalytics } from "../hooks/useAnalytics";

export default function Analytics() {

  const {
    transactions,
    goals,
    loading,
  } = useAnalytics();

  if (loading) {

    return <p>Loading...</p>;

  }


  // LINE CHART
  const expenseHistory =
    transactions
      .filter(
        (t) => t.type === "expense"
      )
      .map((t) => ({
        date: t.date,
        amount: t.amount,
      }));


  // PIE CHART
  const categoryTotals: Record<string, number> = {};

  transactions
    .filter(
      (t) => t.type === "expense"
    )
    .forEach((t) => {

      const category =
        t.note || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0)
        + Number(t.amount);

    });

  const categoryData =
    Object.entries(categoryTotals)
      .map(
        ([name, amount]) => ({
          name,
          amount,
        })
      );


  // BAR CHART
  const goalsData =
    goals.map((goal) => ({

      title: goal.title,

      current_amount:
        goal.current_amount,

    }));


  return (

    <div>

      <h1>Analytics</h1>

      <h2>
        Expenses Over Time
      </h2>

      <ExpenseLineChart
        data={expenseHistory}
      />

      <h2>
        Expenses By Category
      </h2>

      <ExpensePieChart
        data={categoryData}
      />

      <h2>
        Goals Progress
      </h2>

      <GoalsBarChart
        data={goalsData}
      />

    </div>

  );
}
