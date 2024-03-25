import styles from "./OrderCart.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartBox from "../CartBox/CartBox";
import { removeAllItems } from "../../../redux/slices/cartSlice";

const OrderCart = ({}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsSum = useSelector((state) => state.cart.itemsSum);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClickSubmit = () => {
    navigate("/submit");
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <span className={styles.cartTitle}>Ваш заказ</span>
        <span
          className={styles.deleteTitle}
          onClick={() => dispatch(removeAllItems())}
        >
          Очистить
        </span>
      </div>
      {cartItems.map((item, index) => (
        <CartBox item={item} index={index} />
      ))}
    </div>
  );
};

export default OrderCart;
