import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid lightgray",
      }}
    >
      <Link to="/">Dashboard</Link>

      <Link to="/transactions">Transactions</Link>

      <Link to="/categories">Categories</Link>

      <Link to="/goals">Goals</Link>

      <Link to="/ai-insights">AI Insights</Link>

      <Link to="/simulator">Simulator</Link>

      <Link to="/history">History</Link>
    </nav>
  );
}
