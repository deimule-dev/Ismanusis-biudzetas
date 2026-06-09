import { formatCategoryName, formatType } from "../lib/labels";

interface Props {
  transaction: any;
  onDelete: (id: number) => void;
}

export default function TransactionItem({
  transaction,
  onDelete,
}: Props) {
  const isIncome = transaction.type === "income";
  const categoryName = transaction.categories?.name
    ? formatCategoryName(transaction.categories.name)
    : null;

  return (
    <div className="list-item">
      <div className="list-item__main">
        <p className="list-item__title">
          {transaction.note || categoryName || "Be pastabos"}
        </p>
        <p className="list-item__meta">
          <span className={`badge badge--${isIncome ? "income" : "expense"}`}>
            {formatType(transaction.type)}
          </span>
          {categoryName && (
            <>
              {" · "}
              <span>{categoryName}</span>
            </>
          )}
          {" · "}
          {transaction.amount} €
        </p>
      </div>

      <button
        className="btn btn-danger"
        onClick={() => onDelete(transaction.id)}
      >
        Ištrinti
      </button>
    </div>
  );
}
