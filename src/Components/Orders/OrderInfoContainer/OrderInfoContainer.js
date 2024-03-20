import styles from "./OrderInfoContainer.module.scss";

const OrderInfoContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Заказ № 1086</h3>
      </div>
      <div className={styles.progress}></div>
      <div className={styles.details}>
        <span>Адрес</span>
        <div className={styles.info}>Москва, Казарменный переулок, 8</div>
        <div className={styles.line} />
      </div>
      <div className={styles.details}>
        <span>Состав заказа</span>
        <div className={styles.orderDetails}>
          <div className={styles.info}>
            <div>Пицца Мексиканская</div>
            <div className={styles.amount}>2 шт.</div>
          </div>
          <div className={styles.info}>1056 ₽</div>
        </div>
        <div className={styles.line} />
      </div>
      <div className={styles.payment}></div>
    </div>
  );
};

export default OrderInfoContainer;
