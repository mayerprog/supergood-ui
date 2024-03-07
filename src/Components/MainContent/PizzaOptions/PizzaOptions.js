import { useState } from "react";
import styles from "./PizzaOptions.module.scss";

const PizzaOptions = () => {
  const [type, setType] = useState("Стандартное");
  const [size, setSize] = useState("30 см");
  const types = ["Стандартное", "Тонкое"];
  const sizes = ["26 см", "30 см", "40 см"];

  const chooseType = (type, event) => {
    event.stopPropagation();
    setType(type);
  };

  const chooseSize = (sizeOption, event) => {
    event.stopPropagation();
    setSize(sizeOption);
  };

  return (
    <>
      <div className={styles.options}>
        {types.map((option) => (
          <button
            key={option}
            className={type === option ? styles.chosenOption : styles.option}
            onClick={(e) => chooseType(option, e)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className={styles.options}>
        {sizes.map((option) => (
          <button
            key={option}
            className={size === option ? styles.chosenOption : styles.option}
            onClick={(e) => chooseSize(option, e)}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};

export default PizzaOptions;
