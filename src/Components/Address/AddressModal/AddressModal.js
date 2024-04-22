import styles from "./AddressModal.module.scss";

import React, { useEffect } from "react";
import AddressComponent from "../AddressComponent/AddressComponent";

const AddressModal = ({
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
  addressRef,
  isModal,
}) => {
  useEffect(() => {
    console.log("AddressModal has been drawn");
  }, []);
  return (
    <div
      className={styles.container}
      ref={addressRef}
      data-is-modal={isModal ? "true" : "false"}
    >
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
