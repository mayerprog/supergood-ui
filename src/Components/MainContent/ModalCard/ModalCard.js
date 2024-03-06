import { useEffect, useState } from "react";
import styles from "./ModalCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PizzaOptions from "../../PizzaOptions.js/PizzaOptions";
import AddItemBox from "../../AddItemBox.js/AddItemBox";
import { addItems } from "../../../redux/slices/cartSlice";

const ModalCard = ({ itemCardId, cardRef }) => {
  const items = useSelector((state) => state.item.items);
  const foundItem = items.find((item) => itemCardId === item.id);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [amount, setAmount] = useState(null);
  const [itemForUpdate, setItemForUpdate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const foundCartItem = cartItems.find(
      (cartItem) => itemCardId === cartItem.id
    );
    if (foundCartItem) {
      setAmount(foundCartItem.amount.value);
      setItemForUpdate({
        ...foundCartItem,
        amount: { ...foundCartItem.amount },
        weightout: { ...foundCartItem.weightout },
      });
    }
  }, [cartItems, itemCardId]);

  const addItemToCart = (event) => {
    event.stopPropagation();
    dispatch(addItems(foundItem));
  };

  return (
    <div ref={cardRef} className={styles.container}>
      <img
        className={styles.productImage}
        src={foundItem.imageUrl}
        alt={foundItem.name}
      />
      <div>
        <div className={styles.productInfo}>
          <h2>{foundItem.name}</h2>
          <span
            className={styles.addInfo}
          >{`${foundItem.weightout.value} г.`}</span>
          <span className={styles.description}>{foundItem.description}</span>
          {(foundItem.category === "Наборы" ||
            foundItem.category === "Пицца") && (
            <div className={styles.addInfo}>
              <PizzaOptions />
            </div>
          )}
          <span className={styles.addInfo}>
            Энергетическая ценность на 100 г
          </span>
          <div className={styles.energyBox}>
            <div className={styles.energyInfo}>
              <span className={styles.value}>{foundItem.protein.value}</span>
              <span>Белки</span>
            </div>
            <div className={styles.energyInfo}>
              <span className={styles.value}>{foundItem.fat.value}</span>
              <span>Жиры</span>
            </div>
            <div className={styles.energyInfo}>
              <span className={styles.value}>{foundItem.carbo.value}</span>
              <span>Углеводы</span>
            </div>
            <div className={styles.energyInfo}>
              <span className={styles.value}>{foundItem.kcal.value}</span>
              <span>Калории</span>
            </div>
          </div>
        </div>

        <div className={styles.order}>
          {amount > 0 ? (
            <AddItemBox
              margin="0 0.5rem"
              amount={amount}
              updatedItem={itemForUpdate}
              backgroundColor="#fcfcfc"
              // boxShadow="0 0 2px rgba(0, 0, 0, 0.2)"
            />
          ) : (
            <button
              className={styles.counter}
              onClick={(e) => addItemToCart(e)}
            >
              <span className={styles.count}>Добавить</span>
            </button>
          )}
          <span className={styles.price}>{`${foundItem.price} ₽`}</span>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
