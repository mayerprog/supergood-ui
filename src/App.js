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
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useOutsideHook } from "./hooks/useOutsideHook";
import { useMediaQuery } from "react-responsive";
import {
  addAddress,
  setAddressList,
  setAddressSelected,
  setSalesid,
  setToken,
  setUserData,
  updateSelected,
} from "./redux/slices/userSlice";
import DeviceFooter from "./Components/Footer/DeviceFooter/DeviceFooter";
import { fetchCoordinatesForAddress } from "./services/fetchCoordinatesForAddress";
import LevelContext from "./contexts/LevelContext";
import LoyaltyPage from "./Pages/LoyaltyPage/LoyaltyPage";
import { setIsAuth } from "./redux/slices/authSlice";
import { userAPI } from "./api/userAPI";
import Cookies from "js-cookie";
import { addressAPI } from "./api/addressAPI";

function App() {
  // modals
  const [isModalOptionsOpen, setIsModalOptionsOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPayTypeOpen, setIsPayTypeOpen] = useState(false);
  const [isBonusOpen, setIsBonusOpen] = useState(false);
  const [isOrderPromoOpen, setIsOrderPromoOpen] = useState(false);

  // sheets
  // Menu sheet
  const [isMainSheetOpen, setIsMainSheetOpen] = useState(false);
  const [mainSheetClosing, setMainSheetClosing] = useState(false);
  // Cart sheet
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);
  const [cartSheetClosing, setCartSheetClosing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isMainPage, setIsMainPage] = useState(false);

  const headerRef = useRef(null);
  const optionsRef = useRef(null);
  const userInfoRef = useRef(null);
  const addressRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const loginWrapperRef = useRef(null);
  const payTypeWrapperRef = useRef(null);
  const bonusWrapperRef = useRef(null);
  const orderPromoWrapperRef = useRef(null);
  const mainSheetWrapperRef = useRef(null);
  const cartSheetWrapperRef = useRef(null);

  // to show <Cart /> and to disable Cart button in Header when width > 1280px
  const monitorMediaQuery = useMediaQuery({ maxWidth: 1280 });
  const netbooksMediaQuery = useMediaQuery({ maxWidth: 1024 });

  const toggleOptionsVisibility = () => {
    setIsModalOptionsOpen(!isModalOptionsOpen);
  };
  const toggleUserInfoVisibility = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };
  const toggleAddressVisibility = () => {
    setIsModalAddressOpen(!isModalAddressOpen);
  };

  // memoizizng the function to avoid <Cart /> re-rendering when search input change
  const toggleCartVisibility = useCallback(
    (isVisible) => {
      if (!monitorMediaQuery) setIsCartVisible(false);
      else setIsCartVisible(isVisible);
    },
    [monitorMediaQuery]
  );

  const toggleMapVisibility = () => {
    setIsMapOpen(!isMapOpen);
  };

  const toggleLoginVisibility = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const togglePayTypeVisibility = () => {
    setIsPayTypeOpen(!isPayTypeOpen);
  };
  const toggleBonusVisibility = () => {
    setIsBonusOpen(!isBonusOpen);
  };

  const toggleOrderPromoVisibility = () => {
    setIsOrderPromoOpen(!isOrderPromoOpen);
  };

  const toggleMainSheetVisibility = () => {
    setMainSheetClosing(true);
  };
  const toggleCartSheetVisibility = () => {
    setCartSheetClosing(true);
  };

  useOutsideHook(mapWrapperRef, toggleMapVisibility); // to close popup <MapComponent /> clicking outside
  useOutsideHook(optionsRef, toggleOptionsVisibility); // to close popup <ModalOptions /> clicking outside
  useOutsideHook(userInfoRef, toggleUserInfoVisibility, [
    ".MuiDateCalendar-root",
  ]); // to close popup <UserInfo /> clicking outside
  useOutsideHook(addressRef, toggleAddressVisibility); // to close popup <AddressModal /> clicking outside
  useOutsideHook(loginWrapperRef, toggleLoginVisibility); // to close popup <LoginModal /> clicking outside
  useOutsideHook(payTypeWrapperRef, togglePayTypeVisibility); // to close popup <PayTypeModal /> clicking outside
  useOutsideHook(bonusWrapperRef, toggleBonusVisibility); // to close popup <BonusModal /> clicking outside
  useOutsideHook(orderPromoWrapperRef, toggleOrderPromoVisibility); // to close popup <OrderPromoModal /> clicking outside
  useOutsideHook(mainSheetWrapperRef, toggleMainSheetVisibility); // to close <MainSheet /> clicking outside
  useOutsideHook(cartSheetWrapperRef, toggleCartSheetVisibility); // to close <CartSheet /> clicking outside

  const location = useLocation(); // Getting the current location

  const dispatch = useDispatch();

  const addressList = useSelector((state) => state.user.addressList);
  const addressSelected = useSelector((state) => state.user.addressSelected);
  const dataLogin = useSelector((state) => state.auth.dataLogin);
  const token = useSelector((state) => state.auth.token);

  // we find here address with selected: true to display it all over the app
  useEffect(() => {
    const selectedAddressList = addressList.filter(
      (address) => address.selected
    );
    // if no selected addresses then make first address selected
    if (selectedAddressList.length === 0 && addressList.length > 0)
      dispatch(updateSelected(0));
    // to set selected address
    if (selectedAddressList.length > 0)
      dispatch(
        setAddressSelected(
          `${selectedAddressList[0].street}, ${selectedAddressList[0].yhouse}`
        )
      );
    else dispatch(setAddressSelected("")); // ??? убрать
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressList, addressSelected]);

  const { setMarkerAddress, setMarkerPosition } = useContext(LevelContext);

  // to fetch coordinates if there is addressSelected
  useEffect(() => {
    console.log("addressSelected", addressSelected);
    if (addressSelected) {
      fetchCoordinatesForAddress(
        addressSelected,
        dispatch,
        setMarkerAddress,
        setMarkerPosition
      );
    }
  }, [addressSelected]);

  useEffect(() => {
    setIsMainPage(location.pathname === "/");
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!netbooksMediaQuery) {
      setIsMainSheetOpen(false);
    }
  }, [netbooksMediaQuery]);

  // setting data from getUserPref with token form cookies
  useEffect(() => {
    (async () => {
      try {
        const token = Cookies.get("token");
        console.log("token", token);
        if (token) {
          const data = await userAPI.getUserPref(token);
          dispatch(
            setUserData({
              name: data.name,
              birthday: data.birthday,
              birthdaybonus: data.birthdaybonus,
              email: data.email,
              gender: data.gender,
              userid: data.userid,
            })
          );
          dispatch(setSalesid(data.salesid));
          dispatch(setAddressList(Object.values(data.address)));
          dispatch(setIsAuth(true));
          dispatch(setToken(token));
        } else {
          dispatch(setIsAuth(false));
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

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
        toggleBonusVisibility={toggleBonusVisibility}
        netbooksMediaQuery={netbooksMediaQuery}
        setIsMainSheetOpen={setIsMainSheetOpen}
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
              userInfoRef={userInfoRef}
              addressRef={addressRef}
              toggleUserInfoVisibility={toggleUserInfoVisibility}
              mapWrapperRef={mapWrapperRef}
              monitorMediaQuery={monitorMediaQuery}
              isLoginOpen={isLoginOpen}
              loginWrapperRef={loginWrapperRef}
              toggleLoginVisibility={toggleLoginVisibility}
              isMainSheetOpen={isMainSheetOpen}
              setIsMainSheetOpen={setIsMainSheetOpen}
              mainSheetWrapperRef={mainSheetWrapperRef}
              mainSheetClosing={mainSheetClosing}
              setMainSheetClosing={setMainSheetClosing}
              setSearchQuery={setSearchQuery}
              isCartSheetOpen={isCartSheetOpen}
              cartSheetWrapperRef={cartSheetWrapperRef}
              setCartSheetClosing={setCartSheetClosing}
              setIsCartSheetOpen={setIsCartSheetOpen}
              cartSheetClosing={cartSheetClosing}
              toggleAddressVisibility={toggleAddressVisibility}
              bonusWrapperRef={bonusWrapperRef}
              isBonusOpen={isBonusOpen}
              toggleBonusVisibility={toggleBonusVisibility}
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
                toggleAddressVisibility={toggleAddressVisibility}
                isMainSheetOpen={isMainSheetOpen}
                setIsMainSheetOpen={setIsMainSheetOpen}
                mainSheetWrapperRef={mainSheetWrapperRef}
                mainSheetClosing={mainSheetClosing}
                setMainSheetClosing={setMainSheetClosing}
                bonusWrapperRef={bonusWrapperRef}
                isBonusOpen={isBonusOpen}
                toggleBonusVisibility={toggleBonusVisibility}
                toggleOrderPromoVisibility={toggleOrderPromoVisibility}
                orderPromoWrapperRef={orderPromoWrapperRef}
                isOrderPromoOpen={isOrderPromoOpen}
                toggleLoginVisibility={toggleLoginVisibility}
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
                toggleAddressVisibility={toggleAddressVisibility}
                isMainSheetOpen={isMainSheetOpen}
                setIsMainSheetOpen={setIsMainSheetOpen}
                mainSheetWrapperRef={mainSheetWrapperRef}
                mainSheetClosing={mainSheetClosing}
                setMainSheetClosing={setMainSheetClosing}
                bonusWrapperRef={bonusWrapperRef}
                isBonusOpen={isBonusOpen}
                toggleBonusVisibility={toggleBonusVisibility}
                toggleLoginVisibility={toggleLoginVisibility}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/loyalty" element={<LoyaltyPage />} />
      </Routes>
      {!netbooksMediaQuery && <Footer />}
      {netbooksMediaQuery &&
        (location.pathname === "/" || location.pathname === "/submit") && (
          <DeviceFooter
            setIsCartSheetOpen={setIsCartSheetOpen}
            location={location}
          />
        )}
    </div>
  );
}

export default App;
