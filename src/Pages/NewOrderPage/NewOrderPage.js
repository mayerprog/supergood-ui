import { useEffect } from "react";
import styles from "./NewOrderPage.module.scss";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";
import OrderCart from "../../Components/Cart/OrderCart/OrderCart";
import Payment from "../../Components/Payment/Payment";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PayTypeModal from "../../Components/Payment/PayTypeModal/PayTypeModal";
import UserModal from "../../Components/UserInfo/UserModal/UserModal";
import { useMediaQuery } from "react-responsive";
import MainSheet from "../../Components/MainSheet/MainSheet";
import BonusModal from "../../Components/Promo/BonusModal/BonusModal";
import OrderPromoModal from "../../Components/Promo/OrderPromoModal/OrderPromoModal";

const NewOrderPage = ({
  userInfoRef,
  toggleUserInfoVisibility,
  addressRef,
  isUserInfoOpen,
  isModalAddressOpen,
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
  isPayTypeOpen,
  payTypeWrapperRef,
  togglePayTypeVisibility,
  toggleAddressVisibility,
  isMainSheetOpen,
  setIsMainSheetOpen,
  mainSheetWrapperRef,
  mainSheetClosing,
  setMainSheetClosing,
  bonusWrapperRef,
  isBonusOpen,
  toggleBonusVisibility,
  toggleOrderPromoVisibility,
  orderPromoWrapperRef,
  isOrderPromoOpen,
  toggleLoginVisibility,
}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            isModal={false}
            mapWrapperRef={mapWrapperRef}
            setIsMapOpen={setIsMapOpen}
            isMapOpen={isMapOpen}
          />
          <OrderCart />
        </div>
        <Payment
          togglePayTypeVisibility={togglePayTypeVisibility}
          toggleOrderPromoVisibility={toggleOrderPromoVisibility}
        />
        {isPayTypeOpen && (
          <div className={styles.cardOverlay}>
            <PayTypeModal
              payTypeWrapperRef={payTypeWrapperRef}
              togglePayTypeVisibility={togglePayTypeVisibility}
            />
          </div>
        )}
        {isOrderPromoOpen && (
          <div className={styles.cardOverlay}>
            <OrderPromoModal
              toggleOrderPromoVisibility={toggleOrderPromoVisibility}
              orderPromoWrapperRef={orderPromoWrapperRef}
            />
          </div>
        )}
      </div>

      <div
        className={`${styles.sheetOverlay} ${
          isMainSheetOpen ? styles.visible : ""
        }`}
      >
        {isMainSheetOpen && (
          <MainSheet
            mainSheetWrapperRef={mainSheetWrapperRef}
            setIsMainSheetOpen={setIsMainSheetOpen}
            mainSheetClosing={mainSheetClosing}
            setMainSheetClosing={setMainSheetClosing}
            navigate={navigate}
            toggleUserInfoVisibility={toggleUserInfoVisibility}
            toggleAddressVisibility={toggleAddressVisibility}
            toggleBonusVisibility={toggleBonusVisibility}
            toggleLoginVisibility={toggleLoginVisibility}
          />
        )}
      </div>

      {isUserInfoOpen && (
        <div className={styles.cardOverlay}>
          <UserModal
            userInfoRef={userInfoRef}
            toggleUserInfoVisibility={toggleUserInfoVisibility}
          />
        </div>
      )}
      {isModalAddressOpen && (
        <div className={styles.cardOverlay}>
          <AddressModal
            addressRef={addressRef}
            isModal={true}
            toggleAddressVisibility={toggleAddressVisibility}
          />
        </div>
      )}
      {isBonusOpen && (
        <div className={styles.cardOverlay}>
          <BonusModal
            bonusWrapperRef={bonusWrapperRef}
            isModal={true}
            toggleBonusVisibility={toggleBonusVisibility}
          />
        </div>
      )}
    </div>
  );
};

export default NewOrderPage;
