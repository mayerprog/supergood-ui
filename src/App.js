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
import { useRef, useState } from "react";

function App() {
  const [isModalOptionsOpen, setIsModalOptionsOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const headerRef = useRef(null);
  const optionsRef = useRef(null);
  const userInfoRef = useRef(null);
  const addressRef = useRef(null);

  const toggleOptionsVisibility = () => {
    setIsModalOptionsOpen(!isModalOptionsOpen);
  };
  const toggleUserInfoVisibility = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };
  const toggleAddressVisibility = () => {
    setIsModalAddressOpen(!isModalAddressOpen);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };
  const toggleMapVisibility = () => {
    setIsMapOpen(!isMapOpen);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={styles.app}>
          <Header
            isProfile={false}
            toggleCartVisibility={toggleCartVisibility}
            toggleMapVisibility={toggleMapVisibility}
            toggleOptionsVisibility={toggleOptionsVisibility}
            ref={headerRef}
            setSearchQuery={setSearchQuery}
            isModalOptionsOpen={isModalOptionsOpen}
            optionsRef={optionsRef}
            toggleUserInfoVisibility={toggleUserInfoVisibility}
            toggleAddressVisibility={toggleAddressVisibility}
          />
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  searchQuery={searchQuery}
                  headerRef={headerRef}
                  toggleCartVisibility={toggleCartVisibility}
                  isCartVisible={isCartVisible}
                  isMapOpen={isMapOpen}
                  setIsMapOpen={setIsMapOpen}
                  toggleMapVisibility={toggleMapVisibility}
                  isUserInfoOpen={isUserInfoOpen}
                  isModalAddressOpen={isModalAddressOpen}
                  optionsRef={optionsRef}
                  userInfoRef={userInfoRef}
                  addressRef={addressRef}
                  toggleOptionsVisibility={toggleOptionsVisibility}
                  toggleUserInfoVisibility={toggleUserInfoVisibility}
                  toggleAddressVisibility={toggleAddressVisibility}
                />
              }
            />
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
