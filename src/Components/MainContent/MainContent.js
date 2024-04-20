import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./MainContent.module.scss";
import Item from "./Item/Item";
import Slider from "./Slider/Slider";

import { itemAPI } from "../../api/itemAPI";
import { setItems } from "../../redux/slices/itemSlice";
import Cart from "../Cart/Cart";
import { useNavigate } from "react-router-dom";
import ModalCard from "./ModalCard/ModalCard";
import MapComponent from "../MapComponent/MapComponent";
import UserInfo from "../UserInfo/UserInfo";
import AddressModal from "../Address/AddressModal/AddressModal";
import ItemsShimmer from "../../Loaders/ItemsShimmer";
import LoginModal from "../Login/LoginModal";
import SearchField from "../Reusables/SearchField/SearchField";
import { useMediaQuery } from "react-responsive";
import { useOutsideHook } from "../../hooks/useOutsideHook";

const MainContent = ({
  isCartVisible,
  wrapperRef,
  items,
  categories,
  selectedCategory,
  headerHeight,
  setScrolledCategory,
  setSelectedCategory,
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
  userInfoRef,
  isUserInfoOpen,
  toggleUserInfoVisibility,
  addressRef,
  isModalAddressOpen,
  toggleCartVisibility,
  isLoginOpen,
  loginWrapperRef,
  toggleLoginVisibility,
  loading,
  toggleMapVisibility,
  setSearchQuery,
}) => {
  const categoryRefs = useRef({});
  const navigate = useNavigate();
  const netbooksMediaQuery = useMediaQuery({ maxWidth: 1024 });

  const [itemCardId, setItemCardId] = useState(null);

  // Item card modal
  const [isCardOpen, setIsCardOpen] = useState(false);
  // Item card sheet

  const cardRef = useRef(null);

  const toggleCardOpen = (itemId) => {
    setIsCardOpen(!isCardOpen);
    setItemCardId(itemId);
  };

  useOutsideHook(cardRef, toggleCardOpen); // to close popup <ModalCard /> clicking outside

  // useEffect(() => {
  //   console.log(
  //     `Компонент MainContent отрисован в ${new Date().toLocaleTimeString()}`
  //   );
  // });

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

  useEffect(() => {
    if (selectedCategory) {
      scrollToCategory(selectedCategory);
    }
  }, [selectedCategory, scrollToCategory]);

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
      {isCartVisible && !netbooksMediaQuery && (
        <div className={styles.overlay}>
          <Cart
            position="absolute"
            top="90px"
            height="calc(100vh - 180px)"
            transform="translateX(-20%)"
            wrapperRef={wrapperRef}
            toggleCartVisibility={toggleCartVisibility}
            navigate={navigate}
          />
        </div>
      )}

      {netbooksMediaQuery && <SearchField setSearchQuery={setSearchQuery} />}

      <Slider />

      {isCardOpen && (
        <div className={styles.cardOverlay}>
          <ModalCard
            itemCardId={itemCardId}
            cardRef={cardRef}
            toggleMapVisibility={toggleMapVisibility}
          />
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
          <LoginModal
            loginWrapperRef={loginWrapperRef}
            toggleLoginVisibility={toggleLoginVisibility}
          />
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
          <AddressModal addressRef={addressRef} isModal={true} />
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
                  toggleMapVisibility={toggleMapVisibility}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
