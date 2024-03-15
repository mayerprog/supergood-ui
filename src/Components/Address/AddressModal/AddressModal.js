import { useSelector } from "react-redux";
import styles from "./AddressModal.module.scss";

const AddressModal = ({ addressRef }) => {
  const address = useSelector((state) => state.address.address);

  return (
    <div className={styles.container} ref={addressRef}>
      <h2>Мои адреса</h2>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Введите улицу"
          value={address}
        />
        <div className={styles.details}>
          <input
            className={styles.detailsInput}
            placeholder="Дом"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Кв./офис"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Домофон"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Подъезд"
            // value={address}
          />
          <input
            className={styles.detailsInput}
            placeholder="Этаж"
            // value={address}
          />
        </div>
        <input className={styles.input} placeholder="Комментарий курьеру" />
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.buttonStyle}
          onClick={() => console.log("Save")}
        >
          <span className={styles.buttonText}>Сохранить</span>
        </button>
        <button
          className={styles.buttonStyle}
          onClick={() => console.log("Back to menu")}
        >
          <span className={styles.buttonText}>Отмена</span>
        </button>
      </div>
    </div>
  );
};

export default AddressModal;
