import styles from "./AddressModal.module.scss";
import { IoMdClose } from "react-icons/io";

import React, { useEffect } from "react";
import AddressComponent from "../AddressComponent/AddressComponent";
import { useSelector } from "react-redux";

const AddressModal = ({
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
  addressRef,
  isModal,
  toggleAddressVisibility,
}) => {
  const addressList = useSelector((state) => state.user.addressList);

  // useEffect(() => {
  //   console.log("AddressModal has been drawn");
  // }, []);

  return (
    <div
      className={styles.container}
      ref={addressRef}
      data-is-modal={isModal ? "true" : "false"}
    >
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
