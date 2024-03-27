import ReactInputMask from "react-input-mask";
import styles from "./LoginModal.module.scss";
import { useState } from "react";

const LoginModal = ({ loginWrapperRef }) => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChangePhone = (event) => {
    let val = event.target.value;
    setValue(val);
  };
  const changeCheckbox = () => {
    setChecked(true);
  };

  return (
    <div className={styles.container} ref={loginWrapperRef}>
      <div className={styles.inputContainer}>
        <span>Введите телефон</span>
        <ReactInputMask
          mask="+7 (999) 999-99-99"
          maskChar={null}
          value={value}
          defaultValue="+7 "
          className={styles.input}
          placeholder="Введите телефон"
          onChange={handleChangePhone}
        />
        <div className={styles.checkBoxContainer}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => changeCheckbox()}
          />
          <label>Разрешаю обработку персональных данных</label>
        </div>
      </div>
      <button
        className={styles.buttonStyle}
        onClick={() => console.log("Save")}
      >
        <span className={styles.buttonText}>Выслать код</span>
      </button>
    </div>
  );
};

export default LoginModal;
