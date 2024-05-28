import styles from "./DeviceFooter.module.scss";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { handleSetOrderInfo } from "../../../services/handleSetOrderInfo";
import { fetchMinSum } from "../../../services/fetchMinSum";

const DeviceFooter = ({ setIsCartSheetOpen, location }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemsSum = useSelector((state) => state.cart.itemsSum);
  const addressSelected = useSelector((state) => state.user.addressSelected);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);

  const handleAction = () => {
    handleSetOrderInfo({ cartItems, itemsSum, addressSelected, dispatch });
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
