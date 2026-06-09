import { useEffect, useState } from "react";
import { useCategories } from "../hooks/useCategories";
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
    <>
      <label>
        Type
        <br />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <br />
      <br />

      <label>
        Category
        <br />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          disabled={loading || filteredCategories.length === 0}
        >
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      {loading && <p>Loading categories...</p>}

      {!loading && filteredCategories.length === 0 && (
        <p>
          Kategorijų nėra. Paleiskite seed-categories.sql Supabase SQL Editor.
        </p>
      )}

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit} disabled={categoryId === ""}>
        Save
      </button>
    </>
  );
}
