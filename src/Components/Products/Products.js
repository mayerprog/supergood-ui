import React from "react";
import styles from "./Products.module.scss";
import Item from "./Item/Item";

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

  return (
    <div className={styles.products}>
      {items.map((item, index) => (
        <Item />
      ))}
    </div>
  );
};

export default Products;
