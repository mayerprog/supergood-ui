import { useEffect, useState } from "react";
import { fetchSuggestions } from "../../../services/fetchSuggestions";
import styles from "./AddAddressContainer.module.scss";
import AddressDropDown from "../AddressDropDown/AddressDropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  removeAddress,
  removeAddressSelected,
  updateAddress,
} from "../../../redux/slices/addressSlice";
import { makeExistingAddressSelected } from "../../../services/makeExistingAddressSelected";
import { ImBin } from "react-icons/im";

const AddAddressContainer = ({
  item,
  streetName,
  closeChangeField,
  setAddressIndexForChange,
  isModal,
}) => {
  const [inputAddress, setInputAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);

  const addressList = useSelector((state) => state.address.addressList);

  const dispatch = useDispatch();

  useEffect(() => {
    setInputAddress(streetName);
  }, [streetName]);

  const addressOnChange = (value) => {
    setInputAddress(value);
    fetchSuggestions(value, setSuggestions, setShowDropdown);
  };

  const handleUpdateAddress = () => {
    if (!isAddressValid) {
      return; // Stop the function if the address is not validated
    }
    const addressExists = addressList.some(
      (item) => item.address === inputAddress
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
          dispatch(addAddress({ address: inputAddress, selected: true }));
        else dispatch(addAddress({ address: inputAddress, selected: false }));
      }
    }
    closeChangeField();
  };

  const handleRemoveAddress = () => {
    dispatch(removeAddress(item.id));
    dispatch(removeAddressSelected());
    setAddressIndexForChange(null);
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Введите улицу"
          value={inputAddress}
          onChange={(e) => {
            addressOnChange(e.target.value);
          }}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Hide dropdown when not focused; delay to allow click event to register
        />
        {showDropdown && (
          <AddressDropDown
            setShowDropdown={setShowDropdown}
            setInputAddress={setInputAddress}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            setIsAddressValid={setIsAddressValid}
          />
        )}

        <div className={styles.details}>
          <input
            className={styles.detailsInput}
            placeholder="Дом"
            type="number"
            name="house"
            // value={address}
          />
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
        <button className={styles.buttonStyle} onClick={handleUpdateAddress}>
          <span className={styles.buttonText}>Сохранить</span>
        </button>
        <button className={styles.buttonStyle} onClick={closeChangeField}>
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
