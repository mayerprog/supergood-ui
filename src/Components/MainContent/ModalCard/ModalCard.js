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
        <span className={styles.description}>
          состав: мука пшеничная хлебопекарская в/с, дрожжи хлебопекарские
          сухие, масло растительное рафинированное, сахар-песок, соль поваренная
          пищевая, вода питьевая, соус Гриль, Моцарелла для пиццы, огурцы
          маринованные, свинина маринованная, грудка куриная маринованная,
          бекон. Не содержит ГМО.
        </span>
        <PizzaOptions />
      </div>
    </div>
  );
};

export default ModalCard;
