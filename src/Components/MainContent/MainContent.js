import React from "react";
import styles from "./MainContent.module.scss";
import Item from "./Item/Item";

const MainContent = () => {
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
    <div className={styles.container}>
      <div className={styles.items}>
        {items.map((item, index) => (
          <Item />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
