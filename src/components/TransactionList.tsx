import TransactionItem from "./TransactionItem";

interface Props {
  transactions: any[];
  onDelete: (id: number) => void;
}

export default function TransactionList({
  transactions,
  onDelete,
}: Props) {
  return (
    <>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
