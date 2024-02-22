import Cart from "../../Components/Cart/Cart";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <MainContent />
        <Cart />
      </div>
    </div>
  );
};

export default MainPage;
