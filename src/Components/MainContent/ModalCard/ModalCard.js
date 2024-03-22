import { useEffect, useState } from "react";
import styles from "./ModalCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PizzaOptions from "../PizzaOptions/PizzaOptions";
import AddItemBox from "../../AddItemBox/AddItemBox";
import { addItems } from "../../../redux/slices/cartSlice";
// import noImage from "../../../assets/images/No-Image-Placeholder.svg";

const ModalCard = ({ itemCardId, cardRef }) => {
  const items = useSelector((state) => state.item.items);
  const foundItem = items.find((item) => itemCardId === item.itemid);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [amount, setAmount] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const foundCartItem = cartItems.find(
      (cartItem) => itemCardId === cartItem.itemid
    );
    if (foundCartItem) {
      setAmount(foundCartItem.params.amount.value);
    }
  }, [cartItems, itemCardId]);

  const addItemToCart = (event) => {
    event.stopPropagation();
    dispatch(addItems(foundItem));
  };

  return (
    <div ref={cardRef} className={styles.container}>
      <img className={styles.productImage} alt={foundItem.name} />
      <div>
        <div className={styles.productInfo}>
          <h2>{foundItem.name}</h2>
          <span
            className={styles.addInfo}
          >{`${foundItem.params.weightout.value} г.`}</span>
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
              <span className={styles.value}>
                {foundItem.params.protein.value}
              </span>
              <span>Белки</span>
            </div>
            <div className={styles.energyInfo}>
              <span className={styles.value}>{foundItem.params.fat.value}</span>
              <span>Жиры</span>
            </div>
            <div className={styles.energyInfo}>
              <span className={styles.value}>
                {foundItem.params.carbo.value}
              </span>
              <span>Углеводы</span>
            </div>
            <div className={styles.energyInfo}>
              <span className={styles.value}>
                {foundItem.params.kcal.value}
              </span>
              <span>Калории</span>
            </div>
          </div>
        </div>

        <div className={styles.order}>
          {amount > 0 ? (
            <AddItemBox
              margin="0 0.5rem"
              itemId={itemCardId}
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
