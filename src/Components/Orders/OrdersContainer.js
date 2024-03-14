import styles from "./OrdersContainer.module.scss";

const OrdersContainer = () => {
  return (
    <div className={styles.container}>
      <h2>Мои заказы</h2>
      <span>
        Пока нет ваших заказов. Заказать блюда можно{" "}
        <a href="/" className={styles.linkStyle}>
          здесь
        </a>
        .
      </span>
    </div>
  );
};

export default OrdersContainer;
