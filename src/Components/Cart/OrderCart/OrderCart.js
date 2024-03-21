import styles from "./OrderCart.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartBox from "../CartBox/CartBox";

const OrderCart = ({}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsSum = useSelector((state) => state.cart.itemsSum);

  let navigate = useNavigate();

  const handleClickSubmit = () => {
    navigate("/submit");
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <span className={styles.cartTitle}>Ваш заказ</span>
        <span className={styles.deleteTitle}>Очистить</span>
      </div>
      {cartItems.map((item, index) => (
        <CartBox item={item} index={index} />
      ))}
    </div>
  );
};

export default OrderCart;
