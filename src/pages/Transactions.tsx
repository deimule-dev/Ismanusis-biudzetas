import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { useTransactions } from "../hooks/useTransactions";

export default function Transactions() {
  const {
    transactions,
    loading,
    error,
    saveTransaction,
    removeTransaction,
  } = useTransactions();

  return (
    <div>
      <h1>Transactions</h1>

      <TransactionForm
        onSave={saveTransaction}
      />

      <hr />

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      <TransactionList
        transactions={transactions}
        onDelete={removeTransaction}
      />
    </div>
  );
}
