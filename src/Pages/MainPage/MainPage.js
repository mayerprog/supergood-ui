import Cart from "../../Components/Cart/Cart";
import Header from "../../Components/Header/Header";
import Products from "../../Components/Products/Products";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar />
        <Products />
        <Cart />
      </div>
    </div>
  );
};

export default MainPage;
