import { useEffect } from "react";
import styles from "./NewOrderPage.module.scss";
import UserInfo from "../../Components/UserInfo/UserInfo";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";
import OrderCart from "../../Components/Cart/OrderCart/OrderCart";
import Payment from "../../Components/Payment/Payment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <div className={styles.container}>
      <h2>Оформление заказа</h2>
      <div className={styles.content}>
        <div className={styles.addressCartContainer}>
          <AddressModal
            // marginTop="none"
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
            // marginTop="-170px"
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
