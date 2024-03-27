import ReactInputMask from "react-input-mask";
import styles from "./LoginModal.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setIsAuth } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const LoginModal = ({ loginWrapperRef, toggleLoginVisibility }) => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePhone = (event) => {
    let val = event.target.value;
    setPhone(val);
  };
  const handleEnterCode = (event) => {
    let val = event.target.value;
    setCode(val);
  };
  const changeCheckbox = () => {
    setChecked(!checked);
  };

  const handleSendCode = () => {
    if (code) {
      dispatch(setIsAuth(true));
      toggleLoginVisibility();
      navigate("/");
    }
  };
  const handleLogin = () => {
    if (checked && phone) setCodeSent(true);
  };

  return (
    <div className={styles.container} ref={loginWrapperRef}>
      {!codeSent ? (
        <div className={styles.inputContainer}>
          <span>Введите телефон</span>
          <ReactInputMask
            mask="+7 (999) 999-99-99"
            maskChar={null}
            value={phone}
            defaultValue="+7 "
            className={styles.input}
            placeholder="Введите телефон"
            onChange={handleChangePhone}
          />
          <div className={styles.checkboxContainer}>
            <input
              id="data"
              type="checkbox"
              checked={checked}
              onChange={() => changeCheckbox()}
              className={styles.checkbox}
            />
            <label htmlFor="data">Разрешаю обработку персональных данных</label>
          </div>
          <button className={styles.buttonLogin} onClick={handleLogin}>
            <span className={styles.buttonText}>Выслать код</span>
          </button>
        </div>
      ) : (
        <div className={styles.inputContainer}>
          <span>Введите код из смс-сообщения</span>
          <input
            value={code}
            className={styles.inputCode}
            placeholder="ХХХХ"
            onChange={handleEnterCode}
            maxlength="4"
          />
          <button className={styles.buttonStyle} onClick={handleSendCode}>
            <span className={styles.buttonText}>Выслать код повторно</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
