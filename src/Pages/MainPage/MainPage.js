import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../../Components/Cart/Cart";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./MainPage.module.scss";
import { useMediaQuery } from "react-responsive";
import { useOutsideHook } from "../../hooks/useOutsideHook";
import { updateSum } from "../../redux/slices/cartSlice";

const MainPage = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isModalOptionsOpen, setIsModalOptionsOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [itemCardId, setItemCardId] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0); // State to store header height
  const [scrolledCategory, setScrolledCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const items = useSelector((state) => state.item.items);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const categories = [...new Set(items.map((item) => item.category))]; // Unique categories

  const [searchedItems, setSearchedItems] = useState([]);
  const [searchedCategories, setSearchedCategories] = useState(categories);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const optionsRef = useRef(null);
  const userInfoRef = useRef(null);

  useEffect(() => {
    let filteredItems = searchQuery.trim()
      ? items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : items;

    setSearchedItems(filteredItems);
  }, [searchQuery, items]);

  useEffect(() => {
    let filteredCategories = [
      ...new Set(searchedItems.map((item) => item.category)),
    ];
    setSearchedCategories(filteredCategories);
  }, [searchedItems]);

  useEffect(() => {
    if (searchQuery.trim() && searchedItems.length === 0) {
      setSearchedItems(items);
    }
  }, [searchQuery, items, searchedItems.length]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight); // height of Header
    }
  }, []);

  useEffect(() => {
    if (cartItems) {
      const sum = cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      );
      dispatch(updateSum(sum));
    }
  }, [cartItems, dispatch]);

  const toggleCardOpen = (itemId) => {
    setIsCardOpen(!isCardOpen);
    setItemCardId(itemId);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };
  const toggleMapVisibility = () => {
    setIsMapOpen(!isMapOpen);
  };

  const toggleOptionsVisibility = () => {
    setIsModalOptionsOpen(!isModalOptionsOpen);
  };

  const toggleUserInfoVisibility = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };
  useOutsideHook(wrapperRef, toggleCartVisibility); // to close popup <Cart /> clicking outside
  useOutsideHook(cardRef, toggleCardOpen); // to close popup <ModalCard /> clicking outside
  useOutsideHook(mapWrapperRef, toggleMapVisibility); // to close popup <MapComponent /> clicking outside
  useOutsideHook(optionsRef, toggleOptionsVisibility); // to close popup <ModalOptions /> clicking outside
  useOutsideHook(userInfoRef, toggleUserInfoVisibility, [
    ".MuiDateCalendar-root",
  ]); // to close popup <UserInfo /> clicking outside

  const mediaQuery = useMediaQuery({ maxWidth: 1480 }); // to hide <Cart /> when maxWidth: 1480px

  return (
    <div className={styles.app}>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        toggleMapVisibility={toggleMapVisibility}
        toggleOptionsVisibility={toggleOptionsVisibility}
        ref={headerRef}
        setSearchQuery={setSearchQuery}
      />
      <div className={styles.content}>
        <Sidebar
          categories={searchedCategories}
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
          scrolledCategory={scrolledCategory}
        />

        <MainContent
          items={searchedItems}
          categories={searchedCategories}
          isCartVisible={isCartVisible}
          isCardOpen={isCardOpen}
          toggleCardOpen={toggleCardOpen}
          wrapperRef={wrapperRef}
          cardRef={cardRef}
          selectedCategory={selectedCategory}
          headerHeight={headerHeight}
          setScrolledCategory={setScrolledCategory}
          setSelectedCategory={setSelectedCategory}
          itemCardId={itemCardId}
          searchQuery={searchQuery}
          mapWrapperRef={mapWrapperRef}
          isMapOpen={isMapOpen}
          setIsMapOpen={setIsMapOpen}
          optionsRef={optionsRef}
          isModalOptionsOpen={isModalOptionsOpen}
          toggleOptionsVisibility={toggleOptionsVisibility}
          userInfoRef={userInfoRef}
          isUserInfoOpen={isUserInfoOpen}
          toggleUserInfoVisibility={toggleUserInfoVisibility}
        />
        {!mediaQuery && (
          <Cart
            position="sticky"
            top="105px"
            height="calc(100vh - 180px)"
            transform="none"
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
