import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Auth() {
  const { user, loading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    const result =
      mode === "login"
        ? await signIn(email.trim(), password)
        : await signUp(email.trim(), password);

    if (result) {
      if (mode === "signup" && result.includes("sėkminga")) {
        setMessage(result);
      } else {
        setError(result);
      }
    }

    setSubmitting(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-brand">
          <span className="nav-logo">💰</span>
          <h1>Išmanusis biudžetas</h1>
        </div>

        <p className="auth-subtitle">
          {mode === "login"
            ? "Prisijunkite prie savo paskyros"
            : "Sukurkite naują paskyrą"}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab${mode === "login" ? " active" : ""}`}
            onClick={() => {
              setMode("login");
              setError("");
              setMessage("");
            }}
          >
            Prisijungti
          </button>
          <button
            type="button"
            className={`auth-tab${mode === "signup" ? " active" : ""}`}
            onClick={() => {
              setMode("signup");
              setError("");
              setMessage("");
            }}
          >
            Registruotis
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>El. paštas</label>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="vardas@pastas.lt"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Slaptažodis</label>
            <input
              type="password"
              required
              minLength={6}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              placeholder="Mažiausiai 6 simboliai"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="alert alert--error">{error}</p>}
          {message && <p className="alert alert--info">{message}</p>}

          <button
            className="btn btn-primary auth-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Palaukite…"
              : mode === "login"
                ? "Prisijungti"
                : "Registruotis"}
          </button>
        </form>
      </div>
    </div>
  );
}
