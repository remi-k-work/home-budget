// rrd imports
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper functions
import { createBudget, createExpense, fetchData, waait } from "../helpers";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => {
                    return <BudgetItem key={budget.id} budget={budget} />;
                  })}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="gid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses.sort((a, b) => {
                        return b.createdAt - a.createdAt;
                      })}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}

// loader
async function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");

  return { userName, budgets, expenses };
}

// action
async function dashboardAction({ request }) {
  await waait();

  const formData = await request.formData();
  const { intent, ...values } = Object.fromEntries(formData);

  switch (intent) {
    // New user submission
    case "createAccount":
      try {
        localStorage.setItem("userName", JSON.stringify(values.userName));
        return toast.success(`Welcome, ${values.userName}!`);
      } catch (error) {
        throw new Error("There was a problem creating your account.");
      }

    // Creating a new budget
    case "createBudget":
      try {
        createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
        return toast.success(`Budget "${values.newBudget}" created!`);
      } catch (error) {
        throw new Error("There was a problem creating your budget.");
      }

    // Creating a new expense
    case "createExpense":
      try {
        createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget });
        return toast.success(`Expense "${values.newExpense}" created!`);
      } catch (error) {
        throw new Error("There was a problem creating your expense.");
      }
  }
}

export default Dashboard;
export { dashboardLoader, dashboardAction };
