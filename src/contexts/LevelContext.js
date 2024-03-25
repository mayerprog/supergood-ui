import { createContext, useRef, useState } from "react";
import { useSelector } from "react-redux";

const LevelContext = createContext();

export const LevelContextProvider = ({ children }) => {
  const [amount, setAmount] = useState(null);

  return (
    <LevelContext.Provider
      value={{
        amount,
        setAmount,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export default LevelContext;
