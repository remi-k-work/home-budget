// rrd imports
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

// library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// *** Pages ***
import Dashboard, { dashboardLoader, dashboardAction } from "./pages/Dashboard";
import Budget, { budgetLoader, budgetAction } from "./pages/Budget";
import Expenses, { expensesLoader, expensesAction } from "./pages/Expenses";
import Error from "./pages/Error";

// *** Layouts ***
import Main, { mainLoader } from "./layouts/Main";

// *** Actions ***
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Main />} loader={mainLoader} errorElement={<Error />}>
        <Route index element={<Dashboard />} loader={dashboardLoader} action={dashboardAction} errorElement={<Error />} />
        <Route path="budget/:id" element={<Budget />} loader={budgetLoader} action={budgetAction} errorElement={<Error />}>
          <Route path="delete" element={null} action={deleteBudget} />
        </Route>
        <Route path="expenses" element={<Expenses />} loader={expensesLoader} action={expensesAction} errorElement={<Error />} />
        <Route path="logout" element={null} action={logoutAction} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
