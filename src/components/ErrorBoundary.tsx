import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page" style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Įvyko klaida</h1>
          <p style={{ color: "var(--text-muted)" }}>
            Pabandykite atnaujinti puslapį (Ctrl+F5) arba naudokite
            {" "}
            <strong>http://localhost:5173</strong> lokaliai.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
