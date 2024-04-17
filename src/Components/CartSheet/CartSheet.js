import styles from "./CartSheet.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CartBox from "./CartBox/CartBox";
import { removeAllItems } from "../../redux/slices/cartSlice";
import React, { memo, useEffect } from "react";

const CartSheet = ({ toggleCartVisibility, navigate }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsSum = useSelector((state) => state.cart.itemsSum);

  const handleClickSubmit = () => {
    if (cartItems.length > 0) {
      toggleCartVisibility(false);
      navigate("/submit");
    }
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <span className={styles.cartTitle}>Корзина</span>
        <span
          className={styles.deleteTitle}
          onClick={() => dispatch(removeAllItems())}
        >
          Очистить
        </span>
      </div>
      {cartItems.map((item, index) => (
        <CartBox item={item} index={index} key={index} />
      ))}
      <div className={styles.cartFooter}>
        <div className={styles.line} />
        <div className={styles.orderSum}>
          <span>Сумма заказа:</span>
          <span>{itemsSum} ₽</span>
        </div>
        <div className={styles.button}>
          <button className={styles.buttonStyle} onClick={handleClickSubmit}>
            <span className={styles.buttonText}>Оформить заказ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSheet;
