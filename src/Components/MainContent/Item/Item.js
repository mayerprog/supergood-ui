import React, { useEffect, useState } from "react";
import styles from "./Item.module.scss";
import AddItemBox from "../../AddItemBox.js/AddItemBox";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../../redux/slices/cartSlice";
import PizzaOptions from "../PizzaOptions/PizzaOptions";

// import { setItems } from "../../../redux/slices/itemSlice";

const Item = ({ item, category, toggleCardOpen }) => {
  const [amount, setAmount] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const foundCartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (foundCartItem) {
      setAmount(foundCartItem.amount.value);
    }
  }, [cartItems, item.id]);

  const addItemToCart = (event) => {
    event.stopPropagation();
    dispatch(addItems(item));
  };

  return (
    <button className={styles.card} onClick={() => toggleCardOpen(item.id)}>
      <img
        className={styles.productImage}
        src={item.imageUrl}
        alt={item.name}
      />
      <div className={styles.productInfo}>
        <span className={styles.productTitle}>{item.name}</span>
        {(category === "Наборы" || category === "Пицца") && <PizzaOptions />}
      </div>
      <div className={styles.order}>
        {amount > 0 ? (
          <AddItemBox margin="0 0.5rem" itemId={item.id} />
        ) : (
          <button className={styles.counter} onClick={(e) => addItemToCart(e)}>
            <span className={styles.count}>Добавить</span>
          </button>
        )}
        <div>
          <div className={styles.amount}>{`${item.weightout.value} г.`}</div>
          <div className={styles.price}>{`${item.price} ₽`}</div>
        </div>
      </div>
    </button>
  );
};

export default Item;
