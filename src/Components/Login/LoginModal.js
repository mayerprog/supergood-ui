import ReactInputMask from "react-input-mask";
import styles from "./LoginModal.module.scss";
import { useState } from "react";

const LoginModal = ({ loginWrapperRef }) => {
  const [value, setValue] = useState("");

  const handleChangePhone = (event) => {
    let val = event.target.value;
    // if (!val.startsWith("+7")) {
    //   val = "+7";
    // }
    setValue(val);
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
      </div>
    </div>
  );
};

export default LoginModal;
