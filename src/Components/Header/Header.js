import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.jpg";
import socialNet from "../../assets/images/socialnetworks.jpg";
import { GiShoppingCart } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { forwardRef, useState } from "react";
import Cart from "../Cart/Cart";

const Header = forwardRef(({ toggleCartVisibility }, ref) => {
  return (
    <header className={styles.header} ref={ref}>
      <img src={logo} alt="" className={styles.logo} />
      <input className={styles.input} placeholder="Найти блюдо" />
      <button onClick={() => console.log("click")} className={styles.address}>
        <FaLocationDot size={18} color="#BBBBBB" className={styles.icon} />
        <span className={styles.buttonText}>
          Большая Новодмитровская улица, 12с15
        </span>
      </button>
      <img src={socialNet} alt="" className={styles.socialMedia} />
      <button className={styles.cartButton} onClick={toggleCartVisibility}>
        <GiShoppingCart size={25} className={styles.icon} />
        <span className={styles.buttonText}>0 р.</span>
      </button>
      <button className={styles.loginButton}>Войти</button>
    </header>
  );
});

export default Header;
