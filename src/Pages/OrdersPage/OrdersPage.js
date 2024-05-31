import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./OrdersPage.module.scss";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";
import Orders from "../../Components/Orders/Orders";
import UserModal from "../../Components/UserInfo/UserModal/UserModal";
import MainSheet from "../../Components/MainSheet/MainSheet";
import { useNavigate } from "react-router-dom";
import BonusModal from "../../Components/Promo/BonusModal/BonusModal";
import { orderAPI } from "../../api/orderAPI";
import { setOrders, setOrdersItems } from "../../redux/slices/orderSlice";
import { cartAPI } from "../../api/cartAPI";
import ItemsShimmer from "../../Loaders/ItemsShimmer";
import Cookies from "js-cookie";

const OrdersPage = ({
  userInfoRef,
  toggleUserInfoVisibility,
  addressRef,
  isUserInfoOpen,
  isModalAddressOpen,
  toggleAddressVisibility,
  isMainSheetOpen,
  setIsMainSheetOpen,
  mainSheetWrapperRef,
  mainSheetClosing,
  setMainSheetClosing,
  bonusWrapperRef,
  isBonusOpen,
  toggleBonusVisibility,
  toggleLoginVisibility,
}) => {
  const [loading, setLoading] = useState(false);

  const orders = useSelector((state) => state.order.orders);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");

        const data = await orderAPI.getSalesIds({ token });
        console.log("data", data);
        if (data) {
          const salesValues = Object.values(data.sales);
          dispatch(setOrders(salesValues));
          const salesIds = Object.values(data.salesids[0]);
          const ordersItems = [];
          for (let salesId of salesIds) {
            const data = await cartAPI.getOrderInfo({
              token,
              salesid: salesId,
            });
            ordersItems.push(data.sales);
          }
          dispatch(setOrdersItems(ordersItems));
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (loading) {
    return <ItemsShimmer />;
  }

  return (
    <>
      {isAuth && (
        <div className={styles.content}>
          <h2>Мои заказы</h2>
          {!orders.length ? (
            <span>
              Пока нет ваших заказов. Заказать блюда можно
              <a href="/" className={styles.linkStyle}>
                {" "}
                здесь
              </a>
              .
            </span>
          ) : (
            <Orders />
          )}

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
      )}
    </>
  );
};

export default OrdersPage;
