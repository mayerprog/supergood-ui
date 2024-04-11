import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.jpg";
import vk from "../../assets/social-networks/vk.png";
import telegram from "../../assets/social-networks/telegram.png";
import discount from "../../assets/social-networks/discount.png";
import phone from "../../assets/social-networks/phone.png";
import { GiShoppingCart } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { forwardRef, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuth } from "../../redux/slices/authSlice";
import ModalOptions from "../ModalOptions/ModalOptions";

const Header = forwardRef(
  (
    {
      toggleCartVisibility,
      setSearchQuery,
      toggleMapVisibility,
      toggleOptionsVisibility,
      isMainPage,
      isModalOptionsOpen,
      optionsRef,
      toggleUserInfoVisibility,
      toggleAddressVisibility,
      toggleLoginVisibility,
      headerFooterMediaQuery,
    },
    ref
  ) => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const itemsSum = useSelector((state) => state.cart.itemsSum);
    const addressSelected = useSelector(
      (state) => state.address.addressSelected
    );

    const navigate = useNavigate();

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
        {!headerFooterMediaQuery ? (
          <>
            {isMainPage && (
              <div className={styles.inputWrapper}>
                <CiSearch className={styles.inputIcon} size={20} />
                <input
                  className={styles.input}
                  placeholder="Найти блюдо"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            {isModalOptionsOpen && (
              <div className={styles.optionsOverlay}>
                <ModalOptions
                  toggleOptionsVisibility={toggleOptionsVisibility}
                  optionsRef={optionsRef}
                  toggleUserInfoVisibility={toggleUserInfoVisibility}
                  toggleAddressVisibility={toggleAddressVisibility}
                />
              </div>
            )}
            <button
              onClick={toggleMapVisibility}
              className={styles.address}
              disabled={!isMainPage}
            >
              <FaLocationDot
                size={18}
                color="#BBBBBB"
                className={styles.icon}
              />
              {addressSelected ? (
                <span className={styles.buttonText}>{addressSelected}</span>
              ) : (
                <span className={styles.buttonText}>
                  Укажите адрес доставки
                </span>
              )}
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
              {isMainPage && (
                <button
                  className={styles.cartButton}
                  onClick={() => toggleCartVisibility(true)}
                >
                  <GiShoppingCart size={25} className={styles.icon} />
                  <span className={styles.buttonText}>{itemsSum} ₽</span>
                </button>
              )}
              {!isAuth ? (
                <button
                  className={styles.loginButton}
                  onClick={toggleLoginVisibility}
                >
                  Войти
                </button>
              ) : (
                <button
                  className={styles.profileButton}
                  onClick={toggleOptionsVisibility}
                >
                  <CgProfile size={30} className={styles.icon} />
                </button>
              )}
            </div>
          </>
        ) : (
          <div></div>
        )}
      </header>
    );
  }
);

export default Header;
