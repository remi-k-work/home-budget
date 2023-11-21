import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

// *** Pages ***
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

const router = createBrowserRouter(createRoutesFromElements(<Route path="/" element={<Dashboard />} loader={dashboardLoader} errorElement={<Error />} />));

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
