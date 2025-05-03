import { useState, useContext } from "react";
import { LoggedInUserContext } from "../Contexts/LoggedInUser";
import { signUp } from "../api";

const SignUp = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const [registrationDetails, setRegistrationDetails] = useState({
    username: "",
    password: "",
    is_staff: "",
  });

  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle error state

  const registrationHandler = () => {
    setLoading(true); // Set loading to true while waiting for response
    setError(""); // Clear any previous errors

    signUp(registrationDetails)
      .then((response) => {
        setLoggedInUser(response.headers.staff_id);
        sessionStorage.setItem("staff_id", response.headers.staff_id);
        setRegistrationDetails({
          username: "",
          password: "",
          is_staff: "",
        });
      })
      .catch((err) => {
        setError("There was an error registering. Please try again.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the process finishes
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails({
      ...registrationDetails,
      [name]: value,
    });
  };

  const signoutHandler = () => {
    setLoggedInUser(null);
    sessionStorage.clear();
  };

  return (
    <div>
      {!loggedInUser ? (
        <div className="SignupForm">
          <input
            type="text"
            onChange={onChange}
            name="username"
            placeholder="username"
            value={registrationDetails.username}
          />
          <br />
          <input
            type="password"
            onChange={onChange}
            name="password"
            placeholder="password"
            value={registrationDetails.password}
          />
          <br />
          <fieldset>
            <legend>Do you wish to post your own events?</legend>
            <div>
              <label htmlFor="Yes">Yes</label>
              <input
                id="Yes"
                type="radio"
                name="is_staff"
                value="1"
                checked={registrationDetails.is_staff === "1"}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="No">No</label>
              <input
                id="No"
                type="radio"
                name="is_staff"
                value="0"
                checked={registrationDetails.is_staff === "0"}
                onChange={onChange}
              />
            </div>
          </fieldset>
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={registrationHandler} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      ) : (
        <>
          <div>
            <p>Welcome, you can edit your events here</p>
          </div>
          <button onClick={signoutHandler}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default SignUp;
