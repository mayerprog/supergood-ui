import { fetchCoordinatesForAddress } from "../../../services/fetchCoordinatesForAddress";
import styles from "./AddressDropDown.module.scss";

const AddressDropDown = ({
  setShowDropdown,
  setInputAddress,
  suggestions,
  setSuggestions,
  setMapPosition,
  setMarkerAddress,
  addressNotValid,
}) => {
  const handleAddressClick = (name) => {
    if (setMapPosition && setMarkerAddress) {
      fetchCoordinatesForAddress(name, setMapPosition, setMarkerAddress);
    }
    setInputAddress(name);
    setSuggestions([]);
    setShowDropdown(false);
  };
  return (
    <ul>
      {suggestions.length === 0 ? (
        <li
          onClick={() => {
            setSuggestions([]);
            setShowDropdown(false);
          }}
        >
          {addressNotValid}
        </li>
      ) : (
        suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => {
              handleAddressClick(suggestion.display_name);
            }}
          >
            {suggestion.display_name}
          </li>
        ))
      )}
    </ul>
  );
};

export default AddressDropDown;
