// rrd imports
import { Form } from "react-router-dom";

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg";

function Intro() {
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>Personal budgeting is the secret to financial freedom. Start your journey today.</p>
        <Form method="post">
          <input type="text" name="userName" placeholder="What is your name?" aria-label="Your Name" autoComplete="given-name" required />
          <button type="submit" name="intent" value={"createAccount"} className="btn btn--dark">
            <UserPlusIcon width={24} />
            <span>Create Account</span>
          </button>
        </Form>
      </div>
      <img src={illustration} width={646} height={396} alt="Person with money" />
    </div>
  );
}

export default Intro;
