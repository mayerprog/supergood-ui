import { useDispatch, useSelector } from "react-redux";
import BonusCards from "../BonusCards/BonusCards";
import styles from "./BonusModal.module.scss";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { orderAPI } from "../../../api/orderAPI";
import { setLoyalty } from "../../../redux/slices/orderSlice";
import { defineLoyaltyInfo } from "../../../services/defineLoyaltyInfo";

const BonusModal = ({ bonusWrapperRef, toggleBonusVisibility }) => {
  const [cards, setCards] = useState([]);
  const bonus = useSelector((state) => state.order.bonus);
  const loyalty = useSelector((state) => state.order.loyalty);

  useEffect(() => {
    if (loyalty) {
      if (loyalty.length === 0) {
        setCards([
          {
            levelRusName: "Приветственный уровень",
            levelEngName: "START",
            cashback: "7",
            nextCashback: "10",
            nextRequirement: "10000",
            untilRequirement: 10000,
            backgroundColor: "#EAF2B6",
          },
        ]);
      } else
        defineLoyaltyInfo(loyalty.bonus_lost, loyalty.bonus_name, setCards);
    }
  }, [loyalty]);

  return (
    <div className={styles.container} ref={bonusWrapperRef}>
      <div onClick={toggleBonusVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <div className={styles.bonusContainer}>
        <h3>Баланс бонусных рублей</h3>
        <span>{bonus}</span>
      </div>
      <BonusCards
        cards={cards}
        message="Совершите заказы еще на"
        isModal={true}
      />
      <div
        className={styles.loyaltyInfo}
        onClick={() => window.open("/loyalty", "rel=noopener noreferrer")}
      >
        Подробнее о системе лояльности
      </div>
    </div>
  );
};

export default BonusModal;
