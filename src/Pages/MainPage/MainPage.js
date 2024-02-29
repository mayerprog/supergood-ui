import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Cart from "../../Components/Cart/Cart";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./MainPage.module.scss";
import { useMediaQuery } from "react-responsive";
import { useOutsideHook } from "../../hooks/useOutsideHook";

const MainPage = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0); // State to store header height

  const items = useSelector((state) => state.item.items);
  const categories = [...new Set(items.map((item) => item.category))]; // Unique categories
  const [selectedCategory, setSelectedCategory] = useState(null);

  const wrapperRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight); // height of Header
    }
  }, []);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };
  useOutsideHook([wrapperRef, headerRef], toggleCartVisibility); // to close popup <Cart /> clicking outside

  const mediaQuery = useMediaQuery({ maxWidth: 1480 }); // to hide <Cart /> when maxWidth: 1480px

  return (
    <div className={styles.app}>
      <Header toggleCartVisibility={toggleCartVisibility} ref={headerRef} />
      <div className={styles.content}>
        <Sidebar
          categories={categories}
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <MainContent
          isCartVisible={isCartVisible}
          toggleCartVisibility={toggleCartVisibility}
          wrapperRef={wrapperRef}
          items={items}
          categories={categories}
          selectedCategory={selectedCategory}
          headerHeight={headerHeight}
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
