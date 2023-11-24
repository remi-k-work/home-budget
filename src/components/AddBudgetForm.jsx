// react
import { useEffect, useRef } from "react";

// rrd imports
import { useFetcher } from "react-router-dom";

// library
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

function AddBudgetForm() {
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
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form ref={formRef} method="post" className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input ref={focusRef} type="text" id="newBudget" name="newBudget" placeholder="e.g., Groceries" required />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input type="number" step={0.01} id="newBudgetAmount" name="newBudgetAmount" placeholder="e.g., 350" inputMode="decimal" required />
        </div>
        <button type="submit" name="intent" value={"createBudget"} className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <CurrencyDollarIcon width={24} />
              <span>Create Budget</span>
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}

export default AddBudgetForm;
