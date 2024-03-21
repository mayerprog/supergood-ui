import styles from "./OrderInfoContainer.module.scss";
import pepperoni from "../../../assets/images/pizza/pepperoni.jpg";

const OrderInfoContainer = ({ orderForDisplay }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Заказ № {orderForDisplay.orderId}</h3>
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
          <img src={pepperoni} alt="pepperoni" />
          <div className={styles.info}>
            <div>Пицца Мексиканская</div>
            <div className={styles.amount}>2 шт.</div>
          </div>
          <div className={styles.info}>1056 ₽</div>
        </div>
        <div className={styles.line} />
      </div>
      <div className={styles.details}>
        <span>Оплата</span>
        <div className={styles.payment}>
          <div className={styles.info}>Стоимость заказа</div>
          <div className={styles.info}>1056 ₽</div>
        </div>
        <div className={styles.payment}>
          <div className={styles.wholeSum}>Итого</div>
          <div className={styles.wholeSum}>1056 ₽</div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoContainer;
