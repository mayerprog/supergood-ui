import Header from "../../Components/Header/Header";
import styles from "./OrdersPage.module.scss";

const OrdersPage = () => {
  return (
    <div className={styles.container}>
      <Header isProfile={true} />
      <div className={styles.content}>
        <h2>Мои заказы</h2>
        <span>
          Пока нет ваших заказов. Заказать блюда можно{" "}
          <a href="/" className={styles.linkStyle}>
            здесь
          </a>
          .
        </span>
      </div>
    </div>
  );
};

export default OrdersPage;
