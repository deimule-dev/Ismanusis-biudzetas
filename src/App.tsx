import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import ConfigError from "./components/ConfigError";
import { AuthProvider } from "./contexts/AuthContext";
import { isSupabaseConfigured } from "./lib/supabase";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Goals from "./pages/Goals";
import AIInsights from "./pages/AIInsights";
import Simulator from "./pages/Simulator";
import ScenarioHistory from "./pages/ScenarioHistory";

function AppLayout() {
  return (
    <div className="app">
      <Navigation />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  if (!isSupabaseConfigured) {
    return <ConfigError />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/ai-insights" element={<AIInsights />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/history" element={<ScenarioHistory />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
