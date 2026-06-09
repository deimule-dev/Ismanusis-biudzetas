import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Apžvalga", icon: "📊" },
  { to: "/transactions", label: "Operacijos", icon: "💳" },
  { to: "/categories", label: "Kategorijos", icon: "🏷️" },
  { to: "/goals", label: "Tikslai", icon: "🎯" },
  { to: "/ai-insights", label: "DI įžvalgos", icon: "✨", ai: true },
  { to: "/simulator", label: "Simuliatorius", icon: "🔮", ai: true },
  { to: "/history", label: "Istorija", icon: "📜", ai: true },
];

export default function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-brand">
        <span className="nav-logo">💰</span>
        <span>Išmanusis biudžetas</span>
      </NavLink>

      <div className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `nav-link${link.ai ? " nav-link--ai" : ""}${isActive ? " active" : ""}`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
