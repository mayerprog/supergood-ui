import { useEffect, useState } from "react";
import styles from "./OrdersPage.module.scss";
import UserInfo from "../../Components/UserInfo/UserInfo";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const OrdersPage = ({
  userInfoRef,
  toggleUserInfoVisibility,
  addressRef,
  isUserInfoOpen,
  isModalAddressOpen,
}) => {
  const [ordersExist, setOrdersExist] = useState(true); //check if client has orders
  const [isPendingListVisible, setIsPendingListVisible] = useState(true);
  const [isCompletedListVisible, setIsCompletedListVisible] = useState(false);

  const orders = [
    {
      orderId: 1048,
      date: "12.12.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Cancelled",
      price: "1392",
    },
    {
      orderId: 1048,
      date: "12.12.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Cancelled",
      price: "1392",
    },
    {
      orderId: 1048,
      date: "12.12.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Cancelled",
      price: "1392",
    },
    {
      orderId: 1048,
      date: "12.12.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Cancelled",
      price: "1392",
    },
    {
      orderId: 1048,
      date: "12.12.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Cancelled",
      price: "1392",
    },
    {
      orderId: 237,
      date: "06.12.2023",
      time: "10:30",
      paymentType: "Наличными курьеру",
      status: "Cancelled",
      price: "968",
    },
    {
      orderId: 212,
      date: "10.12.2023",
      time: "10:15",
      paymentType: "Наличными курьеру",
      status: "Cancelled",
      price: "600",
    },
    {
      orderId: 1893,
      date: "12.10.2023",
      time: "17:25",
      paymentType: "Наличными курьеру",
      status: "Pending",
      price: "1050",
    },
    {
      orderId: 1875,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1875,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1875,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1875,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1875,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1875,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1875,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1875,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
  ];

  return (
    <div className={styles.content}>
      <h2>Мои заказы</h2>
      {!ordersExist ? (
        <span>
          Пока нет ваших заказов. Заказать блюда можно
          <a href="/" className={styles.linkStyle}>
            здесь
          </a>
          .
        </span>
      ) : (
        <div className={styles.ordersContainer}>
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
                  <>
                    <div key={index} className={styles.orderInfo}>
                      <span>Заказ {order.orderId}</span>
                      <span>{order.date}</span>
                      <span className={styles.time}>{order.time}</span>
                      <span>{order.paymentType}</span>
                      <span>Готовится</span>
                      <span className={styles.price}>{order.price} ₽</span>
                    </div>
                    <div className={styles.line} />
                  </>
                ))}
            </div>
          )}
          <div className={styles.title}>
            <h3>Завершенные</h3>
            <div
              onClick={() => setIsCompletedListVisible(!isCompletedListVisible)}
            >
              {isCompletedListVisible ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
          {isCompletedListVisible && (
            <div className={styles.ordersList}>
              {orders
                .filter((order) => order.status === "Cancelled")
                .map((order, index) => (
                  <>
                    <div key={index} className={styles.orderInfo}>
                      <span>Заказ {order.orderId}</span>
                      <span>{order.date}</span>
                      <span className={styles.time}>{order.time}</span>
                      <span>{order.paymentType}</span>
                      <span>Отменен</span>
                      <span className={styles.price}>{order.price} ₽</span>
                    </div>
                    <div className={styles.line} />
                  </>
                ))}
            </div>
          )}
        </div>
      )}
      {isUserInfoOpen && (
        <div className={styles.cardOverlay}>
          <UserInfo
            userInfoRef={userInfoRef}
            toggleUserInfoVisibility={toggleUserInfoVisibility}
          />
        </div>
      )}
      {isModalAddressOpen && (
        <div className={styles.cardOverlay}>
          <AddressModal addressRef={addressRef} />
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
