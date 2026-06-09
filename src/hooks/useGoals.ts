import { useEffect, useState } from "react";
import {
  getGoals,
  addGoal,
  deleteGoal,
} from "../services/goalService";

export function useGoals() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadGoals() {
    setLoading(true);

    const data = await getGoals();

    setGoals(data || []);

    setLoading(false);
  }

  useEffect(() => {
    loadGoals();
  }, []);

  async function saveGoal(
    title: string,
    target_amount: number,
    target_date: string
  ) {
    await addGoal(
      title,
      target_amount,
      target_date
    );

    await loadGoals();
  }

  async function removeGoal(id: number) {
    await deleteGoal(id);

    await loadGoals();
  }

  return {
    goals,
    loading,
    saveGoal,
    removeGoal,
  };
}
