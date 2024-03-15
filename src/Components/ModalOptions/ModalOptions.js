import { useEffect } from "react";
import styles from "./ModalOptions.module.scss";

const ModalOptions = ({
  optionsRef,
  toggleOptionsVisibility,
  toggleUserInfoVisibility,
  toggleAddressVisibility,
}) => {
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

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.container} ref={optionsRef}>
      <button className={styles.item} onClick={handleInfoOnClick}>
        Мои данные
      </button>
      <button className={styles.item} onClick={handleAddressOnClick}>
        Мои адреса
      </button>
      <button className={styles.item}>Мои заказы</button>
      <button className={styles.item}>Выйти</button>
    </div>
  );
};

export default ModalOptions;
