import { useEffect, useState } from "react";
import styles from "./ProductInfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PizzaOptions from "../PizzaOptions/PizzaOptions";
import AddItemBox from "../../AddItemBox/AddItemBox";
import { addItemToCart } from "../../../services/addItemToCart";

const ProductInfo = ({ itemCardId, toggleMapVisibility, isSheet }) => {
  const items = useSelector((state) => state.item.items);
  const foundItem = items.find((item) => itemCardId === item.itemid);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const addressList = useSelector((state) => state.user.addressList);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [addingInProgress, setAddingInProgress] = useState(false);
  const [amount, setAmount] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(
  //     `Компонент ModalCard отрисован в ${new Date().toLocaleTimeString()}`
  //   );
  // });

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

  return (
    <div>
      <div
        className={styles.productInfo}
        data-is-sheet={isSheet ? "true" : "false"}
      >
        <h2>{foundItem.name}</h2>
        <span
          className={styles.addInfo}
        >{`${foundItem.params.weightout.value} ${foundItem.params.weightout.unit}.`}</span>
        <span className={styles.description}>{foundItem.description}</span>
        {/* {foundItem.catname === "Пицца" && (
          <div className={styles.addInfo}>
            <PizzaOptions />
          </div>
        )} */}
        <span className={styles.addInfo}>Энергетическая ценность на 100 г</span>
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
            <span className={styles.value}>{foundItem.params.carbo.value}</span>
            <span>Углеводы</span>
          </div>
          <div className={styles.energyInfo}>
            <span className={styles.value}>{foundItem.params.kcal.value}</span>
            <span>Калории</span>
          </div>
        </div>
      </div>

      <div className={styles.order} data-is-sheet={isSheet ? "true" : "false"}>
        {amount > 0 ? (
          <AddItemBox
            margin="0 0.5rem"
            itemId={itemCardId}
            backgroundColor="#fcfcfc"
            isSheet={isSheet}
            // boxShadow="0 0 2px rgba(0, 0, 0, 0.2)"
          />
        ) : (
          <button
            className={styles.counter}
            data-is-sheet={isSheet ? "true" : "false"}
            onClick={(event) =>
              addItemToCart({
                event,
                addingInProgress,
                setAddingInProgress,
                toggleMapVisibility,
                addressList,
                dispatch,
                item: foundItem,
                token,
                salesid,
                isAuth,
                cartItems,
              })
            }
          >
            <span className={styles.count}>Добавить</span>
          </button>
        )}
        <span className={styles.price}>{`${foundItem.price} ₽`}</span>
      </div>
    </div>
  );
};

export default ProductInfo;
