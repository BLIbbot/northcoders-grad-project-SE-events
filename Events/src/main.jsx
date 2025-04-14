import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LoggedInUserProvider } from "./Contexts/LoggedInUser.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoggedInUserProvider>
      <App />
    </LoggedInUserProvider>
  </StrictMode>
);
