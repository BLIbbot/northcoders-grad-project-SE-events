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

  const registrationHandler = () => {
    signUp(registrationDetails)
      .then((response) => {
        console.log(response);
        setLoggedInUser(response.headers.staff_id);
        sessionStorage.setItem("staff_id", response.headers.staff_id);
      })
      .then(() => {
        setRegistrationDetails({
          username: "",
          password: "",
          is_staff: "",
        });
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
        <>
          <label>Username</label>
          <input
            type="text"
            onChange={onChange}
            name="username"
            placeholder="username"
            value={registrationDetails.username}
          />
          <br />
          <label>Password</label>
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
          <button onClick={registrationHandler}>Register</button>
        </>
      ) : (
        <>
          <div id="">
            <p>Welcome</p>
          </div>
          <button onClick={signoutHandler}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default SignUp;
