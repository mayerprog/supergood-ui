import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.jpg";
import vk from "../../assets/social-networks/vk.png";
import telegram from "../../assets/social-networks/telegram.png";
import discount from "../../assets/social-networks/discount.png";
import phone from "../../assets/social-networks/phone.png";
import profile from "../../assets/images/user.png";
import { GiShoppingCart } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

import { FaLocationDot } from "react-icons/fa6";
import { forwardRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LevelContext from "../../contexts/LevelContext";
import { setIsAuth } from "../../redux/slices/authSlice";

const Header = forwardRef(
  (
    { toggleCartVisibility, setSearchQuery, toggleMapVisibility, isProfile },
    ref
  ) => {
    const dispatch = useDispatch();

    const isAuth = useSelector((state) => state.auth.isAuth);
    const itemsSum = useSelector((state) => state.cart.itemsSum);

    let navigate = useNavigate();

    const handleLoginClick = () => {
      // where authorisation must take place
      dispatch(setIsAuth(true));
      navigate("/");
    };

    const handleProfileClick = () => {
      if (isAuth) navigate("/user");
    };

    return (
      <header className={styles.header} ref={ref}>
        <img
          src={logo}
          alt=""
          className={styles.logo}
          onClick={() => navigate("/")}
        />
        {!isProfile && (
          <input
            className={styles.input}
            placeholder="Найти блюдо"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}

        <button
          onClick={toggleMapVisibility}
          className={styles.address}
          disabled={isProfile}
        >
          <FaLocationDot size={18} color="#BBBBBB" className={styles.icon} />
          <span className={styles.buttonText}>Укажите адрес доставки</span>
        </button>
        <div className={styles.leftCluster}>
          <div className={styles.socialMedia}>
            <a
              href="https://vk.com/supergoodru"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={vk} alt="vk" />
            </a>
            <a
              href="https://t.me/supergoodru"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={telegram} alt="telegram" />
            </a>
            <a
              href="https://supergood.ru/akcii"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={discount} alt="discount" />
            </a>
            <a
              href="https://supergood.ru/akcii"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={phone} alt="phone" className={styles.lastimg} />
            </a>
          </div>
          {!isAuth && (
            <button
              className={styles.cartButton}
              onClick={toggleCartVisibility}
            >
              <GiShoppingCart size={25} className={styles.icon} />
              <span className={styles.buttonText}>{itemsSum} ₽</span>
            </button>
          )}
          {!isAuth ? (
            <button className={styles.loginButton} onClick={handleLoginClick}>
              Войти
            </button>
          ) : (
            <button
              className={styles.profileButton}
              onClick={handleProfileClick}
            >
              <CgProfile size={30} className={styles.icon} />
            </button>
          )}
        </div>
      </header>
    );
  }
);

export default Header;
