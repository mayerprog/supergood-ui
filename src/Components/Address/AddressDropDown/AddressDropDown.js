import { fetchCoordinatesForAddress } from "../../../services/fetchCoordinatesForAddress";
import styles from "./AddressDropDown.module.scss";

const AddressDropDown = ({
  setShowDropdown,
  setInputAddress,
  suggestions,
  setSuggestions,
  setMapPosition,
  setMarkerAddress,
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
