import { useEffect, useRef, useState } from "react";
import Cart from "../../Components/Cart/Cart";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./MainPage.module.scss";
import { useMediaQuery } from "react-responsive";
import { useOutsideHook } from "../../hooks/useOutsideHook";

const MainPage = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const wrapperRef = useRef(null);
  const headerRef = useRef(null);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };
  useOutsideHook([wrapperRef, headerRef], toggleCartVisibility);

  const mediaQuery = useMediaQuery({ maxWidth: 1480 });

  return (
    <div className={styles.app}>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        headerRef={headerRef}
      />
      <div className={styles.content}>
        <Sidebar />
        <MainContent
          isCartVisible={isCartVisible}
          toggleCartVisibility={toggleCartVisibility}
          wrapperRef={wrapperRef}
        />
        {!mediaQuery && <Cart />}
      </div>
    </div>
  );
};

export default MainPage;
