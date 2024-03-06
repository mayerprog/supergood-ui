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
  const [itemCardId, setItemCardId] = useState();
  const [headerHeight, setHeaderHeight] = useState(0); // State to store header height
  const [scrolledCategory, setScrolledCategory] = useState(null);

  const items = useSelector((state) => state.item.items);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const categories = [...new Set(items.map((item) => item.category))]; // Unique categories
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);

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
  }, [cartItems]);

  const toggleCardOpen = (itemId) => {
    setIsCardOpen(!isCardOpen);
    setItemCardId(itemId);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };
  useOutsideHook([wrapperRef, headerRef], toggleCartVisibility); // to close popup <Cart /> clicking outside
  useOutsideHook([cardRef, headerRef], toggleCardOpen); // to close popup <ModalCard /> clicking outside

  const mediaQuery = useMediaQuery({ maxWidth: 1480 }); // to hide <Cart /> when maxWidth: 1480px

  return (
    <div className={styles.app}>
      <Header toggleCartVisibility={toggleCartVisibility} ref={headerRef} />
      <div className={styles.content}>
        <Sidebar
          categories={categories}
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
          scrolledCategory={scrolledCategory}
        />
        <MainContent
          isCartVisible={isCartVisible}
          isCardOpen={isCardOpen}
          toggleCardOpen={toggleCardOpen}
          wrapperRef={wrapperRef}
          cardRef={cardRef}
          items={items}
          categories={categories}
          selectedCategory={selectedCategory}
          headerHeight={headerHeight}
          setScrolledCategory={setScrolledCategory}
          setSelectedCategory={setSelectedCategory}
          itemCardId={itemCardId}
        />
        {!mediaQuery && (
          <Cart
            position="sticky"
            top="105px"
            height="calc(100vh - 150px)"
            transform="none"
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
