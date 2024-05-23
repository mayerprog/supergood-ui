import styles from "./Header.module.scss";
import big_logo from "../../assets/logos/big_logo.png";
import small_logo from "../../assets/logos/small_logo.png";
import { GiShoppingCart } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { forwardRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
      toggleBonusVisibility,
      setIsMainSheetOpen,
      netbooksMediaQuery,
    },
    ref
  ) => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const itemsSum = useSelector((state) => state.cart.itemsSum);
    const addressSelected = useSelector((state) => state.user.addressSelected);

    const navigate = useNavigate();
    const location = useLocation(); // Getting the current location

    const handleProfileClick = () => {
      if (isAuth) navigate("/user");
    };

    const toggleMenu = () => {
      setIsMainSheetOpen(true);
    };
    const openLoginModal = () => {
      console.log("opened");
      toggleLoginVisibility();
    };

    return (
      <header
        className={styles.header}
        ref={ref}
        page-pathname={location.pathname}
      >
        {!netbooksMediaQuery ? (
          <>
            <img
              src={big_logo}
              alt=""
              className={styles.logo}
              onClick={() => navigate("/")}
            />
            {isMainPage && <SearchField setSearchQuery={setSearchQuery} />}
            {isModalOptionsOpen && (
              <div className={styles.optionsOverlay}>
                <ModalOptions
                  toggleOptionsVisibility={toggleOptionsVisibility}
                  optionsRef={optionsRef}
                  toggleUserInfoVisibility={toggleUserInfoVisibility}
                  toggleAddressVisibility={toggleAddressVisibility}
                  toggleBonusVisibility={toggleBonusVisibility}
                />
              </div>
            )}
            <DeliveryAddress
              toggleMapVisibility={toggleMapVisibility}
              isMainPage={isMainPage}
              addressSelected={addressSelected}
              location={location}
            />
            <div className={styles.leftCluster}>
              <SocialMedia />
              {isMainPage && (
                <button
                  className={styles.cartButton}
                  onClick={() => toggleCartVisibility(true)}
                >
                  <GiShoppingCart size={25} className={styles.icon} />
                  <span>{itemsSum ? itemsSum : 0} ₽</span>
                </button>
              )}
              {!isAuth ? (
                <button className={styles.loginButton} onClick={openLoginModal}>
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
            {isAuth ? (
              <CgProfile
                color="#353535"
                className={styles.menu}
                onClick={toggleMenu}
              />
            ) : (
              <IoMenuSharp
                color="#353535"
                className={styles.menu}
                onClick={toggleMenu}
              />
            )}

            <DeliveryAddress
              toggleMapVisibility={toggleMapVisibility}
              isMainPage={isMainPage}
              addressSelected={addressSelected}
              location={location}
            />

            <img
              src={small_logo}
              alt=""
              className={styles.logo}
              onClick={() => navigate("/")}
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
  location,
}) => {
  return (
    <button
      onClick={toggleMapVisibility}
      className={styles.address}
      disabled={!isMainPage}
    >
      <FaLocationDot size={18} color="#7c7c7c" className={styles.icon} />
      {addressSelected ? (
        <span className={styles.buttonText} page-pathname={location.pathname}>
          {`${addressSelected.street}, ${addressSelected.yhouse}`}
        </span>
      ) : (
        <span className={styles.buttonText} page-pathname={location.pathname}>
          Укажите адрес доставки
        </span>
      )}
    </button>
  );
};

export default Header;
