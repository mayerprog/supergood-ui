import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderInfoContainer from "./OrderInfoContainer/OrderInfoContainer";
import styles from "./Orders.module.scss";
import OrdersContainer from "./OrdersContainer/OrdersContainer";

const Orders = () => {
  const [orderIndex, setOrderIndex] = useState(null);
  const orders = useSelector((state) => state.order.orders);
  const [chosenOrder, setChosenOrder] = useState(orders[0]);
  const navigate = useNavigate();

  useEffect(() => {
    if (orders.length > 1) {
      const foundItem = orders.find((order) => order.orderId === orderIndex);
      if (foundItem) {
        setChosenOrder(foundItem);
      }
    }
  }, [orderIndex, orders]);

  return (
    <div className={styles.container}>
      <OrdersContainer setOrderIndex={setOrderIndex} orders={orders} />
      <OrderInfoContainer chosenOrder={chosenOrder} />
    </div>
  );
};

export default Orders;
