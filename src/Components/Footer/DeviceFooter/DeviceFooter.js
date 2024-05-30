import styles from "./DeviceFooter.module.scss";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { fetchMinSum } from "../../../services/fetchMinSum";
import paymentType from "../../../paymentType";
import { orderAPI } from "../../../api/orderAPI";

const DeviceFooter = ({
  setIsCartSheetOpen,
  location,
  setCartErrMessage,
  setOrderErrMessage,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemsSum = useSelector((state) => state.cart.itemsSum);
  const addressSelected = useSelector((state) => state.user.addressSelected);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
  const bonus = useSelector((state) => state.order.bonus);
  const minorAreaId = useSelector((state) => state.user.minorAreaId);
  const changeAmount = useSelector((state) => state.order.changeAmount);
  const orderDescription = useSelector((state) => state.order.orderDescription);
  const deliveryTime = useSelector((state) => state.cart.deliveryTime);

  const handleAction = async () => {
    const addressid = addressSelected.addressid.toString();
    const paytype = paymentType.CASH_TO_COURIER;
    const points = parseInt(bonus);
    const minor_area_id = parseInt(minorAreaId);

    try {
      const response = await orderAPI.orderPost({
        token,
        salesid,
        addressid,
        nocontact: 0,
        payamount: itemsSum,
        points,
        changeamount: changeAmount,
        paytype,
        description: orderDescription,
        dlvtime: deliveryTime,
        minor_area_id,
      });
      if (response.status === "error") {
        setOrderErrMessage(response.msg);
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/orders");
  };

  const handleFooterClick = async () => {
    if (location.pathname === "/") {
      setIsCartSheetOpen(true);
    } else {
      await fetchMinSum({
        token,
        salesid,
        cartItems,
        addressSelected,
        dispatch,
        action: handleAction,
        setCartErrMessage,
      });
    }
  };

  return (
    <footer className={styles.footer} onClick={handleFooterClick}>
      <div style={{ display: "flex", flex: "1" }}></div>
      {location.pathname === "/" ? (
        <div className={styles.cart}>
          <GiShoppingCart size={25} className={styles.icon} />
          <h3>Корзина</h3>
        </div>
      ) : (
        <>
          <h3>Оформить заказ</h3>
        </>
      )}
      <span className={styles.buttonText}>{itemsSum} ₽</span>
    </footer>
  );
};

export default DeviceFooter;
