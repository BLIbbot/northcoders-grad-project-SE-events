import { useState, useContext } from "react";
import { signIn } from "../api";
import { LoggedInUserContext } from "../Contexts/LoggedInUser";

const Signin = ({ setProfile }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const signinHandler = () => {
    signIn(username, password).then((response) => {
      console.log(response.headers.staff_id);
      setLoggedInUser(response.headers.staff_id);
      sessionStorage.setItem("staff_id", response.headers.staff_id);
    });
  };
  const signoutHandler = () => {
    setLoggedInUser(null);
    sessionStorage.setItem("staff_id", null);
  };

  const usernameHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div>
      {!loggedInUser ? (
        <>
          <label>Username</label>
          <input onChange={usernameHandler} value={username} />
          <br />
          <label>Password</label>
          <input type="password" onChange={passwordHandler} value={password} />
          <br />
          <button onClick={signinHandler}>Sign In</button>
        </>
      ) : (
        <>
          <div id="">
            <p>Staff Logged In</p>
          </div>
          <button onClick={signoutHandler}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default Signin;
