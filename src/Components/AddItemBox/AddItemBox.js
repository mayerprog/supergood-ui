import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./AddItemBox.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItems, updateItem } from "../../redux/slices/cartSlice";

const AddItemBox = ({
  backgroundColor,
  boxShadow,
  width,
  color,
  margin,
  itemId,
}) => {
  const dynamicStyle = {
    "--counter-bg-color": backgroundColor,
    "--counter-box-shadow": boxShadow,
    "--counter-width": width,
    "--counter-color": color,
    "--counter-margin": margin,
  };

  const [amount, setAmount] = useState(null);
  const [price, setPrice] = useState(null);
  const [weightout, setWeightout] = useState(null);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const items = useSelector((state) => state.item.items);

  const foundCartItem = cartItems.find(
    (cartItem) => itemId === cartItem.itemid
  );
  const foundItem = items.find((item) => itemId === item.itemid);

  useEffect(() => {
    setPrice(foundItem.price);
    setWeightout(foundItem.params.weightout.value);
  }, []);

  useEffect(() => {
    if (foundCartItem) {
      if (foundCartItem.params.amount.value < 1) {
        dispatch(removeItems(foundCartItem.itemid));
      }
      setAmount(foundCartItem.params.amount.value);
    }
  }, [cartItems, itemId]);

  const increment = (event) => {
    event.stopPropagation();
    const item = cartItems.find((item) => item.itemid === itemId);
    if (!item) return;

    const updatedItem = {
      ...item,
      params: {
        ...item.params,
        amount: {
          ...item.params.amount,
          value: Number(item.params.amount.value) + 1,
        },
        weightout: {
          ...item.params.weightout,
          value: Number(item.params.weightout.value) + Number(weightout),
        },
      },
      price: item.price + price,
    };

    dispatch(updateItem(updatedItem));
  };

  const decrement = (event) => {
    event.stopPropagation();

    const item = cartItems.find((item) => item.itemid === itemId);
    if (!item) return;

    const updatedItem = {
      ...item,
      params: {
        ...item.params,
        amount: {
          ...item.params.amount,
          value: Math.max(Number(item.params.amount.value) - 1, 0),
        },
        weightout: {
          ...item.params.weightout,
          value: Number(item.params.weightout.value) - Number(weightout),
        },
      },
      price: item.price - price,
    };

    dispatch(updateItem(updatedItem));
  };

  return (
    <div className={styles.counter} style={dynamicStyle}>
      <button
        onClick={(e) => decrement(e)}
        className={
          !backgroundColor ? styles.cardCounterButton : styles.cartCounterButton
        }
      >
        <AiOutlineMinus />
      </button>
      <span className={styles.count}>{amount}</span>
      <button
        onClick={(e) => increment(e)}
        className={
          !backgroundColor ? styles.cardCounterButton : styles.cartCounterButton
        }
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default AddItemBox;
