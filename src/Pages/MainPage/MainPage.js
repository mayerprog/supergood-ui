import { useState } from "react";
import Cart from "../../Components/Cart/Cart";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./MainPage.module.scss";
import { useMediaQuery } from "react-responsive";

const MainPage = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };
  const mediaQuery = useMediaQuery({ maxWidth: 1480 });

  return (
    <div className={styles.app}>
      <Header toggleCartVisibility={toggleCartVisibility} />
      <div className={styles.content}>
        <Sidebar />
        <MainContent isCartVisible={isCartVisible} />
        {!mediaQuery && <Cart />}
      </div>
    </div>
  );
};

export default MainPage;
