import { useExchangeRates }
from "../hooks/useExchangeRates";

export default function ExchangeRates() {

  const {
    rates,
    loading,
    error,
  } = useExchangeRates();

  if (loading)
    return <p>Loading...</p>;

  if (error)
    return <p>{error}</p>;

  return (

    <div>

      <h1>
        Exchange Rates
      </h1>

      <hr />

      <h2>
        EUR → USD:
        {" "}
        {rates?.USD}
      </h2>

      <h2>
        EUR → GBP:
        {" "}
        {rates?.GBP}
      </h2>

      <h2>
        EUR → PLN:
        {" "}
        {rates?.PLN}
      </h2>

    </div>

  );
}
