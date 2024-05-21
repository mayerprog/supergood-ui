import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./AddItemBox.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItems,
  setItems,
  updateItem,
  updateSum,
} from "../../redux/slices/cartSlice";
import { putToCartAPI } from "../../services/putToCartAPI";
import { cartAPI } from "../../api/cartAPI";
import { getOrderInfo } from "../../services/getOrderInfo";

const AddItemBox = ({
  backgroundColor,
  boxShadow,
  width,
  color,
  margin,
  itemId,
  isSheet,
  isOrderCart,
}) => {
  const dynamicStyle = {
    "--counter-bg-color": backgroundColor,
    "--counter-box-shadow": boxShadow,
    "--counter-width": width,
    "--counter-color": color,
    "--counter-margin": margin,
  };

  const [amount, setAmount] = useState(null);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const foundCartItem = cartItems.find(
    (cartItem) => itemId === cartItem.itemid
  );

  useEffect(() => {
    if (foundCartItem) {
      if (!foundCartItem.qty) {
        if (foundCartItem.params.amount.value < 1) {
          dispatch(removeItems(foundCartItem.itemid));
        }
        setAmount(foundCartItem.params.amount.value);
      } else {
        setAmount(foundCartItem.qty);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, itemId, foundCartItem]);

  const increment = async (event) => {
    event.stopPropagation();
    const item = cartItems.find((item) => item.itemid === itemId);
    if (!item) return;

    const updatedItem = {
      ...item,
      params: {
        ...item.params,
        amount: {
          ...item.params.amount,
          value: item.qty
            ? Number(item.qty) + 1
            : Number(item.params.amount.value) + 1,
        },
        weightout: {
          ...item.params.weightout,
          value:
            Number(item.params.weightout.value) + Number(item.initialWeightout),
        },
      },
      price: item.price + item.initialPrice,
    };
    if (isAuth) {
      const response = await putToCartAPI(updatedItem, token, salesid);
      if (response.status === "ok") {
        await getOrderInfo({ token, salesid, dispatch });
      }
    } else {
      dispatch(updateItem(updatedItem));
    }
  };

  const decrement = async (event) => {
    event.stopPropagation();

    const item = cartItems.find((item) => item.itemid === itemId);
    if (!item) return;

    const updatedItem = {
      ...item,
      params: {
        ...item.params,
        amount: {
          ...item.params.amount,
          value: item.qty
            ? Math.max(Number(item.qty) - 1, 0)
            : Math.max(Number(item.params.amount.value) - 1, 0),
        },
        weightout: {
          ...item.params.weightout,
          value:
            Number(item.params.weightout.value) - Number(item.initialWeightout),
        },
      },
      price: item.price - item.initialPrice,
    };
    if (isAuth) {
      const response = await putToCartAPI(updatedItem, token, salesid);
      if (response.status === "ok") {
        const data = await cartAPI.getOrderInfo({ token, salesid });
        const items = Object.values(data.sales.lines);
        const itemsSum = data.sales.amount;
        dispatch(setItems(items));
        dispatch(updateSum(itemsSum));
      }
    } else {
      dispatch(updateItem(updatedItem));
    }
  };

  return (
    <div
      className={styles.counter}
      style={dynamicStyle}
      data-is-sheet={isSheet ? "true" : "false"}
      data-is-ordercart={isOrderCart ? "true" : "false"}
    >
      <button
        onClick={(e) => decrement(e)}
        className={
          !backgroundColor ? styles.cardCounterButton : styles.cartCounterButton
        }
      >
        <AiOutlineMinus className={styles.icon} />
      </button>
      <span className={styles.count}>{amount}</span>
      <button
        onClick={(e) => increment(e)}
        className={
          !backgroundColor ? styles.cardCounterButton : styles.cartCounterButton
        }
      >
        <AiOutlinePlus className={styles.icon} />
      </button>
    </div>
  );
};

export default AddItemBox;
