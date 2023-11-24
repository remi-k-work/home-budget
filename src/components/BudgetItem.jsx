// rrd imports
import { Form, Link } from "react-router-dom";

// library
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

// helper functions
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";

function BudgetItem({ budget, showDelete = false }) {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(ev) => {
              if (!confirm("Are you sure you want to permanently delete this budget?")) {
                ev.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <TrashIcon width={24} />
              <span>Delete Budget</span>
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`budget/${id}`} className="btn">
            <BanknotesIcon width={24} />
            <span>View Details</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default BudgetItem;
