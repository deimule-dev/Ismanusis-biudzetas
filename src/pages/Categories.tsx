import Loading from "../components/Loading";
import { useCategories } from "../hooks/useCategories";
import {
  formatCategoryName,
  formatType,
} from "../lib/labels";

const categoryIcons: Record<string, string> = {
  income: "💵",
  expense: "🛒",
};

export default function Categories() {
  const { categories, loading } = useCategories();

  if (loading) return <Loading />;

  return (
    <div className="page">
      <header className="page-header">
        <h1>Kategorijos</h1>
        <p className="page-subtitle">
          Operacijų grupavimo kategorijos
        </p>
      </header>

      {categories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🏷️</div>
          <p>Kategorijų nėra. Paleiskite seed-categories.sql Supabase.</p>
        </div>
      ) : (
        <div className="category-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-chip">
              <div className="category-chip__icon">
                {categoryIcons[category.type] ?? "📁"}
              </div>
              <p className="category-chip__name">
                {formatCategoryName(category.name)}
              </p>
              <span className={`badge badge--${category.type === "income" ? "income" : "expense"}`}>
                {formatType(category.type)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
