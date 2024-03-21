import styles from "./Payment.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSum } from "../../redux/slices/cartSlice";
import { useUpdateSumHook } from "../../hooks/useUpdateSumHook";

const Payment = ({}) => {
  const itemsSum = useSelector((state) => state.cart.itemsSum);

  useUpdateSumHook();

  const navigate = useNavigate();

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
          <div className={styles.info}>Выбрать способ оплаты</div>
          <button
            className={styles.buttonStyle}
            onClick={() => console.log("Change payment method")}
          >
            <span className={styles.buttonText}>Изменить</span>
          </button>
        </div>
      </div>
      <div className={styles.sumContainer}>
        <h2>Итого</h2>
        <div className={styles.paymentDetails}>
          <div className={styles.info}>Стоимость заказа</div>
          <div className={styles.info}>{itemsSum} ₽</div>
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
          <div className={styles.sum}>{itemsSum} ₽</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
