// rrd imports
import { Form, NavLink } from "react-router-dom";

// library
import { TrashIcon } from "@heroicons/react/24/solid";

// assets
import logomark from "../assets/logomark.svg";

function Nav({ userName }) {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="" height={30} />
        <span>HomeBudget</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="logout"
          onSubmit={(ev) => {
            if (!confirm("Delete user and all data?")) {
              ev.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <TrashIcon width={20} />
            <span>Delete User</span>
          </button>
        </Form>
      )}
    </nav>
  );
}

export default Nav;
