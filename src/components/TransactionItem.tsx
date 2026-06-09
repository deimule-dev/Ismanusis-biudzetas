interface Props {
  transaction: any;
  onDelete: (id: number) => void;
}

export default function TransactionItem({
  transaction,
  onDelete,
}: Props) {
  return (
    <div>
      <p>
        {transaction.type} - {transaction.amount}€ - {transaction.note}
      </p>

      <button
        onClick={() => onDelete(transaction.id)}
      >
        Delete
      </button>

      <hr />
    </div>
  );
}
