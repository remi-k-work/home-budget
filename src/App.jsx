// rrd imports
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

// library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// *** Pages ***
import Dashboard, { dashboardLoader, dashboardAction } from "./pages/Dashboard";
import Error from "./pages/Error";

// *** Layouts ***
import Main, { mainLoader } from "./layouts/Main";

// *** Actions ***
import { logoutAction } from "./actions/logout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Main />} loader={mainLoader} errorElement={<Error />}>
        <Route index element={<Dashboard />} loader={dashboardLoader} action={dashboardAction} />
        <Route path="logout" element={<p>Logged out!</p>} action={logoutAction} />
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
