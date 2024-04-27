import { useState } from "react";
import styles from "./PayTypeModal.module.scss";
import { IoMdClose } from "react-icons/io";

const PayTypeModal = ({ payTypeWrapperRef, togglePayTypeVisibility }) => {
  const [chosenValue, setChosenValue] = useState("Наличными курьеру");
  const [showCertificateInput, setShowCertificateInput] = useState(false);

  const handleCheckBox = (event) => {
    setChosenValue(event.target.value);
    switch (event.target.value) {
      case "Подарочный сертификат":
        setShowCertificateInput(true);
        break;
      case "Банковской картой":
        setShowCertificateInput(false);
        break;

      case "Наличными курьеру":
        setShowCertificateInput(false);
        break;
    }
  };

  return (
    <div ref={payTypeWrapperRef} className={styles.container}>
      <div onClick={togglePayTypeVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <h2>Способ оплаты</h2>

      {["Наличными курьеру", "Банковской картой", "Подарочный сертификат"].map(
        (item, index) => (
          <div className={styles.payTypeContainer} key={item}>
            <input
              type="radio"
              checked={item === chosenValue}
              onChange={handleCheckBox}
              value={item}
            />
            <label>{item}</label>
          </div>
        )
      )}
      {showCertificateInput && (
        <div className={styles.certificate}>
          <h3>Подарочный сертификат</h3>
          <p>для активации введите номер</p>

          <div className={styles.inputContainer}>
            <input
              placeholder="Номер сертификата"
              className={styles.input}
            ></input>
            <button className={styles.certButtonStyle}>
              <span className={styles.buttonText}>Активировать</span>
            </button>
          </div>
        </div>
      )}

      <button
        className={styles.buttonStyle}
        onClick={() => console.log("Save")}
      >
        <span className={styles.buttonText}>Выбрать</span>
      </button>
    </div>
  );
};

export default PayTypeModal;
