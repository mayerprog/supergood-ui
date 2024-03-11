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
  const [updatedItem, setUpdatedItem] = useState(null);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const foundCartItem = cartItems.find((cartItem) => itemId === cartItem.id);
    if (foundCartItem) {
      if (foundCartItem.amount.value < 1) {
        dispatch(removeItems(foundCartItem.id));
      }
      setAmount(foundCartItem.amount.value);
      setUpdatedItem({
        ...foundCartItem,
        amount: { ...foundCartItem.amount },
        weightout: { ...foundCartItem.weightout },
      });
    }
  }, [cartItems, itemId]);

  const increment = (event) => {
    event.stopPropagation();

    updatedItem.amount.value = Number(updatedItem.amount.value) + 1;
    updatedItem.price = updatedItem.price * 2;
    updatedItem.weightout.value = Number(updatedItem.weightout.value) * 2;

    dispatch(updateItem(updatedItem));
  };

  const decrement = (event) => {
    event.stopPropagation();

    updatedItem.amount.value = Math.max(
      Number(updatedItem.amount.value) - 1,
      0
    );
    updatedItem.price = updatedItem.price / 2;
    updatedItem.weightout.value = Number(updatedItem.weightout.value) / 2;
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
