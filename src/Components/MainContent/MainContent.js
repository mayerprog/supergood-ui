import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./MainContent.module.scss";
import Item from "./Item/Item";
import Slider from "./Slider/Slider";
import chorizo from "../../assets/images/chorizo.jpg";
import kolc from "../../assets/images/kolc.jpg";
import minus10 from "../../assets/images/minus10.jpg";
import minus20 from "../../assets/images/minus20.jpg";
import { itemAPI } from "../../api/itemAPI";
import { setItems } from "../../redux/slices/itemSlice";
import Cart from "../Cart/Cart";
import ModalCard from "./ModalCard/ModalCard";
import MapComponent from "../MapComponent/MapComponent";
import ModalOptions from "../ModalOptions/ModalOptions";
import UserInfo from "../UserInfo/UserInfo";
import AddressModal from "../Address/AddressModal/AddressModal";
import ItemsShimmer from "../../Loaders/ItemsShimmer";
import LoginModal from "../Login/LoginModal";

const MainContent = ({
  isCartVisible,
  isCardOpen,
  toggleCardOpen,
  wrapperRef,
  items,
  categories,
  selectedCategory,
  headerHeight,
  setScrolledCategory,
  setSelectedCategory,
  itemCardId,
  cardRef,
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
  userInfoRef,
  isUserInfoOpen,
  toggleUserInfoVisibility,
  addressRef,
  isModalAddressOpen,
  toggleCartVisibility,
  loading,
  isLoginOpen,
  loginWrapperRef,
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

  useEffect(() => {
    console.log("items", items);
  }, [items]);

  const scrollToCategory = useCallback(
    (categoryName) => {
      const element = categoryRefs.current[categoryName];
      if (!element) return;

      const offsetTop =
        element.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    },
    [headerHeight]
  );

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
  }, [selectedCategory, scrollToCategory]);

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
        root: null,
        rootMargin: "-200px 0px -100%", // element intersecting when it reaches top of the viewport.
        threshold: 0,
      }
    );

    // const headings = Object.values(categoryRefs.current);
    const headings = Object.values(categoryRefs.current).filter(
      (el) => el instanceof Element
    );

    headings.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      headings.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [categories, setScrolledCategory, setSelectedCategory]);

  if (loading) {
    return <ItemsShimmer />;
  }

  return (
    <div className={styles.container}>
      {isCartVisible && (
        <div className={styles.overlay}>
          <Cart
            position="absolute"
            top="90px"
            height="calc(100vh - 180px)"
            transform="translateX(-20%)"
            wrapperRef={wrapperRef}
            toggleCartVisibility={toggleCartVisibility}
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
      {isCardOpen && (
        <div className={styles.cardOverlay}>
          <ModalCard itemCardId={itemCardId} cardRef={cardRef} />
        </div>
      )}
      {isMapOpen && (
        <div className={styles.cardOverlay}>
          <MapComponent
            mapWrapperRef={mapWrapperRef}
            setIsMapOpen={setIsMapOpen}
          />
        </div>
      )}
      {isLoginOpen && (
        <div className={styles.cardOverlay}>
          <LoginModal loginWrapperRef={loginWrapperRef} />
        </div>
      )}
      {isUserInfoOpen && (
        <div className={styles.cardOverlay}>
          <UserInfo
            userInfoRef={userInfoRef}
            toggleUserInfoVisibility={toggleUserInfoVisibility}
          />
        </div>
      )}
      {isModalAddressOpen && (
        <div className={styles.cardOverlay}>
          <AddressModal
            addressRef={addressRef}
            marginTop="-170px"
            maxWidth="500px"
            height="none"
            isModal={true}
          />
        </div>
      )}
      {categories.map((category, index) => (
        <div key={index} ref={(el) => (categoryRefs.current[category] = el)}>
          <h2>{category}</h2>
          <div className={styles.items}>
            {items
              .filter((item) => item.catname === category)
              .map((filteredProduct, index) => (
                <Item
                  item={filteredProduct}
                  category={category}
                  toggleCardOpen={toggleCardOpen}
                  key={index}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
