import styles from "./HouseDropDown.module.scss";
import { addressAPI } from "../../../api/addressAPI";
import { setMapPosition } from "../../../redux/slices/userSlice";

const HouseDropDown = ({
  setShowHouseDropdown,
  setInputHouse,
  suggestions,
  setSuggestions,
  dispatch,
  setMarkerAddress,
  setMarkerPosition,
  isModal,
  setAddressData,
}) => {
  const handleAddressClick = async (suggestion) => {
    const response = await addressAPI.getHouse(
      suggestion.streetid,
      suggestion.house
    );
    setSuggestions(Object.values(response.streets));
    setInputHouse(suggestion.yhouse);
    setSuggestions([]);
    setAddressData(suggestion);
    setShowHouseDropdown(false);
    const newPosition = [
      parseFloat(suggestion.lat),
      parseFloat(suggestion.long),
    ];
    dispatch(setMapPosition(newPosition));
    setMarkerPosition(newPosition);
    setMarkerAddress(`${suggestion.street}, ${suggestion.yhouse}`);
  };

  return (
    <ul className={styles.listContainer} data-is-modal={isModal ? true : false}>
      {suggestions.length === 0 ? (
        <li
          onClick={() => {
            setSuggestions([]);
            setShowHouseDropdown(false);
          }}
          className={styles.list}
        >
          К сожалению, мы не доставляем по этому адресу
        </li>
      ) : (
        suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => {
              handleAddressClick(suggestion);
            }}
            className={styles.list}
          >
            {suggestion.yhouse}
          </li>
        ))
      )}
    </ul>
  );
};

export default HouseDropDown;
