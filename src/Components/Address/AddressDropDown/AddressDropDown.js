import { fetchCoordinatesForAddress } from "../../../services/fetchCoordinatesForAddress";
import styles from "./AddressDropDown.module.scss";

const AddressDropDown = ({
  setShowDropdown,
  setInputAddress,
  suggestions,
  setSuggestions,
  dispatch,
  setMarkerAddress,
  setMarkerPosition,
  setIsAddressValid,
}) => {
  const handleAddressClick = (name) => {
    if (setMarkerAddress) {
      fetchCoordinatesForAddress(
        name,
        dispatch,
        setMarkerAddress,
        setMarkerPosition
      );
    }
    setInputAddress(name);
    setIsAddressValid(true);
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
          К сожалению, мы не доставляем по этому адресу
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
