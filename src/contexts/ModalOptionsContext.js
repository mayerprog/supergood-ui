import { createContext, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ModalOptionsContext = createContext();

export const ModalOptionsContextProvider = ({ children }) => {
  const [isModalOptionsOpen, setIsModalOptionsOpen] = useState(false);

  const toggleOptionsVisibility = () => {
    setIsModalOptionsOpen(!isModalOptionsOpen);
  };

  return (
    <ModalOptionsContext.Provider
      value={{
        toggleOptionsVisibility,
        isModalOptionsOpen,
        setIsModalOptionsOpen,
      }}
    >
      {children}
    </ModalOptionsContext.Provider>
  );
};

export default ModalOptionsContext;
