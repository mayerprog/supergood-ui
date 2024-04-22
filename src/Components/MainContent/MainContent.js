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
import AddressModal from "../Address/AddressModal/AddressModal";
import ItemsShimmer from "../../Loaders/ItemsShimmer";
import LoginModal from "../Login/LoginModal";
import SearchField from "../Reusables/SearchField/SearchField";
import { useMediaQuery } from "react-responsive";
import { useOutsideHook } from "../../hooks/useOutsideHook";
import ItemSheet from "./ItemSheet/ItemSheet";
import UserModal from "../UserInfo/UserModal/UserModal";
import UserScreen from "../UserInfo/UserScreen/UserScreen";
import AddressScreen from "../Address/AddressScreen/AddressScreen";

const MainContent = ({
  isCartVisible,
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
  toggleAddressVisibility,
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
  const [isItemSheetOpen, setIsItemSheetOpen] = useState(false);
  const [itemSheetClosing, setItemSheetClosing] = useState(false);

  const cardRef = useRef(null);
  const cartWrapperRef = useRef(null);
  const itemSheetWrapperRef = useRef(null);

  const toggleItemOpen = (itemId) => {
    //if monitors then card modal is open, else - card sheet is open
    if (!netbooksMediaQuery) {
      setIsCardOpen(true);
      setItemCardId(itemId);
    } else {
      setIsItemSheetOpen(true);
      setItemCardId(itemId);
    }
  };

  const toggleModalCardVisibility = () => {
    setIsCardOpen(false);
  };

  const toggleItemSheetVisibility = () => {
    setItemSheetClosing(true);
  };
  useOutsideHook(cartWrapperRef, toggleCartVisibility); // to close popup <Cart /> clicking outside
  useOutsideHook(cardRef, toggleModalCardVisibility); // to close popup <ModalCard /> clicking outside
  useOutsideHook(itemSheetWrapperRef, toggleItemSheetVisibility); // to close <ItemSheet /> clicking outside

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
            cartWrapperRef={cartWrapperRef}
            toggleCartVisibility={toggleCartVisibility}
            navigate={navigate}
          />
        </div>
      )}

      {netbooksMediaQuery && <SearchField setSearchQuery={setSearchQuery} />}

      <Slider />

      {isCardOpen && !netbooksMediaQuery && (
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
      {isUserInfoOpen && !netbooksMediaQuery && (
        <div className={styles.cardOverlay}>
          <UserModal
            userInfoRef={userInfoRef}
            toggleUserInfoVisibility={toggleUserInfoVisibility}
          />
        </div>
      )}
      {isUserInfoOpen && netbooksMediaQuery && (
        <div className={styles.cardOverlay}>
          <UserScreen toggleUserInfoVisibility={toggleUserInfoVisibility} />
        </div>
      )}
      {isModalAddressOpen && (
        <div className={styles.cardOverlay}>
          <AddressModal addressRef={addressRef} isModal={true} />
        </div>
      )}
      {isModalAddressOpen && netbooksMediaQuery && (
        <div className={styles.cardOverlay}>
          <AddressScreen
            isModal={true}
            toggleAddressVisibility={toggleAddressVisibility}
            addressRef={addressRef}
          />
        </div>
      )}
      {netbooksMediaQuery && (
        <>
          <div
            className={`${styles.sheetOverlay} ${
              isItemSheetOpen ? styles.visible : ""
            }`}
            data-is-cart="true"
          >
            {isItemSheetOpen && (
              <ItemSheet
                navigate={navigate}
                setItemSheetClosing={setItemSheetClosing}
                setIsItemSheetOpen={setIsItemSheetOpen}
                itemSheetWrapperRef={itemSheetWrapperRef}
                itemSheetClosing={itemSheetClosing}
                itemCardId={itemCardId}
                toggleMapVisibility={toggleMapVisibility}
              />
            )}
          </div>
        </>
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
                  toggleItemOpen={toggleItemOpen}
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
