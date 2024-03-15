import { useSelector } from "react-redux";
import styles from "./AddressModal.module.scss";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";

const AddressModal = ({ addressRef }) => {
  const address = useSelector((state) => state.address.address);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [addressIndex, setAddressIndex] = useState(null);
  const addressList = [
    "5-я улица Ямского Поля, 7к2",
    "Авангардная улица, 13",
    "Кантемировская улица, 27А",
  ];
  const handlePickAddress = (id) => {
    setAddressIndex(id);
    setIsAddressOpen(true);
  };

  return (
    <div className={styles.container} ref={addressRef}>
      <h2>Мои адреса</h2>
      {addressList.map((item, index) => (
        <>
          {addressIndex !== index && (
            <div style={{ width: "100%" }}>
              <div className={styles.addressContainer}>
                <span>{item}</span>
                <div
                  onClick={() => handlePickAddress(index)}
                  className={styles.edit}
                >
                  <FiEdit size={20} />
                </div>
              </div>
              <div className={styles.line} />
            </div>
          )}
          {isAddressOpen && addressIndex === index && (
            <>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder="Введите улицу"
                  value={item}
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
                <input
                  className={styles.input}
                  placeholder="Комментарий курьеру"
                />
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
            </>
          )}
        </>
      ))}
    </div>
  );
};

export default AddressModal;
