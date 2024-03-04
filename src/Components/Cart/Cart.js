import styles from "./Cart.module.scss";
import pizza from "../../assets/images/pizza.jpg";
import AddItemBox from "../AddItemBox.js/AddItemBox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAmount } from "../../redux/slices/cartSlice";
import CartBox from "./CartBox/CartBox";

const Cart = ({ wrapperRef, position, top, height, transform }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dynamicStyle = {
    "--cart-position": position,
    "--cart-top": top,
    "--cart-height": height,
    "--cart-transform": transform,
  };

  return (
    <div className={styles.cart} ref={wrapperRef} style={dynamicStyle}>
      <div className={styles.cartHeader}>
        <span className={styles.cartTitle}>Корзина</span>
        <span className={styles.deleteTitle}>Очистить</span>
      </div>
      {cartItems.map((item, index) => (
        <CartBox item={item} index={index} />
      ))}
      <div className={styles.button}>
        <button className={styles.buttonStyle}>
          <span className={styles.buttonText}>Оформить заказ</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
