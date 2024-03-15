import { useSelector } from "react-redux";
import styles from "./AddressModal.module.scss";
import { FiEdit } from "react-icons/fi";
import { MdOutlineAdd } from "react-icons/md";

import { useState } from "react";
import AddAddressComponent from "../AddAddressComponent/AddAddressComponent";

const AddressModal = ({ addressRef }) => {
  const address = useSelector((state) => state.address.address);
  const [isChangeAddressOpen, setIsChangeAddressOpen] = useState(false);
  const [isNewAddressOpen, setIsNewAddressOpen] = useState(false);
  const [addressIndex, setAddressIndex] = useState(null);
  const addressList = [
    "5-я улица Ямского Поля, 7к2",
    "Авангардная улица, 13",
    "Кантемировская улица, 27А",
  ];
  const handlePickAddress = (id) => {
    setAddressIndex(id);
    setIsChangeAddressOpen(true);
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
          {isChangeAddressOpen && addressIndex === index && (
            <AddAddressComponent streetName={item} />
          )}
        </>
      ))}
      {isNewAddressOpen ? (
        <div>
          <h3>Добавьте адрес</h3>
          <AddAddressComponent streetName="" />
        </div>
      ) : (
        <div
          className={styles.addAddress}
          onClick={() => setIsNewAddressOpen(true)}
        >
          <MdOutlineAdd size={25} />
          <span>Добавить адрес</span>
        </div>
      )}
    </div>
  );
};

export default AddressModal;
