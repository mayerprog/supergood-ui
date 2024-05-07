import styles from "./DeviceFooter.module.scss";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { addOrders } from "../../../redux/slices/orderSlice";
import { removeAllItems } from "../../../redux/slices/cartSlice";
import { handleSetOrderInfo } from "../../../services/handleSetOrderInfo";

const DeviceFooter = ({ setIsCartSheetOpen, location }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemsSum = useSelector((state) => state.cart.itemsSum);
  const addressSelected = useSelector((state) => state.user.addressSelected);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleFooterClick = () => {
    if (location.pathname === "/") {
      setIsCartSheetOpen(true);
    } else {
      handleSetOrderInfo({ cartItems, itemsSum, addressSelected, dispatch });
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
