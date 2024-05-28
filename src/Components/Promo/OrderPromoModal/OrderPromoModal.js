import { useState } from "react";
import styles from "./OrderPromoModal.module.scss";
import { IoMdClose } from "react-icons/io";
import { orderAPI } from "../../../api/orderAPI";
import { useDispatch, useSelector } from "react-redux";
import { cartAPI } from "../../../api/cartAPI";
import { getOrderInfo } from "../../../services/getOrderInfo";
import { setPromo } from "../../../redux/slices/orderSlice";

const OrderPromoModal = ({
  orderPromoWrapperRef,
  toggleOrderPromoVisibility,
}) => {
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
  const promo = useSelector((state) => state.order.promo);

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
  return (
    <div className={styles.container} ref={orderPromoWrapperRef}>
      <div onClick={toggleOrderPromoVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <div>
        <div>
          <h3>Активируйте промокод</h3>
          <input
            placeholder="Введите промокод"
            className={styles.input}
            onChange={(e) => dispatch(setPromo(e.target.value))}
            value={promo}
          />
        </div>
        <button className={styles.buttonStyle} onClick={handlePromoActivation}>
          <span className={styles.buttonText}>Активировать</span>
        </button>
        <div>
          <h3>Используйте бонусы</h3>
          <div className={styles.info}>
            Доступно бонусов: <span>2000</span>
          </div>
          <div className={styles.info}>
            Списать бонусов: <span>180</span>
          </div>
          <input placeholder="Введите количество" className={styles.input} />
          <div className={styles.addInfo}>
            Оплата не более 30% от стоимости заказа
          </div>
        </div>
        <button className={styles.buttonStyle}>
          <span className={styles.buttonText}>Применить</span>
        </button>
      </div>
    </div>
  );
};

export default OrderPromoModal;
