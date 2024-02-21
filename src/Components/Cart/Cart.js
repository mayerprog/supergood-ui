import styles from "./Cart.module.scss";
import pizza from "../../assets/images/pizza.jpg";
import AddItemBox from "../AddItemBox.js/AddItemBox";
import { useState } from "react";

const Cart = () => {
  const [count, setCount] = useState(100);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <span className={styles.cartTitle}>Корзина</span>
        <span className={styles.deleteTitle}>Очистить</span>
      </div>
      <div className={styles.cartBox}>
        <img className={styles.cartImage} src={pizza} alt="Pizza" />
        <div className={styles.cartBoxText}>
          <span className={styles.text}>
            Пицца Фермерская SG на пышном тесте и другая важная информация
          </span>
          <div>
            <span>940 р.</span>
            &nbsp;|&nbsp;
            <span>920 г.</span>
          </div>
        </div>
        <AddItemBox
          count={count}
          increment={increment}
          decrement={decrement}
          backgroundColor="#fcfcfc"
          boxShadow="0 0 2px rgba(0, 0, 0, 0.2)"
          width="5em"
          color="#5f5f5f"
        />
      </div>
      <div className={styles.button}>
        <button className={styles.buttonStyle}>
          <span className={styles.buttonText}>Оформить заказ</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
