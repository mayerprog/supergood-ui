import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.jpg";
import vk from "../../assets/social-networks/vk.png";
import telegram from "../../assets/social-networks/telegram.png";
import discount from "../../assets/social-networks/discount.png";
import phone from "../../assets/social-networks/phone.png";
import { GiShoppingCart } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";

const Header = forwardRef(({ toggleCartVisibility, setSearchQuery }, ref) => {
  const itemsSum = useSelector((state) => state.cart.itemsSum);

  return (
    <header className={styles.header} ref={ref}>
      <img src={logo} alt="" className={styles.logo} />
      <input
        className={styles.input}
        placeholder="Найти блюдо"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => console.log("click")} className={styles.address}>
        <FaLocationDot size={18} color="#BBBBBB" className={styles.icon} />
        <span className={styles.buttonText}>
          Большая Новодмитровская улица, 12с15
        </span>
      </button>
      <div className={styles.socialMedia}>
        <a
          href="https://vk.com/supergoodru"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={vk} alt="vk" />
        </a>
        <a
          href="https://t.me/supergoodru"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={telegram} alt="telegram" />
        </a>
        <a
          href="https://supergood.ru/akcii"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={discount} alt="discount" />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src={phone} alt="phone" className={styles.lastimg} />
        </a>
      </div>
      <button className={styles.cartButton} onClick={toggleCartVisibility}>
        <GiShoppingCart size={25} className={styles.icon} />
        <span className={styles.buttonText}>{itemsSum} ₽</span>
      </button>
      <button className={styles.loginButton}>Войти</button>
    </header>
  );
});

export default Header;
