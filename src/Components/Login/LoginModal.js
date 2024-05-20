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
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";
import { putToCartAPI } from "../../services/putToCartAPI";
import { cartAPI } from "../../api/cartAPI";
import { setItems, updateSum } from "../../redux/slices/cartSlice";
import { persistor } from "../..";
import { addressAPI } from "../../api/addressAPI";

const LoginModal = ({ loginWrapperRef, toggleLoginVisibility }) => {
  const [phone, setPhone] = useState("");
  const [phoneToDB, setPhoneToDB] = useState("");
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isPhoneComplete, setIsPhoneComplete] = useState(false);
  const [borderColor, setBorderColor] = useState("#ccc");

  const dataSms = useSelector((state) => state.auth.dataSms);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
  const addressSelected = useSelector((state) => state.user.addressSelected);

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
            // setting the token after logging in
            Cookies.set("token", dataSms.token, { expires: 7, secure: true });
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

  const handleLogin = async () => {
    dispatch(setIsAuth(true));
    console.log("token", token);
    console.log("addressSelected", addressSelected);
    try {
      const responseSave = await addressAPI.saveAddress({
        token: token,
        street: addressSelected.street,
        lat: addressSelected.lat,
        long: addressSelected.long,
        addressid: addressSelected.addressid,
        streetid: addressSelected.streetid,
        houseid: addressSelected.houseid,
        entrance: addressSelected.entrance,
        floor: addressSelected.floor,
        flat: addressSelected.flat,
        description: addressSelected.description,
        selected: true,
        // надо уточнить, будут ли изменения в бэке, если нет, то все новые адреса делать по умолчанию selected: true
        // если изменения будут, то вместо true поставить isSelected
      });
      console.log("responseSave", responseSave);
    } catch (err) {
      console.log(err);
    }
    //putting items from virtual cart to DB after authorization
    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        try {
          const response = await putToCartAPI(cartItems[i], token, salesid);
          console.log("responseLogin", response);
          if (response.status === "ok") {
            const data = await cartAPI.getOrderInfo({ token, salesid });
            const items = Object.values(data.sales.lines);
            const itemsSum = data.sales.amount;
            dispatch(setItems(items));
            dispatch(updateSum(itemsSum));
            // persistor.purge().then(() => {
            //   console.log("Persisted state purged");
            // });
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    toggleLoginVisibility();
    // window.location.reload();
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
      <div onClick={toggleLoginVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
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
            autoFocus={true}
          />
          <button className={styles.buttonStyle} onClick={handleSendPhone}>
            <span className={styles.buttonText}>Выслать код повторно</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
