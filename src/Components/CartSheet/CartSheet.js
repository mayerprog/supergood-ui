import styles from "./CartSheet.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeAllItems } from "../../redux/slices/cartSlice";
import React, { memo, useEffect } from "react";
import CartBox from "../Cart/CartBox/CartBox";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DeviceFooter from "../Footer/DeviceFooter/DeviceFooter";
import { GiShoppingCart } from "react-icons/gi";

const CartSheet = ({
  cartSheetWrapperRef,
  setCartSheetClosing,
  setIsCartSheetOpen,
  cartSheetClosing,
  isCartSheetOpen,
}) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsSum = useSelector((state) => state.cart.itemsSum);

  const handleClosing = () => {
    setCartSheetClosing(false);
    setIsCartSheetOpen(false);
  };

  const toggleDeviceCart = () => {
    setIsCartSheetOpen(true);
  };

  useGSAP(() => {
    const menu = cartSheetWrapperRef.current;
    gsap.from(menu, {
      y: "100%",
      opacity: 1,
      duration: 0.4,
      delay: 0.3,
      ease: "power2.out",
    });
  }, []);
  useGSAP(() => {
    const menu = cartSheetWrapperRef.current;
    if (cartSheetClosing) {
      gsap.to(menu, {
        y: "100%",
        opacity: 1,
        duration: 0.4,
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
        <span className={styles.buttonText}>{itemsSum} ₽</span>
      </div>
    </div>
  );
};

export default CartSheet;
