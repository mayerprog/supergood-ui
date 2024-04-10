import styles from "./Footer.module.scss";
import AppStore from "../../assets/images/App-Store.png";
import GooglePlay from "../../assets/images/Google-Play.png";
import logo from "../../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <img
        src={logo}
        alt=""
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      {/* <div className={styles.infoContainer}>
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
      </div> */}
      {/* <div className={styles.appLinks}>
        <span>С приложением удобнее!</span>
        <div className={styles.images}>
          <a
            href="https://apps.apple.com/ru/app/supergood/id1520374517"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={AppStore} alt="" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.psw.supergood"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={GooglePlay} alt="" />
          </a>
        </div>
      </div>
      <h2>+7 (495) 138 0123</h2> */}
    </footer>
  );
};

export default Footer;
