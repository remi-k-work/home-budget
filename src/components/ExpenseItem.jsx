// rrd imports
import { Link, useFetcher } from "react-router-dom";

// helper functions
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers";

// library
import { TrashIcon } from "@heroicons/react/24/solid";

function ExpenseItem({ expense, showBudget }) {
  const fetcher = useFetcher();

  const { id, name, amount, createdAt, budgetId } = expense;
  const budget = getAllMatchingItems("budgets", "id", budgetId)[0];

  return (
    <>
      <td>{name}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{formatDateToLocaleString(createdAt)}</td>
      <td>
        {showBudget && (
          <Link to={`budget/${budget?.id}`} style={{ "--accent": budget?.color }}>
            {budget?.name}
          </Link>
        )}
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="expenseId" value={id} />
          <button type="submit" name="intent" value={"deleteExpense"} className="btn btn--warning" aria-label={`Delete ${name} expense`}>
            <TrashIcon width={24} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
}

export default ExpenseItem;
