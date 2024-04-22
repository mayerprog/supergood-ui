import styles from "./AddressScreen.module.scss";
import AddressComponent from "../AddressComponent/AddressComponent";
import { IoMdClose } from "react-icons/io";

import { useState } from "react";

const AddressScreen = ({ isModal, toggleAddressVisibility, addressRef }) => {
  return (
    <div className={styles.container} ref={addressRef}>
      <div onClick={toggleAddressVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>

      <AddressComponent
        isModal={isModal}
        toggleAddressVisibility={toggleAddressVisibility}
      />
    </div>
  );
};

export default AddressScreen;
