import { useEffect } from "react";
import styles from "./ModalOptions.module.scss";

const ModalOptions = ({ optionsRef, toggleOptionsVisibility }) => {
  const handleResize = () => {
    toggleOptionsVisibility();
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.container} ref={optionsRef}>
      <button className={styles.item}>Мои данные</button>
      <button className={styles.item}>Мои адреса</button>
      <button className={styles.item}>Мои заказы</button>
      <button className={styles.item}>Выйти</button>
    </div>
  );
};

export default ModalOptions;
