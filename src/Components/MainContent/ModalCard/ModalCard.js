import { useEffect, useState } from "react";
import styles from "./ModalCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PizzaOptions from "../PizzaOptions/PizzaOptions";
import AddItemBox from "../../AddItemBox/AddItemBox";
import { addItems } from "../../../redux/slices/cartSlice";
import { MdImageNotSupported } from "react-icons/md";
import { useImageLoaded } from "../../../hooks/useImageLoaded";
import { baseURL } from "../../../config";

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
    } else {
      setAmount(0);
    }
  }, [cartItems, itemCardId]);

  const [ref, loaded, onLoad] = useImageLoaded();

  const uid = foundItem.img[0].uid;
  const uri = `${baseURL}/getFile?uid=${uid}`;

  const addItemToCart = (event) => {
    event.stopPropagation();
    dispatch(
      addItems({
        ...foundItem,
        initialPrice: foundItem.price,
        initialWeightout: foundItem.params.weightout.value,
      })
    );
  };

  return (
    <div ref={cardRef} className={styles.container}>
      {loaded ? (
        <img
          className={styles.productImage}
          alt={foundItem.name}
          src={uri}
          ref={ref}
          onLoad={onLoad}
        />
      ) : (
        <div className={styles.productImage}>
          <MdImageNotSupported size={330} color="#ccc" />
        </div>
      )}
      <div>
        <div className={styles.productInfo}>
          <h2>{foundItem.name}</h2>
          <span
            className={styles.addInfo}
          >{`${foundItem.params.weightout.value} г.`}</span>
          <span className={styles.description}>{foundItem.description}</span>
          {foundItem.catname === "Пицца" && (
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
