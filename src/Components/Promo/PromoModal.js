import PromoCards from "./PromoCards/PromoCards";
import styles from "./PromoModal.module.scss";
import { IoMdClose } from "react-icons/io";

const PromoModal = ({ promoWrapperRef, togglePromoVisibility }) => {
  const cards = [
    {
      levelRusName: "Приветственный уровень",
      levelEngName: "START",
      cashBack: "Кешбэк 7%",
      backgroundColor: "#EAF2B6",
    },
  ];
  return (
    <div className={styles.container} ref={promoWrapperRef}>
      <div onClick={togglePromoVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <div className={styles.bonusContainer}>
        <h3>Баланс бонусных рублей</h3>
        <span>1000 ₽</span>
      </div>
      <PromoCards
        cards={cards}
        message="Совершите заказы еще на 10000 руб. и ваш кэшбэк вырастет до 10%"
        isModal={true}
      />
      <span className={styles.loyaltyInfo}>Подробнее о системе лояльности</span>
    </div>
  );
};

export default PromoModal;
