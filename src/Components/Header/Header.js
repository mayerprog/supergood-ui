import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.jpg";
import { GiShoppingCart } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { forwardRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuth } from "../../redux/slices/authSlice";
import ModalOptions from "../ModalOptions/ModalOptions";
import { IoMenuSharp } from "react-icons/io5";
import { gsap } from "gsap";
import SocialMedia from "../Reusables/SocialMedia/SocialMedia";
import SearchField from "../Reusables/SearchField/SearchField";

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
      setIsMainSheetOpen,
      netbooksMediaQuery,
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

    const toggleMenu = () => {
      setIsMainSheetOpen(true);
    };

    return (
      <header className={styles.header} ref={ref}>
        <img
          src={logo}
          alt=""
          className={styles.logo}
          onClick={() => navigate("/")}
        />
        {!netbooksMediaQuery ? (
          <>
            {isMainPage && <SearchField setSearchQuery={setSearchQuery} />}
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
            <DeliveryAddress
              toggleMapVisibility={toggleMapVisibility}
              isMainPage={isMainPage}
              addressSelected={addressSelected}
            />
            <div className={styles.leftCluster}>
              <SocialMedia />
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
          <>
            <DeliveryAddress
              toggleMapVisibility={toggleMapVisibility}
              isMainPage={isMainPage}
              addressSelected={addressSelected}
            />
            <IoMenuSharp
              // size={33}
              color="#5f5f5f"
              className={styles.menu}
              onClick={toggleMenu}
            />
          </>
        )}
        
      </header>
    );
  }
);

const DeliveryAddress = ({
  toggleMapVisibility,
  isMainPage,
  addressSelected,
}) => {
  return (
    <button
      onClick={toggleMapVisibility}
      className={styles.address}
      disabled={!isMainPage}
    >
      <FaLocationDot size={18} color="#7c7c7c" className={styles.icon} />
      {addressSelected ? (
        <span className={styles.buttonText}>{addressSelected}</span>
      ) : (
        <span className={styles.buttonText}>Укажите адрес доставки</span>
      )}
    </button>
  );
};

export default Header;
