import { useEffect, useState } from "react";
import { getExchangeRates } from "../services/exchangeRateService";

export function useExchangeRates() {

  const [rates, setRates] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function loadRates() {

    try {

      setLoading(true);

      const data =
        await getExchangeRates();

      setRates(data);

    } catch {

      setError(
        "Nepavyko įkelti valiutų kursų"
      );

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    loadRates();

  }, []);

  return {

    rates,
    loading,
    error,

  };
}
