import { useEffect, useState } from "react";
import { fetchSuggestions } from "../../../services/fetchSuggestions";
import styles from "./AddAddressComponent.module.scss";
import AddressDropDown from "../AddressDropDown/AddressDropDown";

const AddAddressComponent = ({ streetName, closeChangeField }) => {
  const [inputAddress, setInputAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setInputAddress(streetName);
  }, []);

  const changeAddress = (value) => {
    setInputAddress(value);
    fetchSuggestions(value, setSuggestions, setShowDropdown);
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Введите улицу"
          value={inputAddress}
          onChange={(e) => {
            changeAddress(e.target.value);
          }}
          // onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          // onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Hide dropdown when not focused; delay to allow click event to register
        />
        {showDropdown && (
          <AddressDropDown
            setShowDropdown={setShowDropdown}
            setInputAddress={setInputAddress}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
          />
        )}

        <div className={styles.details}>
          <input
            className={styles.detailsInput}
            placeholder="Дом"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Кв./офис"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Домофон"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Подъезд"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Этаж"
            // value={address}
          />
        </div>
        <input className={styles.input} placeholder="Комментарий курьеру" />
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.buttonStyle}
          onClick={() => console.log("Save")}
        >
          <span className={styles.buttonText}>Сохранить</span>
        </button>
        <button className={styles.buttonStyle} onClick={closeChangeField}>
          <span className={styles.buttonText}>Отмена</span>
        </button>
      </div>
    </>
  );
};

export default AddAddressComponent;
