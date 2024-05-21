import { useContext, useEffect, useState } from "react";
import { fetchSuggestionsStreet } from "../../../services/fetchSuggestionsStreet";
import styles from "./AddAddressContainer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  removeAddress,
  removeAddressSelected,
  setDescription,
  setEntrance,
  setFlat,
  setFloor,
  updateSelected,
} from "../../../redux/slices/userSlice";
import { makeExistingAddressSelected } from "../../../services/makeExistingAddressSelected";
import { ImBin } from "react-icons/im";
import StreetDropDown from "../StreetDropDown/StreetDropDown";
import HouseDropDown from "../HouseDropDown/HouseDropDown";
import LevelContext from "../../../contexts/LevelContext";
import { fetchHousesSuggestions } from "../../../services/fetchHousesSuggestions";
import { addressAPI } from "../../../api/addressAPI";
import { useUpdateStreetid } from "../../../hooks/useUpdateStreetid";
import Cookies from "js-cookie";

const AddAddressContainer = ({
  item,
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
  // const token = useSelector((state) => state.user.token);
  const floor = useSelector((state) => state.user.floor);
  const flat = useSelector((state) => state.user.flat);
  const entrance = useSelector((state) => state.user.entrance);
  const description = useSelector((state) => state.user.description);
  const token = Cookies.get("token");

  const dispatch = useDispatch();

  // to put street and house names from selected address in all input fields
  useEffect(() => {
    if (item) {
      setInputStreet(item.street);
      setInputHouse(item.yhouse);
      dispatch(setFloor(item.floor));
      dispatch(setFlat(item.flat));
      dispatch(setEntrance(item.entrance));
      dispatch(setDescription(item.description));
    } else {
      setInputStreet("");
      setInputHouse("");
      dispatch(setFloor(""));
      dispatch(setFlat(""));
      dispatch(setEntrance(""));
      dispatch(setDescription(""));
    }
  }, [item]);

  //this useEffect must define streetid for changing house number input if needed
  useUpdateStreetid(item?.street, setStreetid);

  const handleUpdateAddress = async () => {
    if (!isAddressValid) {
      return; // Stop the function if the address is not validated
    }
    const addressExists = addressList.some(
      (address) =>
        `${address.street}, ${address.yhouse}` ===
        `${inputStreet}, ${inputHouse}`
    );
    //IF WE UPDATE EXISTING ADDRESS
    if (item) {
      //if address exists then return
      if (addressExists) return;
      // if address does not exist then update
      else {
        const selectedAddress = addressList.find((address) => address.selected);
        const isSelected = selectedAddress === item;
        try {
          const responseDelete = await addressAPI.deleteAddress({
            token: token,
            addressid: item.addressid,
            status: 2,
          });
          if (responseDelete.status === "ok") {
            dispatch(removeAddress(item.addressid));
            dispatch(removeAddressSelected());
            setAddressIndexForChange(null);
          }

          const responseSave = await addressAPI.saveAddress({
            token: token,
            street: addressData.street,
            lat: addressData.lat,
            long: addressData.long,
            addressid: addressData.addressid,
            streetid: addressData.streetid,
            houseid: addressData.houseid,
            entrance: entrance,
            floor: floor,
            flat: flat,
            description: description,
            selected: true,
            // надо уточнить, будут ли изменения в бэке, если нет, то все новые адреса делать по умолчанию selected: true
            // если изменения будут, то вместо true поставить isSelected
          });
          if (responseSave.status === "ok") {
            dispatch(addAddress({ data: addressData, selected: true }));
          }
        } catch (err) {
          console.log(err);
        }
      }

      //IF WE ADD NEW ADDRESS
    } else {
      try {
        const response = await addressAPI.saveAddress({
          token: token,
          street: addressData.street,
          lat: addressData.lat,
          long: addressData.long,
          addressid: addressData.addressid,
          streetid: addressData.streetid,
          houseid: addressData.houseid,
          entrance: entrance,
          floor: floor,
          flat: flat,
          description: description,
          selected: true,
        });
        if (response.status === "ok") {
          //if address exists just make it selected
          if (addressExists) {
            makeExistingAddressSelected(addressList, inputAddress, dispatch);
            // if address does not exist then add to the addressList
          } else {
            // if no addresses added then first address should be selected automatically
            dispatch(addAddress({ data: addressData, selected: true }));
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    closeChangeField();
  };

  const handleRemoveAddress = async () => {
    const firstAddress = addressList[1];
    console.log("addressList", addressList);
    try {
      const responseDelete = await addressAPI.deleteAddress({
        token: token,
        addressid: item.addressid,
        status: 2,
      });
      // const responseSave = await addressAPI.saveAddress({
      //   token: token,
      //   street: firstAddress.street,
      //   lat: firstAddress.lat,
      //   long: firstAddress.long,
      //   addressid: firstAddress.addressid,
      //   streetid: firstAddress.streetid,
      //   houseid: firstAddress.houseid,
      //   entrance: firstAddress.entrance,
      //   floor: firstAddress.floor,
      //   flat: firstAddress.flat,
      //   description: firstAddress.description,
      //   selected: true,
      // });
      // if (responseSave.status === "ok") {
      //   dispatch(updateSelected(1));
      // }
      if (responseDelete.status === "ok") {
        dispatch(removeAddress(item.addressid));
        dispatch(removeAddressSelected());
        setAddressIndexForChange(null);
      }
    } catch (err) {
      console.log(err);
    }
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
            value={flat}
            onChange={(e) => {
              dispatch(setFlat(e.target.value));
            }}
          />
          <input
            className={styles.detailsInput}
            placeholder="Подъезд"
            type="number"
            name="entrance"
            value={entrance}
            onChange={(e) => {
              dispatch(setEntrance(e.target.value));
            }}
          />
          <input
            className={styles.detailsInput}
            placeholder="Этаж"
            type="number"
            name="floor"
            value={floor}
            onChange={(e) => {
              dispatch(setFloor(e.target.value));
            }}
          />
        </div>
        <input
          className={styles.input}
          placeholder="Комментарий курьеру"
          name="description"
          value={description}
          onChange={(e) => {
            dispatch(setDescription(e.target.value));
          }}
        />
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
