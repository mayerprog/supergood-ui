import styles from "./AddressDropDown.module.scss";

const AddressDropDown = ({
  setShowDropdown,
  setInputAddress,
  suggestions,
  setSuggestions,
  fetchCoordinatesForAddress,
}) => {
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
              setInputAddress(suggestion.display_name);
              fetchCoordinatesForAddress(suggestion.display_name);
              setSuggestions([]);
              setShowDropdown(false);
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
