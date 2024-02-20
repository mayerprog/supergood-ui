import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import styles from "./Item.module.scss";
import pizza from "../../../assets/images/pizza.jpg";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { itemAPI } from "../../../api/itemAPI";
// import { setItems } from "../../../redux/slices/itemSlice";

const Item = () => {
  const [count, setCount] = useState(0);
  const [type, setType] = useState("Стандартное");
  const [size, setSize] = useState("30 см");
  //   const items = useSelector((state) => state.task.items);

  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const getItems = await itemAPI.getItems();
  //         // dispatch(setItems(getItems));
  //         console.log("itemAPI", getItems);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     })();
  //   }, []);

  const chooseType = (type) => {
    setType(type);
  };

  const chooseSize = (sizeOption) => {
    setSize(sizeOption);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <button className={styles.card}>
      <img className={styles.productImage} src={pizza} alt="Pizza" />
      <div className={styles.productInfo}>
        <span className={styles.productTitle}>
          Пицца Фермерская SG на пышном тесте и другая важная информация
        </span>
        <div className={styles.options}>
          {["Стандартное", "Тонкое"].map((option) => (
            <button
              key={option}
              className={type === option ? styles.chosenOption : styles.option}
              onClick={() => chooseType(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className={styles.options}>
          {["26 см", "30 см", "40 см"].map((option) => (
            <button
              key={option}
              className={size === option ? styles.chosenOption : styles.option}
              onClick={() => chooseSize(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.order}>
        {count >= 1 ? (
          <button className={styles.counter}>
            <button onClick={decrement} className={styles.counterButton}>
              <AiOutlineMinus />
            </button>
            <span className={styles.count}>{count}</span>
            <button onClick={increment} className={styles.counterButton}>
              <AiOutlinePlus />
            </button>
          </button>
        ) : (
          <button className={styles.counter} onClick={increment}>
            <span className={styles.count}>Добавить</span>
          </button>
        )}
        <div>
          <div className={styles.amount}>920 г.</div>
          <div className={styles.price}>940 р.</div>
        </div>
      </div>
    </button>
  );
};

export default Item;