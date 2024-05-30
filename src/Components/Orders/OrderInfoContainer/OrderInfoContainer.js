import styles from "./OrderInfoContainer.module.scss";

import ProgressTracking from "../ProgressTracking/ProgressTracking";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import OrderImages, { OrderImage } from "../OrderImages/OrderImages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handlePayType } from "../../../services/handlePayType";

const OrderInfoContainer = ({
  chosenOrder,
  netbooksMediaQuery,
  orderRef,
  scrollToTop,
}) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [payType, setPayType] = useState("");

  const ordersItems = useSelector((state) => state.order.ordersItems);

  useEffect(() => {
    if (ordersItems.length > 0) {
      const filteredOrder = ordersItems.find(
        (item) => item.id === chosenOrder.id
      );
      const items = Object.values(filteredOrder.lines);
      setFilteredItems(items);
    }
  }, [ordersItems, chosenOrder]);

  useEffect(() => {
    handlePayType(chosenOrder.paym_type, setPayType);
  }, [chosenOrder.paym_type]);

  return (
    <div className={styles.container} ref={orderRef}>
      <div className={styles.header}>
        <h3>Заказ № {chosenOrder.shortid}</h3>
      </div>
      <ProgressTracking />
      <div className={styles.details}>
        <span>Адрес</span>
        <div className={styles.info}>{chosenOrder.street_name}</div>
        <div className={styles.line} />
      </div>
      <div className={styles.details}>
        <span>Состав заказа</span>
        {filteredItems.map((item, index) => (
          <div className={styles.orderDetails}>
            <OrderImage item={item} detailInfo={true} />

            <div className={styles.productInfo}>
              <div className={styles.name}>{item.itemname}</div>
              <div className={styles.amount}>{item.qty}</div>
            </div>
            <div className={styles.infoPrice}>{item.lineamount} ₽</div>
          </div>
        ))}
        <div className={styles.line} />
      </div>
      <div className={styles.details}>
        <span>Способ оплаты</span>
        <div className={styles.orderDetails}>
          <div className={styles.info}>{payType}</div>
        </div>

        <div className={styles.line} />
      </div>
      <div className={styles.details}>
        <span>Оплата</span>
        {/* <div className={styles.orderDetails}>
          <div className={styles.info}>Стоимость заказа</div>
          <div className={styles.info}>{chosenOrder.payAmount} ₽</div>
        </div> */}
        <div className={styles.orderDetails}>
          <div className={styles.wholeSum}>Стоимость заказа</div>
          <div className={styles.wholeSum}>{chosenOrder.amount} ₽</div>
        </div>
      </div>
      {netbooksMediaQuery && (
        <IoArrowUpCircleSharp className={styles.icon} onClick={scrollToTop} />
      )}
    </div>
  );
};

export default OrderInfoContainer;
