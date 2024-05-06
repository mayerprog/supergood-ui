import { useEffect, useState } from "react";
import styles from "./OrdersContainer.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import OrderImages from "../OrderImages/OrderImages";

const OrdersContainer = ({
  setOrderIndex,
  orders,
  scrollToBottom,
  netbooksMediaQuery,
}) => {
  const [isPendingListVisible, setIsPendingListVisible] = useState(true);
  const [isCompletedListVisible, setIsCompletedListVisible] = useState(false);

  const handleChooseOrder = (orderId) => {
    console.log("id", orderId);
    setOrderIndex(orderId);
    netbooksMediaQuery && scrollToBottom();
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
        netbooksMediaQuery={netbooksMediaQuery}
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
  cookingStatus,
  isVisible,
  setIsVisible,
  netbooksMediaQuery,
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

                <span></span>

                <div className={styles.deliveryInfo}>
                  <span className={styles.price}>{order.payAmount} ₽</span>
                  <span className={styles.cooking}>{cookingStatus}</span>
                </div>
              </div>
              <div className={styles.imageContainer}>
                {order.items.map((item, index) => (
                  <div key={index} className={styles.image}>
                    <OrderImages item={item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    )}
  </>
);

export default OrdersContainer;
