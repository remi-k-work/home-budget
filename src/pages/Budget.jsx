// rrd imports
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper functions
import { createExpense, deleteItem, getAllMatchingItems, waait } from "../helpers";

// components
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

function Budget() {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg" style={{ "--accent": budget?.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span>&nbsp;Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span>&nbsp;Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
}

// loader
async function budgetLoader({ params }) {
  const budget = getAllMatchingItems("budgets", "id", params.id)[0];
  const expenses = getAllMatchingItems("expenses", "budgetId", params.id);

  if (!budget) {
    throw new Error("The budget you are trying to find does not exist.");
  }

  return { budget, expenses };
}

// action
async function budgetAction({ request }) {
  await waait();

  const formData = await request.formData();
  const { intent, ...values } = Object.fromEntries(formData);

  switch (intent) {
    // Creating a new expense
    case "createExpense":
      try {
        createExpense(values.newExpense, values.newExpenseAmount, values.newExpenseBudget);
        return toast.success(`Expense "${values.newExpense}" created!`);
      } catch (error) {
        throw new Error("There was a problem creating your expense.");
      }

    // Delete an existing expense
    case "deleteExpense":
      try {
        deleteItem("expenses", values.expenseId);
        return toast.success("Expense deleted!");
      } catch (error) {
        throw new Error("There was a problem deleting your expense.");
      }
  }
}

export default Budget;
export { budgetLoader, budgetAction };
