import styles from "./Payment.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateSumHook } from "../../hooks/useUpdateSumHook";
import { removeOrderInfo } from "../../redux/slices/orderSlice";
import { useMediaQuery } from "react-responsive";
import { handleSetOrderInfo } from "../../services/handleSetOrderInfo";
import { setDescription } from "../../redux/slices/userSlice";
import { fetchMinSum } from "../../services/fetchMinSum";

const Payment = ({ togglePayTypeVisibility, toggleOrderPromoVisibility }) => {
  const [cashbackSum, setCashbackSum] = useState();
  const itemsSum = useSelector((state) => state.cart.itemsSum);
  const addressSelected = useSelector((state) => state.user.addressSelected);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const deliveryTime = useSelector((state) => state.cart.deliveryTime);
  const bonusActivated = useSelector((state) => state.order.bonusActivated);
  const loyaltyCard = useSelector((state) => state.order.loyaltyCard);

  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
  const noPromoItemsSum = useSelector((state) => state.cart.noPromoItemsSum);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const netbooksMediaQuery = useMediaQuery({ maxWidth: 1024 });

  const promoItem = cartItems.find((item) => item.promocode != null);

  //to sum total price of items from cart
  useUpdateSumHook();

  const handleAction = () => {
    handleSetOrderInfo({ cartItems, itemsSum, addressSelected, dispatch });
    navigate("/orders");
  };

  const handleClickSubmit = async () => {
    await fetchMinSum({
      token,
      salesid,
      cartItems,
      addressSelected,
      dispatch,
      action: handleAction,
    });
  };

  // defining cashback sum
  useEffect(() => {
    if (loyaltyCard) {
      const cashback = parseInt(loyaltyCard.cashback);
      const cashbackDecimal = cashback / 100;
      const cashbackSum = Math.round(itemsSum * cashbackDecimal);
      setCashbackSum(cashbackSum);
    }
  }, [loyaltyCard, itemsSum]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Оплата</h2>
      </div>
      <div>
        <h3>Способ оплаты</h3>
        <div className={styles.paymentDetails}>
          <div>
            <div className={styles.infoPayType}>Выбрать способ оплаты</div>
            <div className={styles.chosenPayType}>Наличными</div>
          </div>
          <button
            className={styles.buttonStyle}
            onClick={togglePayTypeVisibility}
          >
            <span className={styles.buttonText}>Изменить</span>
          </button>
        </div>
      </div>
      <div className={styles.sumContainer}>
        <h2>Итого</h2>
        <div className={styles.paymentDetails}>
          <div className={styles.info}>Стоимость заказа</div>
          <div className={styles.info}>{noPromoItemsSum} ₽</div>
        </div>

        {bonusActivated && (
          <div className={styles.paymentDetails}>
            <div className={styles.info}>Оплата бонусами</div>
            <div className={styles.info}>-{bonusActivated} ₽</div>
          </div>
        )}
        {promoItem && (
          <div className={styles.paymentDetails}>
            <div className={styles.info}>Скидка по промокоду</div>
            <div className={styles.info}>{promoItem.lineamount} ₽</div>
          </div>
        )}

        <div className={styles.paymentDetails}>
          <div className={styles.info}>Начислим бонусов</div>
          <div className={styles.info}>{cashbackSum} ₽</div>
        </div>

        <div className={styles.paymentDetails}>
          <div className={styles.info}>Время доставки</div>
          <div className={styles.info}>{deliveryTime} мин</div>
        </div>

        <div className={styles.promo} onClick={toggleOrderPromoVisibility}>
          Использовать промокод или бонусы
        </div>
        <input
          className={styles.input}
          placeholder="Ваш комментарий к заказу"
          onChange={(e) => dispatch(setDescription(e.target.value))}
        />
        {!netbooksMediaQuery && (
          <div className={styles.finalPayment}>
            <button
              className={styles.paymentButtonStyle}
              onClick={handleClickSubmit}
            >
              <span className={styles.paymentButtonText}>Оформить заказ</span>
            </button>
            <div className={styles.sum}>{itemsSum} ₽</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
