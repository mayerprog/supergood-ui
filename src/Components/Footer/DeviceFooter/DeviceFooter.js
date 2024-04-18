import styles from "./DeviceFooter.module.scss";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";

const DeviceFooter = ({ setIsCartSheetOpen }) => {
  const navigate = useNavigate();
  const itemsSum = useSelector((state) => state.cart.itemsSum);

  const toggleDeviceCart = () => {
    setIsCartSheetOpen(true);
  };

  return (
    <footer className={styles.footer} onClick={toggleDeviceCart}>
      <div style={{ display: "flex", flex: "1" }}></div>
      <div className={styles.cart}>
        <GiShoppingCart size={25} className={styles.icon} />
        <h3>Корзина</h3>
      </div>
      <span className={styles.buttonText}>{itemsSum} ₽</span>
    </footer>
  );
};

export default DeviceFooter;
