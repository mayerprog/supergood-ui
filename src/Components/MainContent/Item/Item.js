import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Item.module.scss";
import AddItemBox from "../../AddItemBox/AddItemBox";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../../redux/slices/cartSlice";
import PizzaOptions from "../PizzaOptions/PizzaOptions";
import { itemAPI } from "../../../api/itemAPI";
import { MdImageNotSupported } from "react-icons/md";
import { useImageLoaded } from "../../../hooks/useImageLoaded";
import { baseURL } from "../../../config.js";
import { useMediaQuery } from "react-responsive";
import { addItemToCart } from "../../../services/addItemToCart.js";

// import { setItems } from "../../../redux/slices/itemSlice";

const Item = ({ item, category, toggleCardOpen, toggleMapVisibility }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [amount, setAmount] = useState(null);
  const [addingInProgress, setAddingInProgress] = useState(false);

  const itemRef = useRef();

  const [ref, loaded, onLoad] = useImageLoaded();

  const uid = item.img[0].uid;
  const uri = `${baseURL}/getFile?uid=${uid}`;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const addressList = useSelector((state) => state.address.addressList);

  const dispatch = useDispatch();

  const mediaQuery = useMediaQuery({ maxWidth: 400 });

  useEffect(() => {
    const foundCartItem = cartItems.find(
      (cartItem) => cartItem.itemid === item.itemid
    );
    if (foundCartItem) {
      setAmount(foundCartItem.params.amount.value);
    } else {
      setAmount(0);
    }
  }, [cartItems, item.itemid]);

  //lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px", // Loads images a little before they come into view
      }
    );

    observer.observe(itemRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={styles.card}
      onClick={() => toggleCardOpen(item.itemid)}
      ref={itemRef}
    >
      {isVisible && loaded ? (
        <img
          className={styles.productImage}
          alt={item.name}
          src={uri}
          ref={ref}
          onLoad={onLoad}
        />
      ) : (
        <MdImageNotSupported className={styles.productImage} color="#ccc" />
      )}

      <div className={styles.productInfo}>
        <span className={styles.productTitle}>{item.name}</span>
        {category === "Пицца" && !mediaQuery && <PizzaOptions />}
      </div>
      <div className={styles.order}>
        {amount > 0 ? (
          <AddItemBox margin="0 0.5rem" itemId={item.itemid} />
        ) : (
          <button
            className={styles.counter}
            onClick={(event) =>
              addItemToCart({
                event,
                addingInProgress,
                setAddingInProgress,
                toggleMapVisibility,
                addressList,
                dispatch,
                item,
              })
            }
          >
            <span className={styles.count}>Добавить</span>
          </button>
        )}
        <div>
          <div
            className={styles.amount}
          >{`${item.params.weightout.value} г.`}</div>
          <div className={styles.price}>{`${item.price} ₽`}</div>
        </div>
      </div>
    </div>
  );
};

export default Item;
