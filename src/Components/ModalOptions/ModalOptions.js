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

  const handleClick = (action) => {
    switch (action) {
      case "Мои данные":
        toggleUserInfoVisibility();
        toggleOptionsVisibility(false);
        break;
      case "Мои адреса":
        toggleAddressVisibility();
        toggleOptionsVisibility(false);
        break;
      case "Мои заказы":
        navigate("/orders");
        toggleOptionsVisibility(false);

        break;
      case "Промокоды":
        toggleOptionsVisibility(false);

        break;
      case "Выйти":
        dispatch(setIsAuth(false));
        toggleOptionsVisibility(false);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.container} ref={optionsRef}>
      {["Мои данные", "Мои адреса", "Мои заказы", "Промокоды", "Выйти"].map(
        (item, index) => (
          <button
            className={styles.item}
            key={index}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        )
      )}
    </div>
  );
};

export default ModalOptions;
