import BonusCards from "../BonusCards/BonusCards";
import styles from "./BonusModal.module.scss";
import { IoMdClose } from "react-icons/io";

const BonusModal = ({ bonusWrapperRef, toggleBonusVisibility }) => {
  const cards = [
    {
      levelRusName: "Приветственный уровень",
      levelEngName: "START",
      cashBack: "Кешбэк 7%",
      backgroundColor: "#EAF2B6",
    },
  ];
  return (
    <div className={styles.container} ref={bonusWrapperRef}>
      <div onClick={toggleBonusVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <div className={styles.bonusContainer}>
        <h3>Баланс бонусных рублей</h3>
        <span>1000 ₽</span>
      </div>
      <BonusCards
        cards={cards}
        message="Совершите заказы еще на 10000 руб. и ваш кэшбэк вырастет до 10%"
        isModal={true}
      />
      <span className={styles.loyaltyInfo}>Подробнее о системе лояльности</span>
    </div>
  );
};

export default BonusModal;
