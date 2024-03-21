import { useContext, useEffect, useState } from "react";
import styles from "./NewOrderPage.module.scss";
import UserInfo from "../../Components/UserInfo/UserInfo";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";
import Cart from "../../Components/Cart/Cart";
import OrderCart from "../../Components/Cart/OrderCart/OrderCart";
import Payment from "../../Components/Payment/Payment";

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
    <div className={styles.container}>
      <h2>Оформление заказа</h2>
      <div className={styles.content}>
        <AddressModal
          marginTop="none"
          width="40%"
          height="100%"
          isModal={false}
          mapWrapperRef={mapWrapperRef}
          setIsMapOpen={setIsMapOpen}
          isMapOpen={isMapOpen}
        />

        <OrderCart />
        <Payment />
      </div>
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
            height="none"
            isModal={true}
          />
        </div>
      )}
    </div>
  );
};

export default NewOrderPage;
