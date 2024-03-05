import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./AddItemBox.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeItems, updateItem } from "../../redux/slices/cartSlice";

const AddItemBox = ({
  backgroundColor,
  boxShadow,
  width,
  color,
  margin,
  updatedItem,
  amount,
}) => {
  const dynamicStyle = {
    "--counter-bg-color": backgroundColor,
    "--counter-box-shadow": boxShadow,
    "--counter-width": width,
    "--counter-color": color,
    "--counter-margin": margin,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (amount === 0) {
      dispatch(removeItems(updatedItem.id));
    }
  }, [amount, updatedItem.id]);

  const increment = (event) => {
    event.stopPropagation();

    updatedItem.amount.value = Number(updatedItem.amount.value) + 1;
    dispatch(updateItem(updatedItem));
  };

  const decrement = (event) => {
    event.stopPropagation();

    updatedItem.amount.value = Math.max(
      Number(updatedItem.amount.value) - 1,
      0
    );
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
