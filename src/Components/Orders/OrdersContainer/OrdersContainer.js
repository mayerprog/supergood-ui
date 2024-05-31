import { useEffect, useState } from "react";
import styles from "./OrdersContainer.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import OrderImages from "../OrderImages/OrderImages";
import { useSelector } from "react-redux";
import { handleStatusType } from "../../../services/handleStatusType";
import { getStatusText } from "../../../services/getStatusText";

const OrdersContainer = ({
  setOrderId,
  orders,
  scrollToBottom,
  netbooksMediaQuery,
}) => {
  const [isPendingListVisible, setIsPendingListVisible] = useState(true);
  const [isCompletedListVisible, setIsCompletedListVisible] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeOrders, setActivedOrders] = useState([]);

  const handleChooseOrder = (id) => {
    setOrderId(id);
    netbooksMediaQuery && scrollToBottom();
  };

  useEffect(() => {
    handleStatusType(orders, setCompletedOrders, setActivedOrders);
  }, [orders]);

  return (
    <div className={styles.container}>
      <OrderList
        isVisible={isPendingListVisible}
        setIsVisible={setIsPendingListVisible}
        handleChooseOrder={handleChooseOrder}
        orders={activeOrders}
        title="Активные"
        netbooksMediaQuery={netbooksMediaQuery}
      />
      <OrderList
        isVisible={isCompletedListVisible}
        setIsVisible={setIsCompletedListVisible}
        handleChooseOrder={handleChooseOrder}
        orders={completedOrders}
        title="Завершённые"
      />
    </div>
  );
};

const OrderList = ({
  handleChooseOrder,
  orders,
  title,
  isVisible,
  setIsVisible,
}) => {
  return (
    <>
      <div className={styles.title}>
        <h3>{title}</h3>
        <div onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {isVisible && (
        <div className={styles.ordersList}>
          {orders.map((order, index) => (
            <div key={index}>
              <div className={styles.orderInfo}>
                <div
                  className={styles.order}
                  onClick={() => handleChooseOrder(order.id)}
                >
                  <span className={styles.orderId}>Заказ №{order.shortid}</span>
                  <div className={styles.dateTime}>
                    <span>{order.createddate.substring(0, 16)}</span>
                  </div>
                </div>

                <span></span>

                <div className={styles.deliveryInfo}>
                  <span className={styles.price}>{order.amount} ₽</span>
                  <span className={styles.cooking} title={title}>
                    {getStatusText(order.status)}
                  </span>
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
};

export default OrdersContainer;
