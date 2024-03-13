import { createContext, useRef, useState } from "react";

const LevelContext = createContext();

export const LevelContextProvider = ({ children }) => {
  const [isAuthorised, setIsAuthorised] = useState(false);

  return (
    <LevelContext.Provider value={{ isAuthorised, setIsAuthorised }}>
      {children}
    </LevelContext.Provider>
  );
};

export default LevelContext;
