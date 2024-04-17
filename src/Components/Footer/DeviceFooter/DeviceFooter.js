import styles from "./DeviceFooter.module.scss";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";

const DeviceFooter = ({ setIsCartSheetOpen }) => {
  const navigate = useNavigate();

  const itemsSum = useSelector((state) => state.cart.itemsSum);

  return (
    <footer className={styles.footer}>
      {/* <div className={styles.cartFooterContainer}> */}
      <div style={{ display: "flex", flex: "1" }}></div>
      <div className={styles.cart}>
        <GiShoppingCart size={25} className={styles.icon} />
        <h3>Корзина</h3>
      </div>
      <span className={styles.buttonText}>{itemsSum} ₽</span>
      {/* </div> */}
    </footer>
  );
};

export default DeviceFooter;
