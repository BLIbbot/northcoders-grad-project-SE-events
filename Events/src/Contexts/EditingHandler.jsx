import { createContext, useState } from "react";

export const EditingContext = createContext({});

export const EditingProvider = ({ children }) => {
  const [editing, setEditing] = useState(null);
  return (
    <EditingContext.Provider value={{ editing, setEditing }}>
      {children}
    </EditingContext.Provider>
  );
};
