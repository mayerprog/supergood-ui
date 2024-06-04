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
import {
  setDeliveryTime,
  setItems,
  setNoPromoItemsSum,
  updateSum,
} from "../../redux/slices/cartSlice";
import { addressAPI } from "../../api/addressAPI";
import { persistor } from "../../index";
import { userAPI } from "../../api/userAPI";
import {
  setAddressList,
  setPhone,
  setSalesid,
  setToken,
  setUserData,
} from "../../redux/slices/userSlice";

const LoginModal = ({ loginWrapperRef, toggleLoginVisibility }) => {
  // const [phone, setPhone] = useState("");
  const [phoneToDB, setPhoneToDB] = useState("");
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isPhoneComplete, setIsPhoneComplete] = useState(false);
  const [borderColor, setBorderColor] = useState("#ccc");

  const dataSms = useSelector((state) => state.auth.dataSms);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const addressSelected = useSelector((state) => state.user.addressSelected);
  const phone = useSelector((state) => state.user.phone);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dynamicStyle = {
    "--border-color": borderColor,
  };

  // setting data from getUserPref with token from cookies
  const getOrderInfo = async (token) => {
    if (token) {
      const userPref = await userAPI.getUserPref(token);
      const data = await cartAPI.getOrderInfo({
        token,
        salesid: userPref.salesid,
      });
      const items = Object.values(data.sales.lines);
      const itemsSum = data.sales.amount;
      const deliveryTime = data.sales.calcdlvtime;
      let promo;

      dispatch(setItems(items));
      dispatch(setNoPromoItemsSum(itemsSum));

      if (itemsSum) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].promocode) {
            promo = items[i].lineamount;
          }
        }
        if (promo) {
          dispatch(updateSum(itemsSum + promo));
        } else {
          dispatch(updateSum(itemsSum));
        }
      } else {
        dispatch(updateSum(0));
      }

      if (deliveryTime) dispatch(setDeliveryTime(deliveryTime));

      dispatch(setAddressList(Object.values(userPref.address)));
      dispatch(setSalesid(data.salesid));
      dispatch(setToken(token));
      dispatch(
        setUserData({
          name: data.name,
          birthday: data.birthday,
          birthdaybonus: data.birthdaybonus,
          email: data.email,
          gender: data.gender,
          userid: data.userid,
        })
      );
    }
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
            Cookies.set("token", dataSms.token, { secure: true });

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
    dispatch(setPhone(val));
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
    const token = Cookies.get("token");
    dispatch(setIsAuth(true));
    //putting selected address to DB after authorization
    if (addressSelected) {
      try {
        await addressAPI.saveAddress({
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
        });
      } catch (err) {
        console.log(err);
      }
    }
    //putting items from virtual cart to DB after authorization
    if (cartItems.length > 0) {
      for (let i = 0; i < cartItems.length; i++) {
        try {
          const userPref = await userAPI.getUserPref(token);
          await putToCartAPI(
            cartItems[i],
            token,
            userPref.salesid,
            addressSelected.deptid
          );
          // const cutlery = cartItems.find((item) => item.itemid === 50831);
          // // if no cutlery then add it to Cart
          // if (!cutlery) {
          //   await cartAPI.addToCart({
          //     token,
          //     salesid: userPref.salesid,
          //     id: 0,
          //     deptid: addressSelected.deptid,
          //     itemid: 50831,
          //     qty: 1,
          //   });
          // }
        } catch (err) {
          console.log(err);
        }
      }
    }

    try {
      await getOrderInfo(token);
    } catch (err) {
      console.log(err);
    }

    persistor.purge().then(() => {
      console.log("Persisted state purged");
    });
    toggleLoginVisibility();
    navigate("/");
  };
  const handleSendPhone = async () => {
    if (checked && isPhoneComplete) {
      const response = await authAPI.getSms(phoneToDB);
      if (response.status === "sms") {
        dispatch(setDataSms(response));
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
