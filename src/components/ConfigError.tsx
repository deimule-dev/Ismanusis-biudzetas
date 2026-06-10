function ConfigError() {
  return (
    <div className="app">
      <main className="main">
        <div className="page">
          <header className="page-header">
            <h1>Išmanusis biudžetas</h1>
            <p className="page-subtitle">
              Programai reikia Supabase nustatymų
            </p>
          </header>

          <div className="card" style={{ textAlign: "left" }}>
            <h2 className="card-title">Kodėl tuščias puslapis?</h2>
            <p style={{ margin: "0 0 1rem", lineHeight: 1.7 }}>
              Vercel serveryje nėra Supabase raktų. Be jų programa
              negali prisijungti prie duomenų bazės.
            </p>

            <p style={{ margin: "0 0 0.5rem", fontWeight: 600 }}>
              Ką padaryti Vercel:
            </p>
            <ol style={{ margin: "0 0 1rem", paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li>
                Atidarykite{" "}
                <a
                  href="https://vercel.com/deima-s-projects/ismanusis-biudzetas/settings/environment-variables"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vercel → Settings → Environment Variables
                </a>
              </li>
              <li>Pridėkite <strong>VITE_SUPABASE_URL</strong></li>
              <li>Pridėkite <strong>VITE_SUPABASE_ANON_KEY</strong></li>
              <li>Nebūtina: <strong>OPENAI_API_KEY</strong> (DI funkcijoms)</li>
              <li>Deployments → pasirinkite paskutinį → <strong>Redeploy</strong></li>
            </ol>

            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Reikšmes rasite savo kompiuterio <strong>.env</strong> faile
              arba Supabase → Project Settings → API.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ConfigError;
