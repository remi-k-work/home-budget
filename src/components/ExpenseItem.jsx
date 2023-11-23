// helper functions
import { formatCurrency, formatDateToLocaleString } from "../helpers";

function ExpenseItem({ expense }) {
  const { name, amount, createdAt } = expense;

  return (
    <>
      <td>{name}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{formatDateToLocaleString(createdAt)}</td>
    </>
  );
}

export default ExpenseItem;
