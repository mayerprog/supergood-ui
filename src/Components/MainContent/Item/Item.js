import React, { useEffect, useState } from "react";
import styles from "./Item.module.scss";
import AddItemBox from "../../AddItemBox.js/AddItemBox";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../../redux/slices/cartSlice";

// import { setItems } from "../../../redux/slices/itemSlice";

const Item = ({ item, category, toggleCardOpen }) => {
  const [amount, setAmount] = useState(null);
  const [itemForUpdate, setItemForUpdate] = useState(null);
  const [type, setType] = useState("Стандартное");
  const [size, setSize] = useState("30 см");
  const types = ["Стандартное", "Тонкое"];
  const sizes = ["26 см", "30 см", "40 см"];
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const foundCartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (foundCartItem) {
      setAmount(foundCartItem.amount.value);
      setItemForUpdate({
        ...foundCartItem,
        amount: { ...foundCartItem.amount },
      });
    }
  }, [cartItems, item.id]);

  const chooseType = (type, event) => {
    event.stopPropagation();
    setType(type);
  };

  const chooseSize = (sizeOption, event) => {
    event.stopPropagation();
    setSize(sizeOption);
  };

  const addItemToCart = (itemId, event) => {
    event.stopPropagation();
    if (itemId === item.id) {
      dispatch(addItems(item));
    }
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
        {(category === "Наборы" || category === "Пицца") && (
          <>
            <div className={styles.options}>
              {types.map((option) => (
                <button
                  key={option}
                  className={
                    type === option ? styles.chosenOption : styles.option
                  }
                  onClick={(e) => chooseType(option, e)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className={styles.options}>
              {sizes.map((option) => (
                <button
                  key={option}
                  className={
                    size === option ? styles.chosenOption : styles.option
                  }
                  onClick={(e) => chooseSize(option, e)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.order}>
        {amount > 0 ? (
          <AddItemBox
            margin="0 0.5rem"
            amount={amount}
            updatedItem={itemForUpdate}
          />
        ) : (
          <button
            className={styles.counter}
            onClick={(e) => addItemToCart(item.id, e)}
          >
            <span className={styles.count}>Добавить</span>
          </button>
        )}
        <div>
          <div className={styles.amount}>920 г.</div>
          <div className={styles.price}>940 р.</div>
        </div>
      </div>
    </button>
  );
};

export default Item;
