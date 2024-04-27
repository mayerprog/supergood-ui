import styles from "./OrderPromoModal.module.scss";
import { IoMdClose } from "react-icons/io";

const OrderPromoModal = ({
  orderPromoWrapperRef,
  toggleOrderPromoVisibility,
}) => {
  return (
    <div className={styles.container} ref={orderPromoWrapperRef}>
      <div onClick={toggleOrderPromoVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <div>
        <div>
          <h3>Активируйте промокод</h3>
          <input placeholder="Введите промокод" className={styles.input} />
        </div>
        <button className={styles.buttonStyle}>
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
