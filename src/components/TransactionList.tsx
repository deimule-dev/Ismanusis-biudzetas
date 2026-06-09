import TransactionItem from "./TransactionItem";

interface Props {
  transactions: any[];
  onDelete: (id: number) => void;
}

export default function TransactionList({
  transactions,
  onDelete,
}: Props) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">💳</div>
        <p>Operacijų dar nėra. Pridėkite pirmąją aukščiau!</p>
      </div>
    );
  }

  return (
    <div className="list">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
