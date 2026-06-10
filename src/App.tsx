import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navigation from "./components/Navigation";
import ConfigError from "./components/ConfigError";
import { isSupabaseConfigured } from "./lib/supabase";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Goals from "./pages/Goals";
import AIInsights from "./pages/AIInsights";
import Simulator from "./pages/Simulator";
import ScenarioHistory from "./pages/ScenarioHistory";

function App() {
  if (!isSupabaseConfigured) {
    return <ConfigError />;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />

        <main className="main">
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
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
