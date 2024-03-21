import { useContext, useEffect, useState } from "react";
import styles from "./NewOrderPage.module.scss";
import UserInfo from "../../Components/UserInfo/UserInfo";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";
import Cart from "../../Components/Cart/Cart";
import OrderCart from "../../Components/Cart/OrderCart/OrderCart";
import Payment from "../../Components/Payment/Payment";
import { useMediaQuery } from "react-responsive";

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
  // const mediaQuery = useMediaQuery({ maxWidth: 1274 }); // to hide <Cart /> when maxWidth: 1480px

  return (
    <div className={styles.container}>
      <h2>Оформление заказа</h2>
      <div className={styles.content}>
        <div className={styles.addressCartContainer}>
          <AddressModal
            marginTop="none"
            maxWidth="500px"
            height="100%"
            isModal={false}
            mapWrapperRef={mapWrapperRef}
            setIsMapOpen={setIsMapOpen}
            isMapOpen={isMapOpen}
          />
          <OrderCart />
        </div>
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
            maxWidth="500px"
            height="none"
            isModal={true}
          />
        </div>
      )}
    </div>
  );
};

export default NewOrderPage;
