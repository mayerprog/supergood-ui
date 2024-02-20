import React, { useState } from "react";
import styles from "./Item.module.scss";
import pizza from "../../../assets/images/pizza.jpg";

const Item = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <button className={styles.card}>
      <img className={styles.productImage} src={pizza} alt="Pizza" />
      <div className={styles.productInfo}>
        <span className={styles.productTitle}>
          Пицца Фермерская SG на пышном тесте и другая важная информация
        </span>
        <div className={styles.options}>
          <button className={styles.chosenOption}>Стандартное</button>
          <button className={styles.option}>Тонкое</button>
        </div>
        <div className={styles.options}>
          <button className={styles.option}>26 см</button>
          <button className={styles.chosenOption}>30 см</button>
          <button className={styles.option}>40 см</button>
        </div>
      </div>
      <div className={styles.order}>
        <div className={styles.counter}>
          <button onClick={decrement} className={styles.counterButton}>
            -
          </button>
          <span className={styles.count}>{count}</span>
          <button onClick={increment} className={styles.counterButton}>
            +
          </button>
        </div>
        <div>
          <div className={styles.amount}>920 г.</div>
          <div className={styles.price}>940 р.</div>
        </div>
      </div>
    </button>
  );
};

export default Item;
