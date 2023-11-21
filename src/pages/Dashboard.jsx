// rrd imports
import { useLoaderData } from "react-router-dom";

// helper functions
import { fetchData } from "../helpers";

function Dashboard() {
  const { userName } = useLoaderData();

  return (
    <>
      <h1>{userName}</h1>
      <div>Dashboard</div>
    </>
  );
}

async function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export default Dashboard;
export { dashboardLoader };
