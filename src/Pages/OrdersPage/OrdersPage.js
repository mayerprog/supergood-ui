import { useEffect } from "react";
import styles from "./OrdersPage.module.scss";

const OrdersPage = ({ setIsMainPage }) => {
  return (
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
  );
};

export default OrdersPage;
