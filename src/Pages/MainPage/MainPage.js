import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../../Components/Cart/Cart";
import MainContent from "../../Components/MainContent/MainContent";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./MainPage.module.scss";
import { setItems } from "../../redux/slices/itemSlice";
import jsonData from "../../newApi_getItems.json";
import { useNavigate } from "react-router-dom";
import { itemAPI } from "../../api/itemAPI";
import { useMediaQuery } from "react-responsive";
import MainSheet from "../../Components/MainSheet/MainSheet";
import NavBar from "../../Components/NavBar/NavBar";
import CartSheet from "../../Components/Cart/CartSheet/CartSheet";
import MapComponent from "../../Components/MapComponent/MapComponent";
import { fetchImage } from "../../services/fetchImage";
import LoginModal from "../../Components/Login/LoginModal";
import UserModal from "../../Components/UserInfo/UserModal/UserModal";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";
import BonusModal from "../../Components/Promo/BonusModal/BonusModal";
import PromoErrorModal from "../../Components/Promo/PromoErrorModal/PromoErrorModal";
import ModalsContext from "../../contexts/ModalsContext";
import { updateSum } from "../../redux/slices/cartSlice";

const MainPage = ({
  searchQuery,
  headerRef,
  toggleCartVisibility,
  isCartVisible,
  isMapOpen,
  setIsMapOpen,
  isUserInfoOpen,
  isModalAddressOpen,
  userInfoRef,
  addressRef,
  toggleUserInfoVisibility,
  mapWrapperRef,
  monitorMediaQuery,
  isLoginOpen,
  loginWrapperRef,
  toggleLoginVisibility,
  toggleMapVisibility,
  isMainSheetOpen,
  setIsMainSheetOpen,
  mainSheetWrapperRef,
  mainSheetClosing,
  setMainSheetClosing,
  setSearchQuery,
  isCartSheetOpen,
  cartSheetWrapperRef,
  setCartSheetClosing,
  setIsCartSheetOpen,
  cartSheetClosing,
  toggleAddressVisibility,
  bonusWrapperRef,
  isBonusOpen,
  toggleBonusVisibility,
  setCartErrMessage,
  cartErrMessage,
  itemsUnavailable,
  setItemsUnavailable,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const netbooksMediaQuery = useMediaQuery({ maxWidth: 1024 });

  const [headerHeight, setHeaderHeight] = useState(0); // State to store header height
  const [scrolledCategory, setScrolledCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const items = useSelector((state) => state.item.items);
  const categories = [...new Set(items.map((item) => item.catname))]; // Unique categories
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchedCategories, setSearchedCategories] = useState(categories);
  const [imageUrl, setImageUrl] = useState("");

  const cartWrapperRef = useRef(null);

  const { isPromoErrorOpen } = useContext(ModalsContext);

  const deptId = useSelector((state) => state.user.deptId);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuth = useSelector((state) => state.auth.isAuth);

  // useEffect(() => {
  //   console.log(
  //     `Компонент MainPage отрисован в ${new Date().toLocaleTimeString()}`
  //   );
  // });

  //to sum total price of items from cart
  useEffect(() => {
    if (!isAuth && cartItems.length > 0) {
      const sum = cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      );
      dispatch(updateSum(sum));
    }
  }, [cartItems, isAuth, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const itemsArray = [];
        const allItems = await itemAPI.getItems(parseInt(deptId));
        console.log("allItems", allItems);

        if (allItems.error === "stopped department") {
          fetchImage({
            uid: "19f05932f0",
            width: 600,
            height: 842,
            setImageUrl,
          });
        } else {
          Object.keys(allItems.items).forEach((categoryId) => {
            const categoryObject = allItems.items[categoryId];
            const category = Object.values(categoryObject);

            category.forEach((itemGroup) => {
              itemsArray.push(itemGroup);
            });
          });
          dispatch(setItems(itemsArray));
          if (itemsArray.length === 0) setLoading(true);
          else setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  // useEffect(() => {
  //   const itemsArray = [];
  //   Object.keys(jsonData.items).forEach((categoryId) => {
  //     const categoryObject = jsonData.items[categoryId];
  //     const category = Object.values(categoryObject);
  //     // console.log("category", category);
  //     category.forEach((itemGroup) => {
  //       Object.values(itemGroup).forEach((item) => {
  //         const itemForPush = Object.values(item);
  //         itemsArray.push(itemForPush[0]);
  //       });
  //     });
  //   });
  //   console.log("itemsArray", itemsArray);
  //   dispatch(setItems(itemsArray));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  useEffect(() => {
    let filteredItems = searchQuery.trim()
      ? items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : items;

    setSearchedItems(filteredItems);
  }, [searchQuery, items]);

  useEffect(() => {
    let filteredCategories = [
      ...new Set(searchedItems.map((item) => item.catname)),
    ];
    setSearchedCategories(filteredCategories);
  }, [searchedItems]);

  useEffect(() => {
    if (searchQuery.trim() && searchedItems.length === 0) {
      setSearchedItems(items);
    }
  }, [searchQuery, items, searchedItems.length]);

  useEffect(() => {
    if (headerRef.current) {
      if (!netbooksMediaQuery) {
        setHeaderHeight(headerRef.current.offsetHeight - 2); // height of Header
      } else {
        setHeaderHeight(headerRef.current.offsetHeight + 65); // height of Header
      }
    }
  }, [headerRef, netbooksMediaQuery]);

  return (
    <>
      {netbooksMediaQuery && !loading && !imageUrl && (
        <NavBar
          categories={categories}
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
          scrolledCategory={scrolledCategory}
        />
      )}
      <div className={styles.content}>
        {!netbooksMediaQuery && !imageUrl && (
          <Sidebar
            categories={searchedCategories}
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
            scrolledCategory={scrolledCategory}
            loading={loading}
          />
        )}

        <div
          className={`${styles.sheetOverlay} ${
            isMainSheetOpen ? styles.visible : ""
          }`}
          data-is-cart="false"
        >
          {isMainSheetOpen && (
            <MainSheet
              mainSheetWrapperRef={mainSheetWrapperRef}
              setIsMainSheetOpen={setIsMainSheetOpen}
              mainSheetClosing={mainSheetClosing}
              setMainSheetClosing={setMainSheetClosing}
              navigate={navigate}
              toggleUserInfoVisibility={toggleUserInfoVisibility}
              toggleAddressVisibility={toggleAddressVisibility}
              toggleLoginVisibility={toggleLoginVisibility}
            />
          )}
        </div>

        {isMapOpen && (
          <div className={styles.cardOverlay}>
            <MapComponent
              mapWrapperRef={mapWrapperRef}
              setIsMapOpen={setIsMapOpen}
            />
          </div>
        )}

        {imageUrl ? (
          <div className={styles.errorImage}>
            <img
              className={styles.img}
              loading="lazy"
              alt="department stopped"
              src={imageUrl}
            />
          </div>
        ) : (
          <MainContent
            items={searchedItems}
            categories={searchedCategories}
            isCartVisible={isCartVisible}
            selectedCategory={selectedCategory}
            headerHeight={headerHeight}
            setScrolledCategory={setScrolledCategory}
            setSelectedCategory={setSelectedCategory}
            toggleCartVisibility={toggleCartVisibility}
            loading={loading}
            toggleMapVisibility={toggleMapVisibility}
            setSearchQuery={setSearchQuery}
            cartWrapperRef={cartWrapperRef}
            cartErrMessage={cartErrMessage}
            setCartErrMessage={setCartErrMessage}
          />
        )}

        {!monitorMediaQuery && !imageUrl && (
          <Cart
            position="sticky"
            top="105px"
            height="calc(100vh - 180px)"
            transform="none"
            toggleCartVisibility={toggleCartVisibility}
            loading={loading}
            navigate={navigate}
            cartWrapperRef={cartWrapperRef}
            cartErrMessage={cartErrMessage}
            setCartErrMessage={setCartErrMessage}
          />
        )}

        {isLoginOpen && (
          <div className={styles.cardOverlay}>
            <LoginModal
              loginWrapperRef={loginWrapperRef}
              toggleLoginVisibility={toggleLoginVisibility}
            />
          </div>
        )}
        {isUserInfoOpen && (
          <div className={styles.cardOverlay}>
            <UserModal
              userInfoRef={userInfoRef}
              toggleUserInfoVisibility={toggleUserInfoVisibility}
            />
          </div>
        )}
        {isModalAddressOpen && (
          <div className={styles.cardOverlay}>
            <AddressModal
              addressRef={addressRef}
              isModal={true}
              toggleAddressVisibility={toggleAddressVisibility}
            />
          </div>
        )}
        {isPromoErrorOpen && (
          <div className={styles.cardOverlay}>
            <PromoErrorModal />
          </div>
        )}
        {isBonusOpen && (
          <div className={styles.cardOverlay}>
            <BonusModal
              bonusWrapperRef={bonusWrapperRef}
              isModal={true}
              toggleBonusVisibility={toggleBonusVisibility}
            />
          </div>
        )}

        {netbooksMediaQuery && !imageUrl && (
          <>
            <div
              className={`${styles.sheetOverlay} ${
                isCartSheetOpen ? styles.visible : ""
              }`}
              data-is-cart="true"
            >
              {isCartSheetOpen && (
                <CartSheet
                  cartSheetWrapperRef={cartSheetWrapperRef}
                  setCartSheetClosing={setCartSheetClosing}
                  setIsCartSheetOpen={setIsCartSheetOpen}
                  cartSheetClosing={cartSheetClosing}
                  navigate={navigate}
                  cartErrMessage={cartErrMessage}
                  setCartErrMessage={setCartErrMessage}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
