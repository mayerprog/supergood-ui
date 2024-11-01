import { useState } from "react";
import styles from "./PayTypeModal.module.scss";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setChangeAmount } from "../../../redux/slices/orderSlice";

const PayTypeModal = ({
  payTypeWrapperRef,
  togglePayTypeVisibility,
  setChosenPayType,
  chosenValue,
  setChosenValue,
}) => {
  // const [showCertificateInput, setShowCertificateInput] = useState(false);
  const [showCashInput, setShowCashInput] = useState(true);

  const dispatch = useDispatch();

  const handleCheckBox = (event) => {
    setChosenValue(event.target.value);
    switch (event.target.value) {
      // case "Подарочный сертификат":
      //   setShowCertificateInput(true);
      //   setShowCashInput(false);
      //   break;
      // case "Банковской картой":
      //   setShowCertificateInput(false);
      //   setShowCashInput(false);
      //   break;

      case "Наличными курьеру":
        // setShowCertificateInput(false);
        setShowCashInput(true);
        break;
      case "Картой курьеру":
        // setShowCertificateInput(false);
        setShowCashInput(false);
        break;
    }
  };

  const handleSetChange = (value) => {
    dispatch(setChangeAmount(parseInt(value)));
  };

  return (
    <div ref={payTypeWrapperRef} className={styles.container}>
      <div onClick={togglePayTypeVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <h2>Способ оплаты</h2>

      {["Наличными курьеру", "Картой курьеру"].map((item, index) => (
        <div className={styles.payTypeContainer} key={index}>
          <input
            type="radio"
            checked={item === chosenValue}
            onChange={handleCheckBox}
            value={item}
          />
          <label>{item}</label>
        </div>
      ))}
      {showCashInput && (
        <div className={styles.cashInput}>
          <div className={styles.inputContainer}>
            <input
              placeholder="Сдача с"
              className={styles.input}
              onChange={(e) => handleSetChange(e.target.value)}
              type="number"
            />
            {/* <button className={styles.buttonStyle} onClick={handleSetChange}>
              <span className={styles.buttonText}>ОК</span>
            </button> */}
          </div>
        </div>
      )}

      {/* {showCertificateInput && (
        <div className={styles.certificate}>
          <h3>Подарочный сертификат</h3>
          <p>для активации введите номер</p>

          <div className={styles.inputContainer}>
            <input placeholder="Номер сертификата" className={styles.input} />
            <button className={styles.certButtonStyle}>
              <span className={styles.buttonText}>Активировать</span>
            </button>
          </div>
        </div>
      )} */}

      <button
        className={styles.buttonStyle}
        onClick={() => {
          setChosenPayType(chosenValue);
          togglePayTypeVisibility();
        }}
      >
        <span className={styles.buttonText}>Выбрать</span>
      </button>
    </div>
  );
};

export default PayTypeModal;
