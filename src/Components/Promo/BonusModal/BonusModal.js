import { useDispatch, useSelector } from "react-redux";
import BonusCards from "../BonusCards/BonusCards";
import styles from "./BonusModal.module.scss";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { orderAPI } from "../../../api/orderAPI";
import { setLoyalty } from "../../../redux/slices/orderSlice";

const BonusModal = ({ bonusWrapperRef, toggleBonusVisibility }) => {
  const [cards, setCards] = useState([]);
  const token = useSelector((state) => state.user.token);
  const bonus = useSelector((state) => state.order.bonus);

  const dispatch = useDispatch();

  const defineLoyaltyInfo = (spent, level) => {
    console.log(level, spent);
    switch (level) {
      case "START":
        setCards([
          {
            levelRusName: "Приветственный уровень",
            levelEngName: "START",
            cashback: "7",
            nextCashback: "10",
            nextRequirement: "10000",
            untilRequirement: 10000 - spent,
            backgroundColor: "#EAF2B6",
          },
        ]);
        break;
      case "GOOD":
        setCards([
          {
            levelRusName: "Продвинутый уровень",
            levelEngName: "GOOD",
            cashback: "10",
            nextCashback: "15",
            nextRequirement: "25000",
            untilRequirement: 25000 - spent,
            backgroundColor: "#D3E5F9",
          },
        ]);
        break;
      case "SUPERGOOD":
        setCards([
          {
            levelRusName: "Эксклюзивный уровень",
            levelEngName: "SUPERGOOD",
            cashback: "15",
            nextCashback: "15",
            nextRequirement: "",
            untilRequirement: null,
            backgroundColor: "#FBEED5",
          },
        ]);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await orderAPI.getLoyalty(token);
      if (data) {
        const loyaltyInfo = data.bonuses[0];
        if (loyaltyInfo.length === 0) {
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
          defineLoyaltyInfo(loyaltyInfo.bonus_lost, loyaltyInfo.bonus_name);
      }
    })();
  }, []);

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
