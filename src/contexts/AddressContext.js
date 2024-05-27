import { createContext, useRef, useState } from "react";
import { useSelector } from "react-redux";

const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const [markerAddress, setMarkerAddress] = useState(""); //temporary address while choosing
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [streetid, setStreetid] = useState(null);
  const [addressData, setAddressData] = useState(null);

  return (
    <AddressContext.Provider
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
    </AddressContext.Provider>
  );
};

export default AddressContext;
