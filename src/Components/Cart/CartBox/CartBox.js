import AddItemBox from "../../AddItemBox.js/AddItemBox";
import styles from "./CartBox.module.scss";

const CartBox = ({ item, index }) => {
  let updatedItem = {
    ...item,
    amount: { ...item.amount },
    weightout: { ...item.weightout },
  };

  return (
    <div className={styles.cartBox} key={index}>
      <img className={styles.cartImage} src={item.imageUrl} alt="Pizza" />
      <div className={styles.cartBoxText}>
        <span className={styles.text}>{item.name}</span>
        <div>
          <span>{`${item.price} ₽`}</span>
          &nbsp;|&nbsp;
          <span>{`${item.weightout.value} г.`}</span>
        </div>
      </div>
      <div className={styles.countBox}>
        <AddItemBox
          amount={item.amount.value}
          updatedItem={updatedItem}
          backgroundColor="#fcfcfc"
          boxShadow="0 0 2px rgba(0, 0, 0, 0.2)"
          width="5em"
          color="#5f5f5f"
        />
      </div>
    </div>
  );
};

export default CartBox;
