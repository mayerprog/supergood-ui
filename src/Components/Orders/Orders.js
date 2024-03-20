import OrderInfoContainer from "./OrderInfoContainer/OrderInfoContainer";
import styles from "./Orders.module.scss";
import OrdersContainer from "./OrdersContainer/OrdersContainer";

const Orders = () => {
  return (
    <div className={styles.container}>
      <OrdersContainer />
      <OrderInfoContainer />
    </div>
  );
};

export default Orders;
