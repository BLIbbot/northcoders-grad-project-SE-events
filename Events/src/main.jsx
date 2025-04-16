import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LoggedInUserProvider } from "./Contexts/LoggedInUser.jsx";
import { DeletingProvider } from "./Contexts/DeletingHandler.jsx";
import { EditingProvider } from "./Contexts/EditingHandler.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoggedInUserProvider>
      <DeletingProvider>
        <EditingProvider>
          <App />
        </EditingProvider>
      </DeletingProvider>
    </LoggedInUserProvider>
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>
);
