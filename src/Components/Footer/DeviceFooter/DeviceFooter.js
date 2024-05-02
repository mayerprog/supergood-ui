import styles from "./DeviceFooter.module.scss";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addOrders } from "../../../redux/slices/orderSlice";
import { removeAllItems } from "../../../redux/slices/cartSlice";

const DeviceFooter = ({ setIsCartSheetOpen, location }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemsSum = useSelector((state) => state.cart.itemsSum);
  const addressSelected = useSelector((state) => state.address.addressSelected);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const now = new Date();

  // Formatting the date as DD.MM.YYYY
  const formattedDate =
    now.getDate().toString().padStart(2, "0") +
    "." +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    now.getFullYear().toString();

  // Formatting the time as HH:mm
  const formattedTime =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");

  const handleSetOrderInfo = () => {
    const orderInfoToDispatch = {
      orderId: uuidv4(),
      address: addressSelected,
      noContact: true,
      payAmount: itemsSum,
      payType: "Наличными курьеру",
      status: "Pending",
      date: formattedDate,
      time: formattedTime,
      items: cartItems,
    };
    dispatch(addOrders(orderInfoToDispatch));
    dispatch(removeAllItems());
  };

  const handleFooterClick = () => {
    if (location.pathname === "/") {
      setIsCartSheetOpen(true);
    } else {
      handleSetOrderInfo();
      navigate("/orders");
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
