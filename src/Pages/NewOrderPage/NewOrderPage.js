import { useContext, useEffect, useState } from "react";
import styles from "./NewOrderPage.module.scss";
import UserInfo from "../../Components/UserInfo/UserInfo";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";

const NewOrderPage = ({
  userInfoRef,
  toggleUserInfoVisibility,
  addressRef,
  isUserInfoOpen,
  isModalAddressOpen,
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
}) => {
  return (
    <div className={styles.content}>
      <h2>Оформление заказа</h2>
      <AddressModal
        marginTop="none"
        width="50%"
        isModal={false}
        mapWrapperRef={mapWrapperRef}
        setIsMapOpen={setIsMapOpen}
        isMapOpen={isMapOpen}
      />
      {isUserInfoOpen && (
        <div className={styles.cardOverlay}>
          <UserInfo
            userInfoRef={userInfoRef}
            toggleUserInfoVisibility={toggleUserInfoVisibility}
          />
        </div>
      )}
      {isModalAddressOpen && (
        <div className={styles.cardOverlay}>
          <AddressModal
            addressRef={addressRef}
            marginTop="-170px"
            width="none"
            isModal={true}
          />
        </div>
      )}
    </div>
  );
};

export default NewOrderPage;
