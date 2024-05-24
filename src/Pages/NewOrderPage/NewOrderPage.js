import { useEffect, useState } from "react";
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
import { orderAPI } from "../../api/orderAPI";

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
  const [errMessage, setErrMessage] = useState("");
  const [itemsUnavailable, setItemsUnavailable] = useState([]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
  const addressSelected = useSelector((state) => state.user.addressSelected);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (cartItems.length === 0) {
        navigate("/");
      } else {
        try {
          const response = await orderAPI.getMinSum({
            token,
            salesid,
            addressid: addressSelected.addressid,
          });
          if (response.errorcode) {
            if (response.errorcode === 200) {
              setErrMessage(response.msg);
              const errorItems = response.params.items;

              const foundItems = cartItems.filter((cartItem) =>
                errorItems.some(
                  (errorItem) => errorItem.itemid === cartItem.itemid
                )
              );
              setItemsUnavailable(foundItems);
            }
            setErrMessage(response.msg);
          } else {
            setItemsUnavailable("");
            setErrMessage("");
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
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
          <OrderCart
            errMessage={errMessage}
            itemsUnavailable={itemsUnavailable}
          />
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
