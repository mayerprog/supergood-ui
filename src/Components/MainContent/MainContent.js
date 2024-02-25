import React, { useEffect, useRef, useState } from "react";
import styles from "./MainContent.module.scss";
import Item from "./Item/Item";
import Slider from "./Slider/Slider";
import chorizo from "../../assets/images/chorizo.jpg";
import kolc from "../../assets/images/kolc.jpg";
import minus10 from "../../assets/images/minus10.jpg";
import minus20 from "../../assets/images/minus20.jpg";

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
    { image: chorizo, link: "https://supergood.ru/akcii/22" },
    { image: kolc },
    { image: minus10 },
    { image: minus20 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current; // Получаем DOM-элемент
    const handleWheel = (e) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        setCurrentIndex((prevIndex) =>
          Math.min(prevIndex + 1, slides.length - 1)
        );
      } else {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
    };

    // Добавляем обработчик события
    if (slider) {
      slider.addEventListener("wheel", handleWheel, { passive: false });
    }

    // Убираем обработчик события при размонтировании компонента
    return () => {
      if (slider) {
        slider.removeEventListener("wheel", handleWheel);
      }
    };
  }, [slides]);

  return (
    <div className={styles.container}>
      <div className={styles.slider} ref={sliderRef}>
        <Slider slides={slides} currentIndex={currentIndex} />
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
