import styles from "./CartSheet.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeAllItems } from "../../../redux/slices/cartSlice";
import React, { memo, useEffect, useRef } from "react";
import CartBox from "../CartBox/CartBox";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DeviceFooter from "../../Footer/DeviceFooter/DeviceFooter";
import { GiShoppingCart } from "react-icons/gi";
import { deleteCart } from "../../../services/deleteCart";

const CartSheet = ({
  cartSheetWrapperRef,
  setCartSheetClosing,
  setIsCartSheetOpen,
  cartSheetClosing,
  navigate,
}) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsSum = useSelector((state) => state.cart.itemsSum);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);

  const handleClosing = () => {
    setCartSheetClosing(false);
    setIsCartSheetOpen(false);
  };

  const handleClickSubmit = () => {
    if (cartItems.length > 0) {
      setIsCartSheetOpen(false);
      navigate("/submit");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cartSheetWrapperRef.current) {
        cartSheetWrapperRef.current.scrollTop = 10000;
      }
    }, 200); // set setTimeout because of the duration 0.2sec in useGSAP
    return () => clearTimeout(timer);
  }, [cartItems]);

  useGSAP(() => {
    const menu = cartSheetWrapperRef.current;

    gsap.from(menu, {
      y: "100%",
      opacity: 1,
      duration: 0.2,
      delay: 0.2,
      ease: "power2.out",
    });
  }, []);
  useGSAP(() => {
    const menu = cartSheetWrapperRef.current;

    if (cartSheetClosing) {
      gsap.to(menu, {
        y: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => handleClosing(),
      });
    }
  }, [cartSheetClosing]);

  return (
    <div className={styles.cartSheet} ref={cartSheetWrapperRef}>
      <div className={styles.header}>
        <div style={{ display: "flex", flex: "1" }}></div>
        <div className={styles.cart}>
          <GiShoppingCart size={25} className={styles.icon} />
          <h3>Корзина</h3>
        </div>
        {cartItems.length > 0 ? (
          <span
            className={styles.buttonText}
            onClick={() =>
              deleteCart({ dispatch, cartItems, isAuth, token, salesid })
            }
          >
            Очистить
          </span>
        ) : (
          <span
            className={styles.noItemsText}
            onClick={() => setCartSheetClosing(true)}
          >
            Вернуться к выбору
          </span>
        )}
      </div>
      {cartItems.length > 0 ? (
        <div className={styles.itemsContainer}>
          <div className={styles.items}>
            {cartItems.map((item, index) => (
              <CartBox item={item} index={index} key={index} isSheet={true} />
            ))}
          </div>
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
      ) : (
        <div className={styles.noItems}>
          <p>В корзине ничего нет {":("}</p>
          <p>Добавьте товары в корзину, чтобы можно было оформить заказ</p>
        </div>
      )}
    </div>
  );
};

export default CartSheet;
