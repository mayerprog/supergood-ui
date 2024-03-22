import { useEffect, useState } from "react";
import OrderInfoContainer from "./OrderInfoContainer/OrderInfoContainer";
import styles from "./Orders.module.scss";
import OrdersContainer from "./OrdersContainer/OrdersContainer";

const Orders = () => {
  const [orderIndex, setOrderIndex] = useState(null);
  const [chosenOrder, setChosenOrder] = useState();
  const orders = [
    {
      orderId: 1048,
      date: "12.12.2023",
      time: "12:45",
      paymentType: "Наличными курьеру",
      status: "Cancelled",
      price: "1392",
    },
    {
      orderId: 1049,
      date: "12.12.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Cancelled",
      price: "1392",
    },
    {
      orderId: 1050,
      date: "12.12.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Cancelled",
      price: "1392",
    },
    {
      orderId: 1051,
      date: "12.12.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Cancelled",
      price: "1392",
    },
    {
      orderId: 1052,
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
      orderId: 1876,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1877,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1878,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1879,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1880,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1881,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
    {
      orderId: 1882,
      date: "13.01.2023",
      time: "12:45",
      paymentType: "Банковская карта",
      status: "Pending",
      price: "885",
    },
  ];

  useEffect(() => {
    const foundItem = orders.find((order) => order.orderId === orderIndex);
    if (foundItem) {
      setChosenOrder(foundItem);
    }
    console.log("foundItem", foundItem);
  }, [orderIndex]);

  useEffect(() => {
    console.log("chosenOrder", chosenOrder);
  }, [chosenOrder]);

  return (
    <div className={styles.container}>
      <OrdersContainer setOrderIndex={setOrderIndex} orders={orders} />
      <OrderInfoContainer chosenOrder={chosenOrder} />
    </div>
  );
};

export default Orders;
