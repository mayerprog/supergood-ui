import { Provider, useDispatch, useSelector } from "react-redux";
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
import { useMediaQuery } from "react-responsive";
import {
  addAddress,
  setAddressSelected,
  updateSelected,
} from "./redux/slices/addressSlice";

function App() {
  const [isModalOptionsOpen, setIsModalOptionsOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPayTypeOpen, setIsPayTypeOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isMainPage, setIsMainPage] = useState(false);

  const headerRef = useRef(null);
  const optionsRef = useRef(null);
  const userInfoRef = useRef(null);
  const addressRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const loginWrapperRef = useRef(null);
  const payTypeWrapperRef = useRef(null);

  // to show <Cart /> and to disable Cart button in Header when width > 1480px
  const mediaQuery = useMediaQuery({ maxWidth: 1280 });
  const headerFooterMediaQuery = useMediaQuery({ maxWidth: 1099 });

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
    if (!mediaQuery) setIsCartVisible(false);
    else setIsCartVisible(isVisible);
  };
  const toggleMapVisibility = () => {
    setIsMapOpen(!isMapOpen);
  };

  const toggleLoginVisibility = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const togglePayTypeVisibility = () => {
    setIsPayTypeOpen(!isPayTypeOpen);
  };

  useOutsideHook(mapWrapperRef, toggleMapVisibility); // to close popup <MapComponent /> clicking outside
  useOutsideHook(optionsRef, toggleOptionsVisibility); // to close popup <ModalOptions /> clicking outside
  useOutsideHook(userInfoRef, toggleUserInfoVisibility, [
    ".MuiDateCalendar-root",
  ]); // to close popup <UserInfo /> clicking outside
  useOutsideHook(addressRef, toggleAddressVisibility); // to close popup <AddressModal /> clicking outside
  useOutsideHook(loginWrapperRef, toggleLoginVisibility); // to close popup <LoginModal /> clicking outside
  useOutsideHook(payTypeWrapperRef, togglePayTypeVisibility); // to close popup <LoginModal /> clicking outside

  const location = useLocation(); // Getting the current location

  const dispatch = useDispatch();

  const addressList = useSelector((state) => state.address.addressList);
  const addressSelected = useSelector((state) => state.address.addressSelected);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // we find here address with selected: true to display it all over the app
  useEffect(() => {
    const selectedAddress = addressList.filter((address) => address.selected);
    // if no selected addresses then make first address selected (additional validation)
    if (selectedAddress.length === 0 && addressList.length > 0)
      dispatch(updateSelected(0));
    if (selectedAddress.length > 0)
      dispatch(setAddressSelected(selectedAddress[0].address));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressList]);

  // add address which saved in redux persist to addressList
  useEffect(() => {
    if (addressSelected && addressList.length === 0) {
      dispatch(addAddress({ address: addressSelected, selected: true }));
    }
  }, [addressSelected, addressList.length, dispatch]);

  useEffect(() => {
    setIsMainPage(location.pathname === "/");
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    console.log("cartItems", cartItems);
  }, [cartItems]);

  return (
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
        toggleLoginVisibility={toggleLoginVisibility}
        headerFooterMediaQuery={headerFooterMediaQuery}
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
              mediaQuery={mediaQuery}
              isLoginOpen={isLoginOpen}
              loginWrapperRef={loginWrapperRef}
              toggleLoginVisibility={toggleLoginVisibility}
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
                isPayTypeOpen={isPayTypeOpen}
                payTypeWrapperRef={payTypeWrapperRef}
                togglePayTypeVisibility={togglePayTypeVisibility}
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
      <Footer headerFooterMediaQuery={headerFooterMediaQuery} />
    </div>
  );
}

export default App;
