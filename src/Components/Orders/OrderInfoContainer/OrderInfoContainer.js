import styles from "./OrderInfoContainer.module.scss";
import pepperoni from "../../../assets/images/pizza/pepperoni.jpg";

import ProgressTracking from "../ProgressTracking/ProgressTracking";
import { MdImageNotSupported } from "react-icons/md";
// import { IoArrowBackOutline } from "react-icons/io5";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import OrderImages from "../OrderImages/OrderImages";

const OrderInfoContainer = ({
  chosenOrder,
  netbooksMediaQuery,
  setChosenOrder,
  orderRef,
  scrollToTop,
}) => {
  return (
    <div className={styles.container} ref={orderRef}>
      <div className={styles.header}>
        <h3>Заказ № {chosenOrder.orderId}</h3>
      </div>
      <ProgressTracking />
      <div className={styles.details}>
        <span>Адрес</span>
        <div className={styles.info}>{chosenOrder.address}</div>
        <div className={styles.line} />
      </div>
      <div className={styles.details}>
        <span>Состав заказа</span>
        {chosenOrder.items.map((item, index) => (
          <div className={styles.orderDetails}>
            <OrderImages item={item} detailInfo={true} />

            <div className={styles.name}>
              <div>{item.name}</div>
              <div className={styles.amount}>{item.params.amount.value}</div>
            </div>
            <div className={styles.info}>{item.price} ₽</div>
          </div>
        ))}
        <div className={styles.line} />
      </div>
      <div className={styles.details}>
        <span>Способ оплаты</span>
        <div className={styles.orderDetails}>
          <div className={styles.info}>{chosenOrder.payType}</div>
        </div>

        <div className={styles.line} />
      </div>
      <div className={styles.details}>
        <span>Оплата</span>
        <div className={styles.orderDetails}>
          <div className={styles.info}>Стоимость заказа</div>
          <div className={styles.info}>{chosenOrder.payAmount} ₽</div>
        </div>
        <div className={styles.orderDetails}>
          <div className={styles.wholeSum}>Итого</div>
          <div className={styles.wholeSum}>{chosenOrder.payAmount} ₽</div>
        </div>
      </div>
      {netbooksMediaQuery && (
        <IoArrowUpCircleSharp className={styles.icon} onClick={scrollToTop} />
      )}
    </div>
  );
};

export default OrderInfoContainer;
