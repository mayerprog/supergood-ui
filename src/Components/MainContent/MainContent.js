import React from "react";
import styles from "./MainContent.module.scss";
import Item from "./Item/Item";
import Slider from "./Slider/Slider";
import chorizo from "../../assets/images/chorizo.jpg";
import kolc from "../../assets/images/kolc.jpg";
import minus10 from "../../assets/images/minus10.jpg";
import minus20 from "../../assets/images/minus20.jpg";
import promo_mob from "../../assets/images/promo_mob.png";

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

  const slides = [
    { image: chorizo },
    // { image: kolc },
    // { image: minus10 },
    // { image: minus20 },
    // { image: promo_mob },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {slides.map((slide, index) => (
          <Slider slide={slide} index={index} />
        ))}
      </div>

      <div className={styles.items}>
        {items.map((item, index) => (
          <Item />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
