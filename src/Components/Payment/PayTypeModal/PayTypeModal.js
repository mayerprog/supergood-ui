import { useState } from "react";
import styles from "./PayTypeModal.module.scss";

const PayTypeModal = ({ payTypeWrapperRef }) => {
  const [chosenValue, setChosenValue] = useState("");

  const handleCheckBox = (event) => {
    setChosenValue(event.target.value);
  };

  return (
    <div ref={payTypeWrapperRef} className={styles.container}>
      <h2>Способ оплаты</h2>

      {["Наличными курьеру", "Банковской картой"].map((item, index) => (
        <div className={styles.payTypeContainer} key={item}>
          <input
            type="radio"
            checked={item === chosenValue}
            onChange={handleCheckBox}
            value={item}
          />
          <label>{item}</label>
        </div>
      ))}

      <div className={styles.buttonsContainer}>
        <button
          className={styles.buttonStyle}
          onClick={() => console.log("Save")}
        >
          <span className={styles.buttonText}>Выбрать</span>
        </button>
      </div>
    </div>
  );
};

export default PayTypeModal;
