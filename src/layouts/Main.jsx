// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// helper functions
import { fetchData } from "../helpers";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

function Main() {
  const { userName } = useLoaderData();

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
}

// loader
async function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export default Main;
export { mainLoader };
