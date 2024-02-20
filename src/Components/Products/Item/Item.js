import React, { useState } from "react";
import styles from "./Item.module.scss";
import pizza from "../../../assets/images/pizza.jpg";

const Item = () => {
  const [count, setCount] = useState(1);
  const [type, setType] = useState("Стандартное");
  const [size, setSize] = useState("30 см");

  const chooseType = (type) => {
    setType(type);
  };

  const chooseSize = (sizeOption) => {
    setSize(sizeOption);
  };

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
          {["Стандартное", "Тонкое"].map((option) => (
            <button
              key={option}
              className={type === option ? styles.chosenOption : styles.option}
              onClick={() => chooseType(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className={styles.options}>
          {["26 см", "30 см", "40 см"].map((option) => (
            <button
              key={option}
              className={size === option ? styles.chosenOption : styles.option}
              onClick={() => chooseSize(option)}
            >
              {option}
            </button>
          ))}
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
