import styles from "./Payment.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = ({}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsSum = useSelector((state) => state.cart.itemsSum);

  let navigate = useNavigate();

  const handleClickSubmit = () => {
    navigate("/submit");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Оплата</h2>
      </div>
      <div>
        <h3>Способ оплаты</h3>
        <div className={styles.paymentDetails}>
          <div className={styles.info}>Банковская карта</div>
          <button
            className={styles.buttonStyle}
            onClick={() => console.log("Pay")}
          >
            <span className={styles.buttonText}>Изменить</span>
          </button>
        </div>
      </div>
      <div className={styles.sumContainer}>
        <h2>Итого</h2>
        <div className={styles.paymentDetails}>
          <div className={styles.info}>Стоимость заказа</div>
          <div className={styles.info}>1056 ₽</div>
        </div>
        <div className={styles.paymentDetails}>
          <div className={styles.info}>Время доставки</div>
          <div className={styles.info}>45 мин</div>
        </div>
        <div className={styles.finalPayment}>
          <button
            className={styles.paymentButtonStyle}
            onClick={() => console.log("Pay")}
          >
            <span className={styles.paymentButtonText}>Оплатить</span>
          </button>
          <div className={styles.sum}>1056 ₽</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
