import { useEffect } from "react";
import styles from "./ModalOptions.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../redux/slices/authSlice";

const ModalOptions = ({
  optionsRef,
  toggleOptionsVisibility,
  toggleUserInfoVisibility,
  toggleAddressVisibility,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResize = () => {
    toggleOptionsVisibility();
  };

  const handleInfoOnClick = () => {
    toggleUserInfoVisibility();
    toggleOptionsVisibility(false);
  };

  const handleAddressOnClick = () => {
    toggleAddressVisibility();
    toggleOptionsVisibility(false);
  };

  const handleOrdersOnClick = () => {
    navigate("/orders");
    toggleOptionsVisibility(false);
  };

  const handleLogoutOnClick = () => {
    dispatch(setIsAuth(false));
    toggleOptionsVisibility(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.container} ref={optionsRef}>
      <button className={styles.item} onClick={handleInfoOnClick}>
        Мои данные
      </button>
      <button className={styles.item} onClick={handleAddressOnClick}>
        Мои адреса
      </button>
      <button className={styles.item} onClick={handleOrdersOnClick}>
        Мои заказы
      </button>
      <button className={styles.item} onClick={handleLogoutOnClick}>
        Выйти
      </button>
    </div>
  );
};

export default ModalOptions;
