import { useEffect, useState } from "react";
import {
  getCategories,
  getCategoriesWithStats,
} from "../services/categoryService";

export function useCategories(withStats = false) {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadCategories() {
    try {
      setLoading(true);

      const data = withStats
        ? await getCategoriesWithStats()
        : await getCategories();

      setCategories(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, [withStats]);

  return {
    categories,
    loading,
  };
}
