import styles from "./AddressModal.module.scss";
import { IoMdClose } from "react-icons/io";

import React, { useEffect } from "react";
import AddressComponent from "../AddressComponent/AddressComponent";

const AddressModal = ({
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
  addressRef,
  isModal,
  toggleAddressVisibility,
}) => {
  useEffect(() => {
    console.log("AddressModal has been drawn");
  }, []);
  return (
    <div className={styles.container} ref={addressRef}>
      <div onClick={toggleAddressVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <AddressComponent
        mapWrapperRef={mapWrapperRef}
        setIsMapOpen={setIsMapOpen}
        isMapOpen={isMapOpen}
        isModal={isModal}
      />
    </div>
  );
};

export default AddressModal;
