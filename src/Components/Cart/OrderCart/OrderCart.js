import styles from "./OrderCart.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartBox from "../CartBox/CartBox";
import { removeAllItems } from "../../../redux/slices/cartSlice";
import { deleteCart } from "../../../services/deleteCart";

const OrderCart = ({}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
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
          onClick={() =>
            deleteCart({ dispatch, cartItems, isAuth, token, salesid })
          }
        >
          Очистить
        </span>
      </div>
      {cartItems.map((item, index) => (
        <CartBox item={item} index={index} isSheet={false} isOrderCart={true} />
      ))}
    </div>
  );
};

export default OrderCart;
