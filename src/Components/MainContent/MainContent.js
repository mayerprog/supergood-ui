import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./MainContent.module.scss";
import Item from "./Item/Item";
import Slider from "./Slider/Slider";
import chorizo from "../../assets/images/chorizo.jpg";
import kolc from "../../assets/images/kolc.jpg";
import minus10 from "../../assets/images/minus10.jpg";
import minus20 from "../../assets/images/minus20.jpg";
import { itemAPI } from "../../api/itemAPI";

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

  const slides = useMemo(
    () => [
      { image: chorizo, link: "https://supergood.ru/akcii/22" },
      { image: kolc },
      { image: minus10 },
      { image: minus20 },
    ],
    []
  );

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

  // const items = useSelector((state) => state.task.items);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const getItems = await itemAPI.getItems();
  //       // dispatch(setItems(getItems));
  //       console.log("itemAPI", getItems);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
  //         .then((response) => {
  //           console.log("response", response);
  //           if (response.ok) {
  //             return response.json(); // Parse the response data as JSON
  //           } else {
  //             throw new Error("API request failed");
  //           }
  //         })
  //         .then((data) => {
  //           // Process the response data here
  //           console.log(data); // Example: Logging the data to the console
  //         })
  //         .catch((error) => {
  //           // Handle any errors here
  //           console.error(error); // Example: Logging the error to the console
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.slider} ref={sliderRef}>
        <div
          className={styles.sliderArrowLeft}
          onClick={() =>
            setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          }
        >
          &#10094;
        </div>
        <Slider slides={slides} currentIndex={currentIndex} />
        <div
          className={styles.sliderArrowRight}
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              Math.min(prevIndex + 1, slides.length - 1)
            )
          }
        >
          &#10095;
        </div>
      </div>
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => handleIndicatorClick(index)}
          ></span>
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