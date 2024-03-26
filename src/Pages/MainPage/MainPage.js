import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../../Components/Cart/Cart";
import MainContent from "../../Components/MainContent/MainContent";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./MainPage.module.scss";
import { useMediaQuery } from "react-responsive";
import { useOutsideHook } from "../../hooks/useOutsideHook";
import { updateSum } from "../../redux/slices/cartSlice";
import { useUpdateSumHook } from "../../hooks/useUpdateSumHook";
import { itemAPI } from "../../api/itemAPI";
import { setItems } from "../../redux/slices/itemSlice";
import jsonData from "../../newApi_getItems.json";
import Loader from "../../Loaders/SidebarShimmer";

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
  mediaQuery,
}) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [itemCardId, setItemCardId] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0); // State to store header height
  const [scrolledCategory, setScrolledCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

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
  //       const allItems = await itemAPI.getItems();

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
  //       setLoading(false);

  //       console.log("itemAPI", allItems);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const itemsArray = [];

    Object.keys(jsonData.items).forEach((categoryId) => {
      const categoryObject = jsonData.items[categoryId];
      const category = Object.values(categoryObject);
      // console.log("category", category);
      category.forEach((itemGroup) => {
        Object.values(itemGroup).forEach((item) => {
          const itemForPush = Object.values(item);
          // console.log("item", itemForPush);
          itemsArray.push(itemForPush[0]);
        });
      });
    });
    dispatch(setItems(itemsArray));
    // console.log("jsonData", jsonData.items);
  }, []);

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
  }, []);

  useUpdateSumHook();

  const toggleCardOpen = (itemId) => {
    setIsCardOpen(!isCardOpen);
    setItemCardId(itemId);
  };

  useOutsideHook(cardRef, toggleCardOpen); // to close popup <ModalCard /> clicking outside
  useOutsideHook(wrapperRef, toggleCartVisibility); // to close popup <Cart /> clicking outside

  return (
    <div className={styles.content}>
      <Sidebar
        categories={searchedCategories}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
        scrolledCategory={scrolledCategory}
        loading={loading}
      />

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
      />
      {!mediaQuery && (
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
