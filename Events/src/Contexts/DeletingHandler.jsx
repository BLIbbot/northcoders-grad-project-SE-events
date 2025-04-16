import { createContext, useState } from "react";

export const DeletingContext = createContext({});

export const DeletingProvider = ({ children }) => {
  const [deleting, setDeleting] = useState(null);
  return (
    <DeletingContext.Provider value={{ deleting, setDeleting }}>
      {children}
    </DeletingContext.Provider>
  );
};
