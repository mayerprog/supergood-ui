import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CartBox from "./CartBox/CartBox";
import CartShimmer from "../../Loaders/CartShimmer";
import React, { memo, useEffect, useRef, useState } from "react";
import { deleteCart } from "../../services/deleteCart";
import { fetchMinSum } from "../../services/fetchMinSum";

const Cart = ({
  cartWrapperRef,
  position,
  top,
  height,
  transform,
  toggleCartVisibility,
  loading,
  navigate,
}) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsSum = useSelector((state) => state.cart.itemsSum);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
  const addressSelected = useSelector((state) => state.user.addressSelected);
  const deliveryTime = useSelector((state) => state.cart.deliveryTime);

  const errMessage = useSelector((state) => state.order.errMessage);
  const itemsUnavailable = useSelector((state) => state.order.itemsUnavailable);

  const dynamicStyle = {
    "--cart-position": position,
    "--cart-top": top,
    "--cart-height": height,
    "--cart-transform": transform,
  };

  useEffect(() => {
    if (cartWrapperRef.current) {
      cartWrapperRef.current.scrollTop = 10000;
    }
  }, [cartItems]);

  // useEffect(() => {
  //   console.log(
  //     `Компонент Cart отрисован в ${new Date().toLocaleTimeString()}`
  //   );
  // });

  const handleClickSubmit = () => {
    toggleCartVisibility(false);
    navigate("/submit");
  };

  if (loading) {
    return <CartShimmer />;
  }

  return (
    <div className={styles.cart} ref={cartWrapperRef} style={dynamicStyle}>
      <div className={styles.cartHeader}>
        <span className={styles.cartTitle}>Корзина</span>
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
        <CartBox item={item} index={index} key={index} isSheet={false} />
      ))}
      <div className={styles.cartFooter}>
        <div className={styles.line} />
        <div className={styles.orderSum}>
          <span>Время доставки:</span>
          <span>{deliveryTime} мин</span>
        </div>
        <div className={styles.orderSum}>
          <span>Сумма заказа:</span>
          <span>{itemsSum} ₽</span>
        </div>
        {errMessage && <span className={styles.error}>{errMessage}</span>}
        {itemsUnavailable.length > 0 && (
          <span className={styles.addErrInfo}>Отсутствующие позиции:</span>
        )}
        {itemsUnavailable.length > 0 &&
          itemsUnavailable.map((item, index) => (
            <span className={styles.errorItems} key={index}>
              {item.itemname}
            </span>
          ))}
        <div className={styles.button}>
          <button
            className={styles.buttonStyle}
            onClick={() =>
              fetchMinSum({
                token,
                salesid,
                cartItems,
                addressSelected,
                dispatch,
                action: handleClickSubmit,
              })
            }
          >
            <span className={styles.buttonText}>Оформить заказ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Cart);
