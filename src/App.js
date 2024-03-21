import { Provider } from "react-redux";
import styles from "./App.module.scss";

import "leaflet/dist/leaflet.css";
import MainPage from "./Pages/MainPage/MainPage";
import { store } from "./redux/store";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./HOC/ProtectedRoute";
import NewOrderPage from "./Pages/NewOrderPage/NewOrderPage";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { useEffect, useRef, useState } from "react";
import { useOutsideHook } from "./hooks/useOutsideHook";

function App() {
  const [isModalOptionsOpen, setIsModalOptionsOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMainPage, setIsMainPage] = useState(false);

  const headerRef = useRef(null);
  const optionsRef = useRef(null);
  const userInfoRef = useRef(null);
  const addressRef = useRef(null);
  const mapWrapperRef = useRef(null);

  const toggleOptionsVisibility = () => {
    setIsModalOptionsOpen(!isModalOptionsOpen);
  };
  const toggleUserInfoVisibility = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };
  const toggleAddressVisibility = () => {
    setIsModalAddressOpen(!isModalAddressOpen);
  };

  const toggleCartVisibility = (isVisible) => {
    setIsCartVisible(isVisible);
  };
  const toggleMapVisibility = () => {
    setIsMapOpen(!isMapOpen);
  };

  useOutsideHook(mapWrapperRef, toggleMapVisibility); // to close popup <MapComponent /> clicking outside
  useOutsideHook(optionsRef, toggleOptionsVisibility); // to close popup <ModalOptions /> clicking outside
  useOutsideHook(userInfoRef, toggleUserInfoVisibility, [
    ".MuiDateCalendar-root",
  ]); // to close popup <UserInfo /> clicking outside
  useOutsideHook(addressRef, toggleAddressVisibility); // to close popup <AddressModal /> clicking outside

  const location = useLocation(); // Getting the current location

  useEffect(() => {
    setIsMainPage(location.pathname === "/");
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Header
          isMainPage={isMainPage}
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
                mapWrapperRef={mapWrapperRef}
              />
            }
          />
          <Route
            path="/submit"
            element={
              <ProtectedRoute>
                <NewOrderPage
                  userInfoRef={userInfoRef}
                  toggleUserInfoVisibility={toggleUserInfoVisibility}
                  addressRef={addressRef}
                  isUserInfoOpen={isUserInfoOpen}
                  isModalAddressOpen={isModalAddressOpen}
                  mapWrapperRef={mapWrapperRef}
                  setIsMapOpen={setIsMapOpen}
                  isMapOpen={isMapOpen}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage
                  userInfoRef={userInfoRef}
                  toggleUserInfoVisibility={toggleUserInfoVisibility}
                  addressRef={addressRef}
                  isUserInfoOpen={isUserInfoOpen}
                  isModalAddressOpen={isModalAddressOpen}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
