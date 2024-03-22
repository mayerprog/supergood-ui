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
}) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [itemCardId, setItemCardId] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0); // State to store header height
  const [scrolledCategory, setScrolledCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const items = useSelector((state) => state.item.items);
  const categories = [...new Set(items.map((item) => item.category))]; // Unique categories

  const [searchedItems, setSearchedItems] = useState([]);
  const [searchedCategories, setSearchedCategories] = useState(categories);

  const cardRef = useRef(null);
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const allItems = await itemAPI.getItems();
        // dispatch(setItems(allItems));
        console.log("itemAPI", allItems);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
  //         .then((response) => {
  //           console.log("response", response);
  //           if (response.ok) {
  //             return response.json(); // Parse the response data as JSON
  //           } else {
  //             throw new Error("API request failed");
  //           }
  //         })
  //         .then((data) => {
  //           // Process the response data here
  //           console.log(data); // Example: Logging the data to the console
  //         })
  //         .catch((error) => {
  //           // Handle any errors here
  //           console.error(error); // Example: Logging the error to the console
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

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
      ...new Set(searchedItems.map((item) => item.category)),
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

  const mediaQuery = useMediaQuery({ maxWidth: 1480 }); // to hide <Cart /> when maxWidth: 1480px

  return (
    <div className={styles.content}>
      <Sidebar
        categories={searchedCategories}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
        scrolledCategory={scrolledCategory}
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
      />
      {!mediaQuery && (
        <Cart
          position="sticky"
          top="105px"
          height="calc(100vh - 180px)"
          transform="none"
          toggleCartVisibility={toggleCartVisibility}
        />
      )}
    </div>
  );
};

export default MainPage;
