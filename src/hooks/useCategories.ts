import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadCategories() {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
  };
}
