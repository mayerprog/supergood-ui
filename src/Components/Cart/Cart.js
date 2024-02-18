import styles from "./Cart.module.scss";

const Cart = () => {
  return (
    <div className={styles.cart}>
      <div className={styles.cartBox}>
        <span className={styles.cartTitle}>Корзина</span>
        <span className={styles.deleteTitle}>Очистить</span>
      </div>
    </div>
  );
};

export default Cart;
