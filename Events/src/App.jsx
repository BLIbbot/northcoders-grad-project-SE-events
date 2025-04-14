import "./App.css";
import { useContext } from "react";
import EventsList from "./Components/EventsList";
import MyEvents from "./Components/MyEvents";
import Header from "./Components/Header";
import Signin from "./Components/SignIn";
import { LoggedInUserContext } from "./Contexts/LoggedInUser";

function App() {
  const { loggedInUser } = useContext(LoggedInUserContext);
  return (
    <>
      <Header />
      <Signin />
      {loggedInUser ? <MyEvents /> : <EventsList />}
    </>
  );
}

export default App;
