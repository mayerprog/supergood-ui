import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CartBox from "./CartBox/CartBox";
import { useNavigate } from "react-router-dom";
import { removeAllItems } from "../../redux/slices/cartSlice";
import CartShimmer from "../../Loaders/CartShimmer";
import React, { memo, useEffect, useRef } from "react";
import { cartAPI } from "../../api/cartAPI";

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
    if (cartItems.length > 0) {
      toggleCartVisibility(false);
      navigate("/submit");
    }
  };

  const removeItems = async () => {
    if (!isAuth) {
      dispatch(removeAllItems());
    } else {
      if (cartItems.length > 0) {
        console.log("cartItems", cartItems);
        try {
          await Promise.all(
            cartItems.map((item) =>
              cartAPI.deleteItem({ token, salesid, id: item.id })
            )
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  if (loading) {
    return <CartShimmer />;
  }

  return (
    <div className={styles.cart} ref={cartWrapperRef} style={dynamicStyle}>
      <div className={styles.cartHeader}>
        <span className={styles.cartTitle}>Корзина</span>
        <span className={styles.deleteTitle} onClick={removeItems}>
          Очистить
        </span>
      </div>
      {cartItems.map((item, index) => (
        <CartBox item={item} index={index} key={index} isSheet={false} />
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

export default memo(Cart);
