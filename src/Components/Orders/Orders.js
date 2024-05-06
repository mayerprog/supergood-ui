import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderInfoContainer from "./OrderInfoContainer/OrderInfoContainer";
import styles from "./Orders.module.scss";
import OrdersContainer from "./OrdersContainer/OrdersContainer";
import { useMediaQuery } from "react-responsive";

const Orders = () => {
  const [orderIndex, setOrderIndex] = useState(null);
  const orders = useSelector((state) => state.order.orders);

  const [chosenOrder, setChosenOrder] = useState(orders[0]);

  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  //  const foundItem = items.find((item) => itemCardId === item.itemid);

  const navigate = useNavigate();
  const orderRef = useRef();

  const netbooksMediaQuery = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    console.log("orders", orders);
    if (orders.length > 1) {
      const foundItem = orders.find((order) => order.orderId === orderIndex);
      if (foundItem) {
        setChosenOrder(foundItem);
      }
      console.log("chosenOrder", chosenOrder);
    }
  }, [orderIndex, orders]);

  const scrollToBottom = () => {
    orderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <OrdersContainer
        setOrderIndex={setOrderIndex}
        orders={orders}
        scrollToBottom={scrollToBottom}
        netbooksMediaQuery={netbooksMediaQuery}
      />
      <OrderInfoContainer
        chosenOrder={chosenOrder}
        orderRef={orderRef}
        netbooksMediaQuery={netbooksMediaQuery}
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default Orders;
