import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import Analytics from "./pages/Analytics";
import AIInsights from "./pages/AIInsights";
import ExchangeRates from "./pages/ExchangeRates";
import Simulator from "./pages/Simulator";
import ScenarioHistory from "./pages/ScenarioHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/scenario-history" element={<ScenarioHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
