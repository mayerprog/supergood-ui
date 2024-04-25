import { createContext, useRef, useState } from "react";
import { useSelector } from "react-redux";

const LevelContext = createContext();

export const LevelContextProvider = ({ children }) => {
  const [markerAddress, setMarkerAddress] = useState(""); //temporary address while choosing
  const [markerPosition, setMarkerPosition] = useState([0, 0]);

  return (
    <LevelContext.Provider
      value={{
        markerAddress,
        setMarkerAddress,
        markerPosition,
        setMarkerPosition,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export default LevelContext;
