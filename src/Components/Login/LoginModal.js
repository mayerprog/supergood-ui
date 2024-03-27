import ReactInputMask from "react-input-mask";
import styles from "./LoginModal.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setIsAuth } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const LoginModal = ({ loginWrapperRef, toggleLoginVisibility }) => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isPhoneComplete, setIsPhoneComplete] = useState(false);
  const [borderColor, setBorderColor] = useState("#ccc");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dynamicStyle = {
    "--border-color": borderColor,
  };

  const handleChangePhone = (event) => {
    let val = event.target.value;
    setPhone(val);
    if (val.length < 18) setBorderColor("#c36060");
    else setBorderColor("#ccc");
    setIsPhoneComplete(val.length === 18);
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
    if (checked && isPhoneComplete) setCodeSent(true);
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
            className={styles.input}
            placeholder="Введите телефон"
            onChange={handleChangePhone}
            style={dynamicStyle}
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
            maxLength="4"
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
