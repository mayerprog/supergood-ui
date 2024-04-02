import { useState } from "react";
import styles from "./OrdersContainer.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const OrdersContainer = ({ setOrderIndex, orders }) => {
  const [isPendingListVisible, setIsPendingListVisible] = useState(true);
  const [isCompletedListVisible, setIsCompletedListVisible] = useState(false);

  const handleChooseOrder = (orderId) => {
    console.log("id", orderId);
    setOrderIndex(orderId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Активные</h3>
        <div onClick={() => setIsPendingListVisible(!isPendingListVisible)}>
          {isPendingListVisible ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {isPendingListVisible && (
        <div className={styles.ordersList}>
          {orders
            .filter((order) => order.status === "Pending")
            .map((order, index) => (
              <div key={index}>
                <div className={styles.orderInfo}>
                  <div
                    className={styles.order}
                    onClick={() => handleChooseOrder(order.orderId)}
                  >
                    <span>Заказ {order.orderId}</span>
                  </div>
                  <span>{order.date}</span>
                  <span>{order.time}</span>
                  <span>{order.paymentType}</span>
                  <span>Готовится</span>
                  <span className={styles.price}>{order.price} ₽</span>
                </div>
                <div className={styles.line} />
              </div>
            ))}
        </div>
      )}
      <div className={styles.title}>
        <h3>Завершенные</h3>
        <div onClick={() => setIsCompletedListVisible(!isCompletedListVisible)}>
          {isCompletedListVisible ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {isCompletedListVisible && (
        <div className={styles.ordersList}>
          {orders
            .filter((order) => order.status === "Cancelled")
            .map((order, index) => (
              <div>
                <div key={index} className={styles.orderInfo}>
                  <div
                    className={styles.order}
                    onClick={() => handleChooseOrder(order.orderId)}
                  >
                    <span>Заказ {order.orderId}</span>
                  </div>
                  <span>{order.date}</span>
                  <span className={styles.time}>{order.time}</span>
                  <span>{order.paymentType}</span>
                  <span>Отменен</span>
                  <span className={styles.price}>{order.price} ₽</span>
                </div>
                <div className={styles.line} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrdersContainer;
