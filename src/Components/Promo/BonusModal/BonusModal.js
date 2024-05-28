import { useDispatch, useSelector } from "react-redux";
import BonusCards from "../BonusCards/BonusCards";
import styles from "./BonusModal.module.scss";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { orderAPI } from "../../../api/orderAPI";
import { setLoyaltyCard } from "../../../redux/slices/orderSlice";
import { defineLoyaltyInfo } from "../../../services/defineLoyaltyInfo";

const BonusModal = ({ bonusWrapperRef, toggleBonusVisibility }) => {
  const bonus = useSelector((state) => state.order.bonus);
  const loyaltyCard = useSelector((state) => state.order.loyaltyCard);

  useEffect(() => {
    console.log("loyaltyCard", loyaltyCard);
  }, [loyaltyCard]);

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
        card={loyaltyCard}
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
