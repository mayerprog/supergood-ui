import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MainContent.module.scss";
import Item from "./Item/Item";
import Slider from "./Slider/Slider";
import chorizo from "../../assets/images/chorizo.jpg";
import kolc from "../../assets/images/kolc.jpg";
import minus10 from "../../assets/images/minus10.jpg";
import minus20 from "../../assets/images/minus20.jpg";
import { itemAPI } from "../../api/itemAPI";
import Cart from "../Cart/Cart";

const MainContent = ({
  isCartVisible,
  wrapperRef,
  items,
  categories,
  selectedCategory,
  headerHeight,
  setScrolledCategory,
  setSelectedCategory,
}) => {
  const slides = [
    { image: chorizo, link: "https://supergood.ru/akcii/22" },
    { image: kolc },
    { image: minus10 },
    { image: minus20 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef(null);
  const categoryRefs = useRef({});

  const scrollToCategory = (categoryName) => {
    const element = categoryRefs.current[categoryName];
    const offsetTop =
      element.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

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

  useEffect(() => {
    if (selectedCategory) {
      scrollToCategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const slider = sliderRef.current; // Получаем DOM-элемент
    const handleWheel = (e) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        slideToRight();
      } else {
        slideToLeft();
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
  }, []);

  useEffect(() => {
    const startAutoSlide = () => {
      return setInterval(() => {
        slideToRight();
      }, 4000);
    };

    const interval = startAutoSlide();

    return () => clearInterval(interval);
  }, [slideToRight]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScrolledCategory(entry.target.querySelector("h2")?.textContent);
            setSelectedCategory(null);
          }
        });
      },
      {
        root: null, // observing intersections with the viewport
        rootMargin: "110px",
        threshold: 0.9, // trigger callback when the target is fully visible
      }
    );

    const headings = Object.values(categoryRefs.current);
    headings.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      headings.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [categories]);

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

  return (
    <div className={styles.container}>
      {isCartVisible && (
        <div className={styles.overlay}>
          <Cart
            wrapperRef={wrapperRef}
            position="absolute"
            top="90px"
            height="calc(100vh - 180px)"
            transform="translateX(-20%)"
          />
        </div>
      )}
      <div className={styles.slider} ref={sliderRef}>
        <div className={styles.sliderArrowLeft} onClick={slideToLeft}>
          &#10094;
        </div>
        <Slider slides={slides} currentIndex={currentIndex} />
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
      {categories.map((category, index) => (
        <div key={index} ref={(el) => (categoryRefs.current[category] = el)}>
          <h2>{category}</h2>
          <div className={styles.items}>
            {items
              .filter((item) => item.category === category)
              .map((filteredProduct, index) => (
                <Item item={filteredProduct} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
