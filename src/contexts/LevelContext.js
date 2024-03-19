import { createContext, useRef, useState } from "react";
import { useSelector } from "react-redux";

const LevelContext = createContext();

export const LevelContextProvider = ({ children }) => {
  const [isModalOptionsOpen, setIsModalOptionsOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);

  const optionsRef = useRef(null);
  const userInfoRef = useRef(null);
  const addressRef = useRef(null);

  const toggleOptionsVisibility = () => {
    setIsModalOptionsOpen(!isModalOptionsOpen);
  };
  const toggleUserInfoVisibility = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };
  const toggleAddressVisibility = () => {
    setIsModalAddressOpen(!isModalAddressOpen);
  };

  return (
    <LevelContext.Provider
      value={{
        isModalOptionsOpen,
        setIsModalOptionsOpen,
        isUserInfoOpen,
        setIsUserInfoOpen,
        isModalAddressOpen,
        setIsModalAddressOpen,
        optionsRef,
        userInfoRef,
        addressRef,
        toggleOptionsVisibility,
        toggleUserInfoVisibility,
        toggleAddressVisibility,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export default LevelContext;
