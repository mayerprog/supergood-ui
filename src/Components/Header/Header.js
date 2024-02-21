import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.jpg";
import socialNet from "../../assets/images/socialnetworks.jpg";
import { GiShoppingCart } from "react-icons/gi";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="" className={styles.logo} />
      <input className={styles.input} placeholder="Найти блюдо" />
      <button onClick={() => console.log("click")} className={styles.address}>
        <span className={styles.buttonText}>
          Большая Новодмитровская улица, 12с15
        </span>
      </button>
      <img src={socialNet} alt="" className={styles.socialMedia} />
      <button className={styles.cartButton}>
        <GiShoppingCart size={25} className={styles.icon} />
        <span className={styles.buttonText}>0 р.</span>
      </button>
      <button className={styles.loginButton}>Войти</button>
    </header>
  );
};

export default Header;
