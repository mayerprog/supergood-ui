import ReactInputMask from "react-input-mask";
import styles from "./LoginModal.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  setIsAuth,
  setDataSms,
  setDataLogin,
} from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authAPI } from "../../api/authAPI";

const LoginModal = ({ loginWrapperRef, toggleLoginVisibility }) => {
  const [phone, setPhone] = useState("");
  const [phoneToDB, setPhoneToDB] = useState("");
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isPhoneComplete, setIsPhoneComplete] = useState(false);
  const [borderColor, setBorderColor] = useState("#ccc");

  const dataSms = useSelector((state) => state.auth.dataSms);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dynamicStyle = {
    "--border-color": borderColor,
  };

  useEffect(() => {
    (async () => {
      try {
        if (code.length === 4) {
          const response = await authAPI.login(
            dataSms.phone,
            code,
            dataSms.token
          );
          if (response.status === "ok") {
            dispatch(setDataLogin(response));
            handleLogin();
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, dataSms]);

  const handleChangePhone = (event) => {
    let val = event.target.value;
    setPhone(val);
    setPhoneToDB(val.replace(/\D/g, ""));
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

  const handleLogin = () => {
    dispatch(setIsAuth(true));
    toggleLoginVisibility();
    navigate("/");
  };
  const handleSendPhone = async () => {
    if (checked && isPhoneComplete) {
      const response = await authAPI.getSms(phoneToDB);
      dispatch(setDataSms(response));
      if (response.status === "sms") {
        setCodeSent(true);
      }
    }
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
          <button className={styles.buttonLogin} onClick={handleSendPhone}>
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
          <button className={styles.buttonStyle}>
            <span className={styles.buttonText}>Выслать код повторно</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
