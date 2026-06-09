import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navigation from "./components/Navigation";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Goals from "./pages/Goals";
import AIInsights from "./pages/AIInsights";
import Simulator from "./pages/Simulator";
import ScenarioHistory from "./pages/ScenarioHistory";

function App() {
  return (
    <BrowserRouter>

      <Navigation />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/transactions"
          element={<Transactions />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/goals"
          element={<Goals />}
        />

        <Route
          path="/ai-insights"
          element={<AIInsights />}
        />

        <Route
          path="/simulator"
          element={<Simulator />}
        />

        <Route
          path="/history"
          element={<ScenarioHistory />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
