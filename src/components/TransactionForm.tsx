import { useEffect, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { formatCategoryName } from "../lib/labels";
import type { Category } from "../types/category";

interface Props {
  onSave: (
    type: string,
    amount: number,
    note: string,
    categoryId: number
  ) => Promise<void>;
}

export default function TransactionForm({ onSave }: Props) {
  const { categories, loading } = useCategories();

  const [type, setType] = useState("expense");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const filteredCategories = (categories as Category[]).filter(
    (category) => category.type === type
  );

  useEffect(() => {
    if (filteredCategories.length > 0) {
      setCategoryId(filteredCategories[0].id);
    } else {
      setCategoryId("");
    }
  }, [type, categories]);

  async function handleSubmit() {
    if (categoryId === "") return;
    await onSave(type, Number(amount), note, categoryId);
    setAmount("");
    setNote("");
  }

  return (
    <div className="card form-card">
      <h2 className="card-title">Nauja operacija</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Tipas</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Pajamos</option>
            <option value="expense">Išlaidos</option>
          </select>
        </div>

        <div className="form-group">
          <label>Kategorija</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            disabled={loading || filteredCategories.length === 0}
          >
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {formatCategoryName(category.name)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Suma (€)</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Pastaba</label>
          <input
            placeholder="Pvz. pietūs restorane"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={categoryId === ""}
        >
          Išsaugoti
        </button>
      </div>

      {loading && (
        <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>
          Kraunamos kategorijos...
        </p>
      )}

      {!loading && filteredCategories.length === 0 && (
        <p className="alert alert--info" style={{ marginTop: "1rem", marginBottom: 0 }}>
          Kategorijų nėra. Paleiskite seed-categories.sql Supabase SQL Editor.
        </p>
      )}
    </div>
  );
}
