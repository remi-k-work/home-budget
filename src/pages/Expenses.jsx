// rrd imports
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper functions
import { deleteItem, fetchData, waait } from "../helpers";

// components
import Table from "../components/Table";

function Expenses() {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses to show</p>
      )}
    </div>
  );
}

// loader
async function expensesLoader() {
  const expenses = fetchData("expenses");

  return { expenses };
}

// action
async function expensesAction({ request }) {
  await waait();

  const formData = await request.formData();
  const { intent, ...values } = Object.fromEntries(formData);

  switch (intent) {
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

export default Expenses;
export { expensesLoader, expensesAction };
