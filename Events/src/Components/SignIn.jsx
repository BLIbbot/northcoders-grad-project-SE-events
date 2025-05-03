import { useState, useContext } from "react";
import { signIn } from "../api";
import { LoggedInUserContext } from "../Contexts/LoggedInUser";

const Signin = ({ setProfile }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const signinHandler = async (e) => {
    e.preventDefault(); // Prevent form submit reload
    setError(null); // Clear previous errors
    try {
      const response = await signIn(username, password);
      const staffId = response.headers.staff_id;

      setLoggedInUser(staffId);
      sessionStorage.setItem("staff_id", staffId);
      setUsername("");
      setPassword("");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const signoutHandler = () => {
    setLoggedInUser(null);
    sessionStorage.clear();
  };

  return (
    <div>
      {!loggedInUser ? (
        <form onSubmit={signinHandler} className="SignInForm">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Sign In</button>
        </form>
      ) : (
        <div>
          <p>Staff Logged In</p>
          <button onClick={signoutHandler}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default Signin;
