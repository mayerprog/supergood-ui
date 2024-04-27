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
        <h3>Активируйте промокод</h3>
        <input placeholder="Введите промокод" className={styles.input} />
      </div>
      <div>
        <h3>Используйте бонусы</h3>
        <input className={styles.input} />
      </div>
    </div>
  );
};

export default OrderPromoModal;
