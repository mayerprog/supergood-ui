import React, { useEffect, useState } from "react";
import styles from "./Item.module.scss";
import AddItemBox from "../../AddItemBox/AddItemBox";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../../redux/slices/cartSlice";
import PizzaOptions from "../PizzaOptions/PizzaOptions";
import { itemAPI } from "../../../api/itemAPI";
// import noImage from "../../../assets/images/No-Image-Placeholder.svg";

// import { setItems } from "../../../redux/slices/itemSlice";

const Item = ({ item, category, toggleCardOpen }) => {
  const [itemImage, setItemImage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const uid = item.img.uid;
        const image = await itemAPI.getFile(uid);
        setItemImage(image);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const [amount, setAmount] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const foundCartItem = cartItems.find(
      (cartItem) => cartItem.itemid === item.itemid
    );
    if (foundCartItem) {
      setAmount(foundCartItem.params.amount.value);
    }
  }, [cartItems, item.itemid]);

  const addItemToCart = (event) => {
    event.stopPropagation();
    dispatch(addItems(item));
  };

  useEffect(() => {
    console.log("item", item);
  }, [item]);

  return (
    <button className={styles.card} onClick={() => toggleCardOpen(item.itemid)}>
      <img className={styles.productImage} alt={item.name} src={itemImage} />
      <div className={styles.productInfo}>
        <span className={styles.productTitle}>{item.name}</span>
        {(category === "Наборы" || category === "Пицца") && <PizzaOptions />}
      </div>
      <div className={styles.order}>
        {amount > 0 ? (
          <AddItemBox margin="0 0.5rem" itemId={item.itemid} />
        ) : (
          <button className={styles.counter} onClick={(e) => addItemToCart(e)}>
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
    </button>
  );
};

export default Item;
