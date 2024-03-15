import styles from "./AddressModal.module.scss";

const AddressModal = ({ addressRef }) => {
  return (
    <div className={styles.container} ref={addressRef}>
      <div className={styles.inputContainer}>
        <span>Имя</span>
        <input className={styles.input} placeholder="Ваше имя" />
      </div>
      <div className={styles.inputContainer}>
        <span>Эл.почта</span>
        <input className={styles.input} placeholder="Электронная почта" />
      </div>
      <div className={styles.inputContainer}>
        <span></span>
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
