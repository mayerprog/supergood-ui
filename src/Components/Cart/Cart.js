import styles from "./Cart.module.scss";
import pizza from "../../assets/images/pizza.jpg";
import AddItemBox from "../AddItemBox.js/AddItemBox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = ({ wrapperRef, position, top, height, transform }) => {
  const [count, setCount] = useState(100);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

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
        <div className={styles.cartBox} key={index}>
          <img className={styles.cartImage} src={item.imageUrl} alt="Pizza" />
          <div className={styles.cartBoxText}>
            <span className={styles.text}>{item.name}</span>
            <div>
              <span>940 р.</span>
              &nbsp;|&nbsp;
              <span>920 г.</span>
            </div>
          </div>
          <AddItemBox
            count={count}
            increment={increment}
            decrement={decrement}
            backgroundColor="#fcfcfc"
            boxShadow="0 0 2px rgba(0, 0, 0, 0.2)"
            width="5em"
            color="#5f5f5f"
          />
        </div>
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
