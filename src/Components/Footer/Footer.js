import styles from "./Footer.module.scss";
import logo from "../../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  let navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <img
        src={logo}
        alt=""
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span>О компании</span>
          <span>Оплата и доставка</span>
          <span>Сделать заказ</span>
        </div>
        <div className={styles.info}>
          <span>Акции и скидки</span>
          <span>Контакты</span>
        </div>
      </div>
      <p>Author: Hege Refsnes</p>
      <p>
        <a href="mailto:hege@example.com">hege@example.com</a>
      </p>
    </footer>
  );
};

export default Footer;
