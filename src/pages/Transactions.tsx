import Loading from "../components/Loading";
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
    <div className="page">
      <header className="page-header">
        <h1>Operacijos</h1>
        <p className="page-subtitle">
          Sekite pajamas ir išlaidas
        </p>
      </header>

      <TransactionForm onSave={saveTransaction} />

      {loading && <Loading />}

      {error && <p className="alert alert--error">{error}</p>}

      {!loading && (
        <>
          <h2 className="section-title">Visos operacijos</h2>
          <TransactionList
            transactions={transactions}
            onDelete={removeTransaction}
          />
        </>
      )}
    </div>
  );
}
