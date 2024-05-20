import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Item.module.scss";
import AddItemBox from "../../AddItemBox/AddItemBox";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../../redux/slices/cartSlice";
import PizzaOptions from "../PizzaOptions/PizzaOptions";
import { itemAPI } from "../../../api/itemAPI";
import { MdImageNotSupported } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";

import { baseURL } from "../../../config.js";
import { useMediaQuery } from "react-responsive";
import { addItemToCart } from "../../../services/addItemToCart";
import { fetchImage } from "../../../services/fetchImage.js";

const Item = ({ item, category, toggleItemOpen, toggleMapVisibility }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [amount, setAmount] = useState(null);
  const [addingInProgress, setAddingInProgress] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const itemRef = useRef();

  const uid = item.img[0].uid;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const addressList = useSelector((state) => state.user.addressList);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);

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
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
            await fetchImage({
              uid,
              width: 170,
              height: 170,
              setImageUrl,
            });
            // setTimeout(() => {
            setLoaded(true);
            // }, 500);
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
      onClick={() => toggleItemOpen(item.itemid)}
      ref={itemRef}
      data-is-loaded={loaded ? "true" : "false"}
    >
      {!loaded && (
        <IoFastFoodOutline className={styles.productImage} color="#ccc" />
      )}
      {isVisible && loaded && (
        <>
          <img
            className={styles.productImage}
            loading="lazy"
            alt={item.name}
            src={imageUrl}
            onLoad={() => setLoaded(true)}
          />
        </>
      )}

      <div className={styles.productInfo}>
        <span className={styles.productTitle}>{item.name}</span>
        {category === "Пицца" && !mediaQuery && <PizzaOptions />}
      </div>
      <div className={styles.order}>
        {amount > 0 ? (
          <AddItemBox margin="0 0.5rem" itemId={item.itemid} isSheet={false} />
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
                token,
                salesid,
              })
            }
          >
            <span className={styles.count}>Добавить</span>
          </button>
        )}
        <div>
          <div
            className={styles.amount}
          >{`${item.params.weightout.value} ${item.params.weightout.unit}.`}</div>
          <div className={styles.price}>{`${item.price} ₽`}</div>
        </div>
      </div>
    </div>
  );
};

export default Item;
