import styles from "./Cart.module.scss";
import { useSelector } from "react-redux";
import CartBox from "./CartBox/CartBox";
import { useNavigate } from "react-router-dom";

const Cart = ({
  wrapperRef,
  position,
  top,
  height,
  transform,
  toggleCartVisibility,
}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsSum = useSelector((state) => state.cart.itemsSum);

  const dynamicStyle = {
    "--cart-position": position,
    "--cart-top": top,
    "--cart-height": height,
    "--cart-transform": transform,
  };

  const navigate = useNavigate();

  const handleClickSubmit = () => {
    if (cartItems.length > 0) {
      toggleCartVisibility(false);
      navigate("/submit");
    }
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

export default Cart;
