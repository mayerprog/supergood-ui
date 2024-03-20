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
}) => {
  return (
    <div className={styles.content}>
      <h2>Оформление заказа</h2>
      <AddressModal addressRef={addressRef} marginTop="none" width="50%" />
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
          />
        </div>
      )}
    </div>
  );
};

export default NewOrderPage;
