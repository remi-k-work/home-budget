// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper functions
import { deleteItem } from "../helpers";

async function logoutAction() {
  // Delete the user
  deleteItem("userName");
  deleteItem("budgets");
  deleteItem("expenses");

  toast.success("You have deleted your account!");

  // Return redirect
  return redirect("/");
}

export { logoutAction };
