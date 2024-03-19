import { Provider } from "react-redux";
import styles from "./App.module.scss";

import "leaflet/dist/leaflet.css";
import MainPage from "./Pages/MainPage/MainPage";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./HOC/ProtectedRoute";
import NewOrderPage from "./Pages/NewOrderPage/NewOrderPage";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LevelContext from "./contexts/LevelContext";
import { useContext } from "react";

function App() {
  const {
    isModalOptionsOpen,
    isUserInfoOpen,
    isModalAddressOpen,
    optionsRef,
    userInfoRef,
    addressRef,
    toggleOptionsVisibility,
    toggleUserInfoVisibility,
    toggleAddressVisibility,
  } = useContext(LevelContext);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={styles.app}>
          <Header
            isProfile={true}
            //     toggleCartVisibility={toggleCartVisibility}
            //     toggleMapVisibility={toggleMapVisibility}
            //     toggleOptionsVisibility={toggleOptionsVisibility}
            //     ref={headerRef}
            //     setSearchQuery={setSearchQuery}
            //     isModalOptionsOpen={isModalOptionsOpen}
            //     optionsRef={optionsRef}
            //     toggleUserInfoVisibility={toggleUserInfoVisibility}
            //     toggleAddressVisibility={toggleAddressVisibility}
          />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/submit"
              element={
                <ProtectedRoute>
                  <NewOrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
