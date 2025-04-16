import "./App.css";
import { useContext, useState } from "react";
import EventsList from "./Components/EventsList";
import MyEvents from "./Components/MyEvents";
import Header from "./Components/Header";
import Signin from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { LoggedInUserContext } from "./Contexts/LoggedInUser";

function App() {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const [signUpPage, setSignUpPage] = useState("");
  const [signInPage, setSignInPage] = useState("");

  const signoutHandler = () => {
    setLoggedInUser(null);
    sessionStorage.clear();
  };

  return (
    <>
      {loggedInUser ? (
        <>
          <Header />
          <button onClick={signoutHandler}>Sign out</button>
          <MyEvents />
        </>
      ) : (
        <>
          <Header />
          {!signInPage ? (
            <button onClick={() => setSignInPage("signIn")}>Sign in</button>
          ) : (
            <>
              <Signin />
              <button onClick={() => setSignInPage("")}>Back</button>
            </>
          )}
          <br></br>
          <br></br>
          {!signUpPage ? (
            <button onClick={() => setSignUpPage("signUp")}>Sign up</button>
          ) : (
            <>
              <SignUp />
              <button onClick={() => setSignUpPage("")}>Back</button>
            </>
          )}
          <EventsList />
        </>
      )}
    </>
  );
}

export default App;
