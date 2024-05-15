import { useContext, useEffect, useState } from "react";
import { fetchSuggestionsStreet } from "../../../services/fetchSuggestionsStreet";
import styles from "./AddAddressContainer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  removeAddress,
  removeAddressSelected,
  updateAddress,
} from "../../../redux/slices/userSlice";
import { makeExistingAddressSelected } from "../../../services/makeExistingAddressSelected";
import { ImBin } from "react-icons/im";
import StreetDropDown from "../StreetDropDown/StreetDropDown";
import HouseDropDown from "../HouseDropDown/HouseDropDown";
import LevelContext from "../../../contexts/LevelContext";
import { fetchHousesSuggestions } from "../../../services/fetchHousesSuggestions";

const AddAddressContainer = ({
  item,
  streetName,
  closeChangeField,
  setAddressIndexForChange,
  isModal,
}) => {
  const [inputAddress, setInputAddress] = useState("");
  const [inputStreet, setInputStreet] = useState("");
  const [inputHouse, setInputHouse] = useState("");
  const [showStreetDropdown, setShowStreetDropdown] = useState(false);
  const [showHouseDropdown, setShowHouseDropdown] = useState(false);
  const [streetSuggestions, setStreetSuggestions] = useState([]);
  const [houseSuggestions, setHouseSuggestions] = useState([]);
  const [isAddressValid, setIsAddressValid] = useState(false);

  const {
    setMarkerAddress,
    setMarkerPosition,
    streetid,
    setStreetid,
    addressData,
    setAddressData,
  } = useContext(LevelContext);
  const addressList = useSelector((state) => state.user.addressList);
  const addressSelected = useSelector((state) => state.user.addressSelected);

  const dispatch = useDispatch();

  // to put street and house names from selected address in all input fields
  useEffect(() => {
    setInputAddress(addressSelected);
    setInputStreet(addressSelected.split(",")[0]);
    setInputHouse(addressSelected.split(",")[1].trim());
  }, [addressSelected]);

  const handleUpdateAddress = () => {
    if (!isAddressValid) {
      return; // Stop the function if the address is not validated
    }
    const addressExists = addressList.some(
      (item) => `${item.street}, ${item.yhouse}` === inputAddress
    );
    //if we update existing address
    if (item) {
      //if address exists then return
      if (addressExists) return;
      // if address does not exist then update
      else dispatch(updateAddress({ id: item.id, newAddress: inputAddress }));

      //if we add new address
    } else {
      //if address exists just make it selected
      if (addressExists) {
        makeExistingAddressSelected(addressList, inputAddress, dispatch);
        // if address does not exist then add to the addressList
      } else {
        // if no addresses added then first address should be selected automatically
        if (addressList.length === 0)
          dispatch(addAddress({ data: addressData, selected: true }));
        else dispatch(addAddress({ data: addressData, selected: false }));
      }
    }
    closeChangeField();
  };

  const handleRemoveAddress = () => {
    dispatch(removeAddress(item.addressid));
    dispatch(removeAddressSelected());
    setAddressIndexForChange(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.addressContainer}>
          <div className={styles.streetInputContainer}>
            <input
              className={styles.input}
              placeholder="Введите улицу"
              value={inputStreet}
              onChange={(e) => {
                setInputStreet(e.target.value);
                fetchSuggestionsStreet(
                  e.target.value,
                  setStreetSuggestions,
                  setShowStreetDropdown
                );
              }}
              onFocus={() =>
                streetSuggestions.length > 0 && setShowStreetDropdown(true)
              }
              onBlur={() => setTimeout(() => setShowStreetDropdown(false), 100)} // Hide dropdown when not focused; delay to allow click event to register
            />
            {showStreetDropdown && (
              <StreetDropDown
                setShowStreetDropdown={setShowStreetDropdown}
                setShowHouseDropdown={setShowHouseDropdown}
                setInputStreet={setInputStreet}
                suggestions={streetSuggestions}
                setHouseSuggestions={setHouseSuggestions}
                isModal={true}
                setStreetid={setStreetid}
              />
            )}
          </div>
          <div className={styles.houseInputContainer}>
            <input
              className={styles.input}
              placeholder="Дом"
              name="house"
              value={inputHouse}
              onChange={(e) => {
                setInputHouse(e.target.value);
                fetchHousesSuggestions(
                  e.target.value,
                  setHouseSuggestions,
                  setShowHouseDropdown,
                  streetid
                );
              }}
              onFocus={() =>
                houseSuggestions.length > 0 && setShowHouseDropdown(true)
              }
              onBlur={() => setTimeout(() => setShowHouseDropdown(false), 100)}
            />
            {showHouseDropdown && (
              <HouseDropDown
                setShowHouseDropdown={setShowHouseDropdown}
                setInputHouse={setInputHouse}
                suggestions={houseSuggestions}
                setSuggestions={setHouseSuggestions}
                dispatch={dispatch}
                setMarkerAddress={setMarkerAddress}
                setMarkerPosition={setMarkerPosition}
                setIsAddressValid={setIsAddressValid}
                isModal={true}
                setAddressData={setAddressData}
                setInputAddress={setInputAddress}
              />
            )}
          </div>
        </div>
        <div className={styles.details}>
          <input
            className={styles.detailsInput}
            placeholder="Кв./офис"
            name="flat"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Домофон"
            name="doorphone"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Подъезд"
            type="number"
            name="entrance"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Этаж"
            type="number"
            name="floor"
            // value={address}
          />
        </div>
        <input className={styles.input} placeholder="Комментарий курьеру" />
      </div>
      <div
        className={styles.buttonsContainer}
        data-is-modal={isModal ? "true" : "false"}
      >
        <button
          className={styles.buttonStyle}
          onClick={handleUpdateAddress}
          data-is-modal={isModal ? "true" : "false"}
        >
          <span className={styles.buttonText}>Сохранить</span>
        </button>
        <button
          className={styles.buttonStyle}
          onClick={closeChangeField}
          data-is-modal={isModal ? "true" : "false"}
        >
          <span className={styles.buttonText}>Отмена</span>
        </button>
        {item && (
          <button className={styles.binButton} onClick={handleRemoveAddress}>
            <ImBin size={17} />
          </button>
        )}
      </div>
    </>
  );
};

export default AddAddressContainer;
