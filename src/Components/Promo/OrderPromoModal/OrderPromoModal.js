import { useEffect, useState } from "react";
import styles from "./OrderPromoModal.module.scss";
import { IoMdClose } from "react-icons/io";
import { orderAPI } from "../../../api/orderAPI";
import { useDispatch, useSelector } from "react-redux";
import { cartAPI } from "../../../api/cartAPI";
import { getOrderInfo } from "../../../services/getOrderInfo";
import { setBonus, setPromo } from "../../../redux/slices/orderSlice";
import { updateSum } from "../../../redux/slices/cartSlice";

const OrderPromoModal = ({
  orderPromoWrapperRef,
  toggleOrderPromoVisibility,
}) => {
  const [promoChecked, setPromoChecked] = useState(true);
  const [bonusChecked, setBonusChecked] = useState(false);

  const [maxBonus, setMaxBonus] = useState(null);
  const [bonusInput, setBonusInput] = useState("");
  const [isError, setIsError] = useState(false);

  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
  const promo = useSelector((state) => state.order.promo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const bonus = useSelector((state) => state.order.bonus);
  const itemsSum = useSelector((state) => state.cart.itemsSum);

  const promoItem = cartItems.find((item) => item.promocode != null);

  const dispatch = useDispatch();

  const handlePromoActivation = async () => {
    try {
      await orderAPI.setPromoCode({ token, salesid, promo });
      await getOrderInfo({ token, salesid, dispatch });
      toggleOrderPromoVisibility();
    } catch (err) {
      console.log(err);
    }
  };

  const handleBonusActivation = async () => {
    if (bonusInput > maxBonus) {
      setIsError(true);
    } else {
      setIsError(false);
      if (promoItem) {
        await cartAPI.deleteItem({ token, salesid, id: promoItem.id });
        await getOrderInfo({ token, salesid, dispatch });
      }
      dispatch(updateSum(itemsSum - bonusInput));
      toggleOrderPromoVisibility();
    }
  };

  const changeCheckbox = (param) => {
    if (param === promoChecked) {
      setPromoChecked(true);
      setBonusChecked(false);
    } else {
      setBonusChecked(true);
      setPromoChecked(false);
    }
  };

  useEffect(() => {
    let bonusTotal;
    if (promoItem) {
      bonusTotal = Math.round((itemsSum - promoItem.lineamount) * 0.3);
    } else {
      bonusTotal = Math.round(itemsSum * 0.3);
    }
    if (bonusTotal <= bonus) {
      setMaxBonus(bonusTotal);
    } else {
      setMaxBonus(bonus);
    }
  }, [itemsSum, promoItem]);

  return (
    <div className={styles.container} ref={orderPromoWrapperRef}>
      <div onClick={toggleOrderPromoVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <div className={styles.content}>
        <div className={styles.checkboxContainer}>
          <input
            id="data"
            type="checkbox"
            checked={promoChecked}
            onChange={() => changeCheckbox(promoChecked)}
            className={styles.checkbox}
          />
          <label htmlFor="data">Активируйте промокод</label>
        </div>
        {promoChecked && (
          <>
            <input
              placeholder="Введите промокод"
              className={styles.input}
              onChange={(e) => dispatch(setPromo(e.target.value))}
              value={promo}
            />
            <button
              className={styles.buttonStyle}
              onClick={handlePromoActivation}
            >
              <span className={styles.buttonText}>Активировать</span>
            </button>
          </>
        )}

        <div className={styles.checkboxContainer}>
          <input
            id="data"
            type="checkbox"
            checked={bonusChecked}
            onChange={() => changeCheckbox(bonusChecked)}
            className={styles.checkbox}
          />
          <label htmlFor="data">Используйте бонусы</label>
        </div>
        {bonusChecked && (
          <>
            <div className={styles.info}>
              Доступно бонусов: <span>{bonus}</span>
            </div>
            <div className={styles.info}>
              Списать бонусов: <span>{maxBonus}</span>
            </div>
            <input
              placeholder="Введите количество"
              className={styles.input}
              value={bonusInput}
              onChange={(e) => setBonusInput(e.target.value)}
              type="number"
            />
            <div
              className={styles.addInfo}
              data-is-error={isError ? "true" : "false"}
            >
              Оплата не более 30% от стоимости заказа
            </div>
            <button
              className={styles.buttonStyle}
              onClick={handleBonusActivation}
            >
              <span className={styles.buttonText}>Применить</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPromoModal;
