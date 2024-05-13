import { useEffect, useState } from "react";
import { fetchCoordinatesForAddress } from "../../../services/fetchCoordinatesForAddress";
import styles from "./AddressDropDown.module.scss";
import { addressAPI } from "../../../api/addressAPI";
import { setMapPosition } from "../../../redux/slices/userSlice";

const AddressDropDown = ({
  setShowDropdown,
  setInputAddress,
  suggestions,
  setSuggestions,
  dispatch,
  setMarkerAddress,
  setMarkerPosition,
  setIsAddressValid,
  isModal,
}) => {
  const handleAddressClick = async (suggestion) => {
    let houseOptions;

    //to get just street options
    if (!suggestion.yhouse) {
      const response = await addressAPI.getHousesList(suggestion.streetid);
      setSuggestions(Object.values(response.streets));
      setInputAddress(suggestion.street);
      setShowDropdown(true);
      //to get houses options
    } else {
      const response = await addressAPI.getHouse(
        suggestion.streetid,
        suggestion.house
      );
      setSuggestions(Object.values(response.streets));
      houseOptions = Object.values(response.streets);
    }
    //to choose a house from house options
    if (houseOptions) {
      setInputAddress(`${suggestion.street}, ${suggestion.yhouse}`);
      setSuggestions([]);
      setShowDropdown(false);
      setIsAddressValid(true);
      const newPosition = [
        parseFloat(suggestion.lat),
        parseFloat(suggestion.long),
      ];
      dispatch(setMapPosition(newPosition));
      setMarkerPosition(newPosition);
      setMarkerAddress(`${suggestion.street}, ${suggestion.yhouse}`);
    }
  };

  return (
    <ul className={styles.listContainer} data-is-modal={isModal ? true : false}>
      {suggestions.length === 0 ? (
        <li
          onClick={() => {
            setSuggestions([]);
            setShowDropdown(false);
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
            {suggestion.street}
            {suggestion.yhouse ? `, ${suggestion.yhouse}` : ""}
          </li>
        ))
      )}
    </ul>
  );
};

export default AddressDropDown;
