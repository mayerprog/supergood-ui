import styles from "./PromoModal.module.scss";
import { IoMdClose } from "react-icons/io";

const PromoModal = ({ promoWrapperRef, togglePromoVisibility }) => {
  return (
    <div className={styles.container} ref={promoWrapperRef}>
      <div onClick={togglePromoVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <div className={styles.bonusContainer}>
        <h3>Баланс бонусных рублей</h3>
        <span>1000 ₽</span>
      </div>
      <div className={styles.loyaltyContainer}>
        <h3>Ваш статус лояльности</h3>
        <h1>START</h1>
        <h4>Кэшбэк 7%</h4>
        <span>
          Совершите заказы еще на 10000 руб. и ваш кэшбэк вырастет до 10%
        </span>
      </div>
      <span className={styles.loyaltyInfo}>Подробнее о системе лояльности</span>
    </div>
  );
};

export default PromoModal;
