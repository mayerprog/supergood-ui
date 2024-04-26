import { useEffect, useState } from "react";
import styles from "./OrdersContainer.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";

const OrdersContainer = ({ setOrderIndex, orders }) => {
  const [isPendingListVisible, setIsPendingListVisible] = useState(true);
  const [isCompletedListVisible, setIsCompletedListVisible] = useState(false);

  const handleChooseOrder = (orderId) => {
    console.log("id", orderId);
    setOrderIndex(orderId);
  };

  useEffect(() => {
    console.log("orders", orders);
  });

  return (
    <div className={styles.container}>
      <OrderList
        isVisible={isPendingListVisible}
        setIsVisible={setIsPendingListVisible}
        handleChooseOrder={handleChooseOrder}
        orders={orders}
        title="Активные"
        cookingStatus="готовится"
        status="Pending"
      />
      <OrderList
        isVisible={isCompletedListVisible}
        setIsVisible={setIsCompletedListVisible}
        handleChooseOrder={handleChooseOrder}
        orders={orders}
        title="Завершённые"
        cookingStatus="отменён"
        status="Cancelled"
      />
    </div>
  );
};

const OrderList = ({
  handleChooseOrder,
  orders,
  title,
  status,
  isVisible,
  setIsVisible,
}) => (
  <>
    <div className={styles.title}>
      <h3>{title}</h3>
      <div onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
    {isVisible && (
      <div className={styles.ordersList}>
        {orders
          .filter((order) => order.status === status)
          .map((order, index) => (
            <div key={index}>
              <div className={styles.orderInfo}>
                <div
                  className={styles.order}
                  onClick={() => handleChooseOrder(order.orderId)}
                >
                  <span className={styles.orderId}>Заказ {order.orderId}</span>
                  <div className={styles.dateTime}>
                    <span>
                      {order.date} {order.time}
                    </span>
                  </div>
                </div>
                <span>{order.payType}</span>
                <div className={styles.deliveryInfo}>
                  <span className={styles.price}>{order.payAmount} ₽</span>
                  <span className={styles.cooking}>{status}</span>
                </div>
              </div>
              <div className={styles.imageContainer}>
                {order.items.map((item, index) => (
                  <MdImageNotSupported
                    color="#ccc"
                    key={index}
                    className={styles.image}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    )}
  </>
);

export default OrdersContainer;
