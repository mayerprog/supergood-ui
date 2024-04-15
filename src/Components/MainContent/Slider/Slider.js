import styles from "./Slider.module.scss";
import chorizo from "../../../assets/images/chorizo.jpg";
import kolc from "../../../assets/images/kolc.jpg";
import minus10 from "../../../assets/images/minus10.jpg";
import minus20 from "../../../assets/images/minus20.jpg";
import { useCallback, useEffect, useRef, useState } from "react";

const Slider = ({}) => {
  const slides = [
    { image: chorizo, link: "https://supergood.ru/akcii/22" },
    { image: kolc },
    { image: minus10 },
    { image: minus20 },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const slideToRight = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const slideToLeft = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  }, [slides.length]);

  const handleIndicatorClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      slideToRight();
    }, 4000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []); // empty dependency array means this runs once on mount and cleanup on unmount

  //for wheeling the slider
  // useEffect(() => {
  //   const slider = sliderRef.current; // Получаем DOM-элемент
  //   const handleWheel = (e) => {
  //     e.preventDefault();

  //     if (e.deltaY > 0) {
  //       slideToRight();
  //     } else {
  //       slideToLeft();
  //     }
  //   };

  //   // Добавляем обработчик события
  //   if (slider) {
  //     slider.addEventListener("wheel", handleWheel, { passive: false });
  //   }

  //   // Убираем обработчик события при размонтировании компонента
  //   return () => {
  //     if (slider) {
  //       slider.removeEventListener("wheel", handleWheel);
  //     }
  //   };
  // }, [slideToRight, slideToLeft, sliderRef]);

  return (
    <>
      <div className={styles.slider} ref={sliderRef}>
        <div className={styles.sliderArrowLeft} onClick={slideToLeft}>
          &#10094;
        </div>
        {/* <Slider slides={slides} currentIndex={currentIndex} /> */}
        <div className={styles.container}>
          <img
            src={slides[currentIndex].image}
            alt={`Slide ${currentIndex + 1}`}
            className={styles.bannerImg}
            onClick={() => window.open(slides[currentIndex].link, "_blank")}
          />
        </div>
        <div className={styles.sliderArrowRight} onClick={slideToRight}>
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
    </>
  );
};

export default Slider;
