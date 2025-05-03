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
          <div className="AccountSection">
            <button onClick={signoutHandler}>Sign out</button>
          </div>
          <MyEvents />
        </>
      ) : (
        <>
          <Header />
          {!signInPage ? (
            <>
              <div className="AccountSection">
                <button onClick={() => setSignInPage("signIn")}>Sign in</button>
              </div>
              <EventsList />
            </>
          ) : (
            <>
              {!signUpPage ? (
                <>
                  <div className="MainContainer">
                    <div className="AccountSection">
                      <Signin />
                      <button type="button" onClick={() => setSignInPage("")}>
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setSignUpPage("signUp")}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="AccountSection">
                    <SignUp />
                    <button onClick={() => setSignUpPage("")}>Back</button>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
