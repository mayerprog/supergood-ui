import { useEffect, useState } from "react";
import styles from "./StreetDropDown.module.scss";
import { addressAPI } from "../../../api/addressAPI";

const StreetDropDown = ({
  setShowStreetDropdown,
  setShowHouseDropdown,
  setInputStreet,
  suggestions,
  setHouseSuggestions,
  isModal,
  setStreetid,
}) => {
  const handleAddressClick = async (suggestion) => {
    setInputStreet(suggestion.street);
    setShowStreetDropdown(false);
    const response = await addressAPI.getHousesList(suggestion.streetid);
    setStreetid(suggestion.streetid);
    setHouseSuggestions(Object.values(response.streets));
    setShowHouseDropdown(true);
  };

  return (
    <ul className={styles.listContainer} data-is-modal={isModal ? true : false}>
      {suggestions.length === 0 ? (
        <li
          onClick={() => {
            setHouseSuggestions([]);
            setShowStreetDropdown(false);
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
          </li>
        ))
      )}
    </ul>
  );
};

export default StreetDropDown;
