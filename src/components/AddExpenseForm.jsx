// react
import { useEffect, useRef } from "react";

// rrd imports
import { useFetcher } from "react-router-dom";

// library
import { PlusCircleIcon } from "@heroicons/react/24/solid";

function AddExpenseForm({ budgets }) {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();

  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New&nbsp;
        <span className="accent">
          {budgets.length === 1 &&
            `${budgets.map((budget) => {
              return budget.name;
            })}`}
        </span>
        &nbsp;Expense
      </h2>
      <fetcher.Form ref={formRef} method="post" className="grid-sm">
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input ref={focusRef} type="text" id="newExpense" name="newExpense" placeholder="e.g., Coffee" required />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input type="number" step={0.01} id="newExpenseAmount" name="newExpenseAmount" placeholder="e.g., 3.50" inputMode="decimal" required />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select id="newExpenseBudget" name="newExpenseBudget" required>
            {budgets
              .sort((a, b) => {
                return a.createdAt - b.createdAt;
              })
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <button type="submit" name="intent" value={"createExpense"} className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <PlusCircleIcon width={20} />
              <span>Create Expense</span>
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}

export default AddExpenseForm;
