import styles from "./AddAddressComponent.module.scss";

const AddAddressComponent = ({ streetName, closeChangeField }) => {
  return (
    <>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Введите улицу"
          value={streetName}
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
        <button className={styles.buttonStyle} onClick={closeChangeField}>
          <span className={styles.buttonText}>Отмена</span>
        </button>
      </div>
    </>
  );
};

export default AddAddressComponent;
