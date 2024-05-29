import { useContext, useEffect, useState } from "react";
import styles from "./NewOrderPage.module.scss";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";
import OrderCart from "../../Components/Cart/OrderCart/OrderCart";
import Payment from "../../Components/Payment/Payment";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PayTypeModal from "../../Components/Payment/PayTypeModal/PayTypeModal";
import UserModal from "../../Components/UserInfo/UserModal/UserModal";
import { useMediaQuery } from "react-responsive";
import MainSheet from "../../Components/MainSheet/MainSheet";
import BonusModal from "../../Components/Promo/BonusModal/BonusModal";
import OrderPromoModal from "../../Components/Promo/OrderPromoModal/OrderPromoModal";
import { orderAPI } from "../../api/orderAPI";
import ModalsContext from "../../contexts/ModalsContext";
import PromoErrorModal from "../../Components/Promo/PromoErrorModal/PromoErrorModal";
import ItemsShimmer from "../../Loaders/ItemsShimmer";
import { setItemsUnavailable } from "../../redux/slices/cartSlice";

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
  loading,
  cartErrMessage,
  setCartErrMessage,
  orderErrMessage,
  setOrderErrMessage,
}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsUnavailable = useSelector((state) => state.cart.itemsUnavailable);
  const orders = useSelector((state) => state.order.orders);

  const { isPromoErrorOpen } = useContext(ModalsContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAction = () => {
    dispatch(setItemsUnavailable(""));
    setCartErrMessage("");
  };

  useEffect(() => {
    if (cartItems.length === 0 && orders.length === 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, orders]);

  if (loading) {
    return <ItemsShimmer />;
  }
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
          <OrderCart
            cartErrMessage={cartErrMessage}
            itemsUnavailable={itemsUnavailable}
          />
        </div>
        <Payment
          togglePayTypeVisibility={togglePayTypeVisibility}
          toggleOrderPromoVisibility={toggleOrderPromoVisibility}
          setCartErrMessage={setCartErrMessage}
          orderErrMessage={orderErrMessage}
          setOrderErrMessage={setOrderErrMessage}
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
      {isPromoErrorOpen && (
        <div className={styles.cardOverlay}>
          <PromoErrorModal />
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
