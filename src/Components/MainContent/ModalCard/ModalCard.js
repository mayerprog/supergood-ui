import { useEffect } from "react";
import styles from "./ModalCard.module.scss";
import { useSelector } from "react-redux";
import PizzaOptions from "../../PizzaOptions.js/PizzaOptions";

const ModalCard = ({ itemCardId, cardRef }) => {
  const items = useSelector((state) => state.item.items);
  const foundCardItem = items.find((item) => itemCardId === item.id);

  return (
    <div ref={cardRef} className={styles.container}>
      <img
        className={styles.productImage}
        src={foundCardItem.imageUrl}
        alt={foundCardItem.name}
      />
      <div className={styles.productInfo}>
        <h2>{foundCardItem.name}</h2>
        <span className={styles.addInfo}>920 г.</span>
        <span className={styles.description}>{foundCardItem.description}</span>
        {(foundCardItem.category === "Наборы" ||
          foundCardItem.category === "Пицца") && (
          <div className={styles.addInfo}>
            <PizzaOptions />
          </div>
        )}
        <span className={styles.addInfo}>Энергетическая ценность на 100 г</span>
        <div className={styles.energyBox}>
          <div className={styles.energyInfo}>
            <span className={styles.value}>{foundCardItem.protein.value}</span>
            <span>Белки</span>
          </div>
          <div className={styles.energyInfo}>
            <span className={styles.value}>{foundCardItem.fat.value}</span>
            <span>Жиры</span>
          </div>
          <div className={styles.energyInfo}>
            <span className={styles.value}>{foundCardItem.carbo.value}</span>
            <span>Углеводы</span>
          </div>
          <div className={styles.energyInfo}>
            <span className={styles.value}>{foundCardItem.kcal.value}</span>
            <span>Калории</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
