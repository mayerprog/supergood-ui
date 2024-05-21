import { useEffect } from "react";
import styles from "./ModalOptions.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeDataLogin, setIsAuth } from "../../redux/slices/authSlice";
import Cookies from "js-cookie";
import { persistor } from "../../index";

const ModalOptions = ({
  optionsRef,
  toggleOptionsVisibility,
  toggleUserInfoVisibility,
  toggleAddressVisibility,
  toggleBonusVisibility,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResize = () => {
    toggleOptionsVisibility();
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
      case "Бонусы":
        toggleBonusVisibility();
        toggleOptionsVisibility(false);
        break;
      case "Выйти":
        Cookies.remove("token");
        dispatch(setIsAuth(false));
        persistor.purge().then(() => {
          console.log("Persisted state purged");
        });
        toggleOptionsVisibility(false);
        window.location.reload();
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
      {["Мои данные", "Мои адреса", "Мои заказы", "Бонусы", "Выйти"].map(
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
