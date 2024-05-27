import { createContext, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ModalsContext = createContext();

export const ModalsContextProvider = ({ children }) => {
  const [isPromoErrorOpen, setIsPromoErrorOpen] = useState(false);
  const promoErrorWrapperRef = useRef(null);
  const togglePromoErrorVisibility = () => {
    setIsPromoErrorOpen(!isPromoErrorOpen);
  };

  return (
    <ModalsContext.Provider
      value={{
        isPromoErrorOpen,
        setIsPromoErrorOpen,
        promoErrorWrapperRef,
        togglePromoErrorVisibility,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsContext;
