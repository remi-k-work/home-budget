// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper functions
import { deleteItem } from "../helpers";

async function logoutAction() {
  // Delete the user
  deleteItem({ key: "userName" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });

  toast.success("You have deleted your account!");

  // Return redirect
  return redirect("/");
}

export { logoutAction };
