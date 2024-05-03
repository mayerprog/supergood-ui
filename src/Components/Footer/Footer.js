import styles from "./Footer.module.scss";
import big_logo from "../../assets/logos/big_logo.png";
import { useNavigate } from "react-router-dom";
import MobileApps from "../Reusables/MobileApps/MobileApps";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";

const Footer = () => {
  const navigate = useNavigate();

  const itemsSum = useSelector((state) => state.cart.itemsSum);

  return (
    <footer className={styles.footer}>
      <img
        src={big_logo}
        alt=""
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <a
            href="https://supergood.ru/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>О компании</span>
          </a>
          <a
            href="https://supergood.ru/delivery-n-pay"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Оплата и доставка</span>
          </a>
          <a
            href="https://supergood.ru/howto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Сделать заказ</span>
          </a>
        </div>
        <div className={styles.info}>
          <a
            href="https://supergood.ru/akcii"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Акции и скидки</span>
          </a>
          <a
            href="https://supergood.ru/contacts"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Контакты</span>
          </a>
        </div>
      </div>
      <MobileApps />
      <h2>+7 (495) 138 0123</h2>
    </footer>
  );
};

export default Footer;
