import ReactInputMask from "react-input-mask";
import styles from "./LoginModal.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setIsAuth } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const LoginModal = ({ loginWrapperRef, toggleLoginVisibility }) => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePhone = (event) => {
    let val = event.target.value;
    setValue(val);
  };
  const changeCheckbox = () => {
    setChecked(!checked);
  };

  const handleLogin = () => {
    dispatch(setIsAuth(true));
    toggleLoginVisibility();
    navigate("/");
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
      </div>
      <button
        className={styles.buttonStyle}
        onClick={() => console.log("Save")}
      >
        <span className={styles.buttonText} onClick={handleLogin}>
          Выслать код
        </span>
      </button>
    </div>
  );
};

export default LoginModal;
