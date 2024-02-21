import styles from "./Cart.module.scss";
import pizza from "../../assets/images/pizza.jpg";
import AddItemBox from "../AddItemBox.js/AddItemBox";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";

const Cart = () => {
  const [count, setCount] = useState(0);

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
            <span>920 г.</span>
          </div>
        </div>
        <button className={styles.counter}>
          <button onClick={decrement} className={styles.counterButton}>
            <AiOutlineMinus />
          </button>
          <span className={styles.count}>{count}</span>
          <button onClick={increment} className={styles.counterButton}>
            <AiOutlinePlus />
          </button>
        </button>
      </div>
    </div>
  );
};

export default Cart;
