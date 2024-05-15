import { createContext, useRef, useState } from "react";
import { useSelector } from "react-redux";

const LevelContext = createContext();

export const LevelContextProvider = ({ children }) => {
  const [markerAddress, setMarkerAddress] = useState(""); //temporary address while choosing
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [streetid, setStreetid] = useState(null);
  const [addressData, setAddressData] = useState(null);

  return (
    <LevelContext.Provider
      value={{
        markerAddress,
        setMarkerAddress,
        markerPosition,
        setMarkerPosition,
        streetid,
        setStreetid,
        addressData,
        setAddressData,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export default LevelContext;
