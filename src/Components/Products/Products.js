import React, { useState } from "react";
import styles from "./Products.module.scss";
import pizza from "../../assets/images/pizza.jpg";

const Products = () => {
  const items = [
    "Пиццы",
    "Комбо",
    "Закуски",
    "Напитки",
    "Коктейли",
    "Кофе",
    "Десерты",
    "Соусы",
    "Другие товары",
    "Акции",
    "Пицца вот такая вот еще",
    "Еще бургеры вот тут есть",
    "Еще напитки",
    "Еще акции",
  ];

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
    <div className={styles.products}>
      {items.map((item, index) => (
        <button className={styles.card}>
          {item}
          <img className={styles.productImage} src={pizza} alt="Pizza" />
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>
              Пицца Фермерская SG на пышном тесте
            </h2>
            <div className={styles.options}>
              <button className={styles.option}>Стандартное</button>
              <button className={styles.option}>Тонкое</button>
            </div>
            <div className={styles.sizes}>
              <button className={styles.size}>26 см</button>
              <button className={styles.size}>30 см</button>
              <button className={styles.size}>40 см</button>
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
            <div className={styles.price}>940 р.</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Products;
