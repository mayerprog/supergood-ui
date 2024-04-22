import AddressComponent from "../AddressComponent/AddressComponent";
import styles from "./AddressScreen.module.scss";
import { useState } from "react";

const AddressScreen = ({ isModal, toggleAddressVisibility, addressRef }) => {
  return (
    <div className={styles.container} ref={addressRef}>
      <AddressComponent
        isModal={isModal}
        toggleAddressVisibility={toggleAddressVisibility}
      />
      <button onClick={toggleAddressVisibility}>Отмена</button>
    </div>
  );
};

export default AddressScreen;
