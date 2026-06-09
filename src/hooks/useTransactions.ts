import { useEffect, useState } from "react";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
} from "../services/transactionService";

export function useTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadTransactions() {
    try {
      setLoading(true);

      const data = await getTransactions();

      setTransactions(data || []);
    } catch {
      setError("Nepavyko įkelti operacijų");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function saveTransaction(
    type: string,
    amount: number,
    note: string,
    categoryId: number
  ) {
    await addTransaction(type, amount, note, categoryId);

    await loadTransactions();
  }

  async function removeTransaction(id: number) {
    await deleteTransaction(id);

    await loadTransactions();
  }

  return {
    transactions,
    loading,
    error,
    saveTransaction,
    removeTransaction,
  };
}
