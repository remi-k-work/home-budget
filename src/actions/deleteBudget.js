// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper functions
import { deleteItem, getAllMatchingItems } from "../helpers";

async function deleteBudget({ params }) {
  try {
    deleteItem("budgets", params.id);
    const associatedExpenses = getAllMatchingItems("expenses", "budgetId", params.id);

    associatedExpenses.forEach((expense) => {
      deleteItem("expenses", expense.id);
    });

    toast.success("The budget was deleted successfully!");
  } catch (error) {
    throw new Error("There was a problem deleting your budget.");
  }

  // Return redirect
  return redirect("/");
}

export { deleteBudget };
