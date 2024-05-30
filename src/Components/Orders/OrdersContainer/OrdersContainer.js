import { useEffect, useState } from "react";
import styles from "./OrdersContainer.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import OrderImages from "../OrderImages/OrderImages";
import { useSelector } from "react-redux";

const OrdersContainer = ({
  setOrderId,
  orders,
  scrollToBottom,
  netbooksMediaQuery,
}) => {
  const [isPendingListVisible, setIsPendingListVisible] = useState(true);
  const [isCompletedListVisible, setIsCompletedListVisible] = useState(false);

  const handleChooseOrder = (id) => {
    setOrderId(id);
    netbooksMediaQuery && scrollToBottom();
  };

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
      {/* <OrderList
        isVisible={isCompletedListVisible}
        setIsVisible={setIsCompletedListVisible}
        handleChooseOrder={handleChooseOrder}
        orders={orders}
        title="Завершённые"
        cookingStatus="отменён"
        status="Cancelled"
      /> */}
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
          // .filter((order) => order.status === status)
          .map((order, index) => (
            <div key={index}>
              <div className={styles.orderInfo}>
                <div
                  className={styles.order}
                  onClick={() => handleChooseOrder(order.id)}
                >
                  <span className={styles.orderId}>Заказ {order.shortid}</span>
                  <div className={styles.dateTime}>
                    <span>{order.createddate.substring(0, 16)}</span>
                  </div>
                </div>

                <span></span>

                <div className={styles.deliveryInfo}>
                  <span className={styles.price}>{order.amount} ₽</span>
                  <span className={styles.cooking}>{cookingStatus}</span>
                </div>
              </div>
              <div className={styles.imageContainer}>
                <OrderImages order={order} detailInfo={false} />
              </div>
            </div>
          ))}
      </div>
    )}
  </>
);

export default OrdersContainer;
