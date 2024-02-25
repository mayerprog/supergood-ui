import React, { useEffect, useState } from "react";
import styles from "./Item.module.scss";
import pizza from "../../../assets/images/pizza.jpg";
import AddItemBox from "../../AddItemBox.js/AddItemBox";

// import { setItems } from "../../../redux/slices/itemSlice";

const Item = () => {
  const [count, setCount] = useState(0);
  const [type, setType] = useState("Стандартное");
  const [size, setSize] = useState("30 см");
  const types = ["Стандартное", "Тонкое"];
  const sizes = ["26 см", "30 см", "40 см"];

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
    setCount(count - 1);
  };

  return (
    <button className={styles.card}>
      <img className={styles.productImage} src={pizza} alt="Pizza" />
      <div className={styles.productInfo}>
        <span className={styles.productTitle}>
          Пицца Фермерская SG на пышном тесте и другая важная информация
        </span>
        <div className={styles.options}>
          {types.map((option) => (
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
          {sizes.map((option) => (
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
        {count >= 1 ? (
          <AddItemBox
            count={count}
            increment={increment}
            decrement={decrement}
            margin="0 0.5rem"
          />
        ) : (
          <button className={styles.counter} onClick={increment}>
            <span className={styles.count}>Добавить</span>
          </button>
        )}
        <div>
          <div className={styles.amount}>920 г.</div>
          <div className={styles.price}>940 р.</div>
        </div>
      </div>
    </button>
  );
};

export default Item;
