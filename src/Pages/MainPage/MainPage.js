import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../../Components/Cart/Cart";
import MainContent from "../../Components/MainContent/MainContent";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./MainPage.module.scss";
import { useOutsideHook } from "../../hooks/useOutsideHook";
import { useUpdateSumHook } from "../../hooks/useUpdateSumHook";
import { setItems } from "../../redux/slices/itemSlice";
import jsonData from "../../newApi_getItems.json";
import { itemAPI } from "../../api/itemAPI";
import { useMediaQuery } from "react-responsive";
import MainSheet from "../../Components/MainSheet/MainSheet";

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
  toggleAddressVisibility,
  mapWrapperRef,
  cartMediaQuery,
  isLoginOpen,
  loginWrapperRef,
  toggleLoginVisibility,
  toggleMapVisibility,
  isMainSheetOpen,
  setIsMainSheetOpen,
  mainSheetWrapperRef,
  mainSheetClosing,
  setMainSheetClosing,
}) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [itemCardId, setItemCardId] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0); // State to store header height
  const [scrolledCategory, setScrolledCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const sideBarMediaQuery = useMediaQuery({ maxWidth: 1024 });

  const items = useSelector((state) => state.item.items);
  const categories = [...new Set(items.map((item) => item.catname))]; // Unique categories

  const [searchedItems, setSearchedItems] = useState([]);
  const [searchedCategories, setSearchedCategories] = useState(categories);

  const cardRef = useRef(null);
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);

  //       const itemsArray = [];
  //       const allItems = await itemAPI.getItems(1257);

  //       Object.keys(allItems.items).forEach((categoryId) => {
  //         const categoryObject = allItems.items[categoryId];
  //         const category = Object.values(categoryObject);
  //         // console.log("category", category);
  //         category.forEach((itemGroup) => {
  //           Object.values(itemGroup).forEach((item) => {
  //             const itemForPush = Object.values(item);
  //             // console.log("item", itemForPush);
  //             itemsArray.push(itemForPush[0]);
  //           });
  //         });
  //       });
  //       dispatch(setItems(itemsArray));
  //       if (itemsArray.length === 0) setLoading(true);
  //       else setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, [dispatch]);

  useEffect(() => {
    const itemsArray = [];
    Object.keys(jsonData.items).forEach((categoryId) => {
      const categoryObject = jsonData.items[categoryId];
      const category = Object.values(categoryObject);
      // console.log("category", category);
      category.forEach((itemGroup) => {
        Object.values(itemGroup).forEach((item) => {
          const itemForPush = Object.values(item);
          itemsArray.push(itemForPush[0]);
        });
      });
    });
    console.log("itemsArray", itemsArray);
    dispatch(setItems(itemsArray));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
      setHeaderHeight(headerRef.current.offsetHeight); // height of Header
    }
  }, [headerRef]);

  useUpdateSumHook();

  const toggleCardOpen = (itemId) => {
    setIsCardOpen(!isCardOpen);
    setItemCardId(itemId);
  };

  useOutsideHook(cardRef, toggleCardOpen); // to close popup <ModalCard /> clicking outside
  useOutsideHook(wrapperRef, toggleCartVisibility); // to close popup <Cart /> clicking outside

  return (
    <div className={styles.content}>
      {!sideBarMediaQuery && (
        <Sidebar
          categories={searchedCategories}
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
          scrolledCategory={scrolledCategory}
          loading={loading}
        />
      )}

      {isMainSheetOpen && (
        <div className={styles.mainSheetOverlay}>
          <MainSheet
            mainSheetWrapperRef={mainSheetWrapperRef}
            setIsMainSheetOpen={setIsMainSheetOpen}
            mainSheetClosing={mainSheetClosing}
            setMainSheetClosing={setMainSheetClosing}
          />
        </div>
      )}

      <MainContent
        items={searchedItems}
        categories={searchedCategories}
        isCartVisible={isCartVisible}
        isCardOpen={isCardOpen}
        toggleCardOpen={toggleCardOpen}
        wrapperRef={wrapperRef}
        cardRef={cardRef}
        selectedCategory={selectedCategory}
        headerHeight={headerHeight}
        setScrolledCategory={setScrolledCategory}
        setSelectedCategory={setSelectedCategory}
        itemCardId={itemCardId}
        mapWrapperRef={mapWrapperRef}
        isMapOpen={isMapOpen}
        setIsMapOpen={setIsMapOpen}
        userInfoRef={userInfoRef}
        isUserInfoOpen={isUserInfoOpen}
        toggleUserInfoVisibility={toggleUserInfoVisibility}
        addressRef={addressRef}
        toggleAddressVisibility={toggleAddressVisibility}
        isModalAddressOpen={isModalAddressOpen}
        toggleCartVisibility={toggleCartVisibility}
        loading={loading}
        isLoginOpen={isLoginOpen}
        loginWrapperRef={loginWrapperRef}
        toggleLoginVisibility={toggleLoginVisibility}
        toggleMapVisibility={toggleMapVisibility}
      />
      {!cartMediaQuery && (
        <Cart
          position="sticky"
          top="105px"
          height="calc(100vh - 180px)"
          transform="none"
          toggleCartVisibility={toggleCartVisibility}
          loading={loading}
        />
      )}
    </div>
  );
};

export default MainPage;
