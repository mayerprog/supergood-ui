import styles from "./AddressModal.module.scss";
import { FiEdit } from "react-icons/fi";
import { MdOutlineAdd } from "react-icons/md";

import { useEffect, useState } from "react";
import AddAddressComponent from "../AddAddressComponent/AddAddressComponent";
import MapComponent from "../../MapComponent/MapComponent";

const AddressModal = ({
  addressRef,
  marginTop,
  maxWidth,
  height,
  isModal,
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
}) => {
  // const address = useSelector((state) => state.address.address);
  const [isChangeAddressOpen, setIsChangeAddressOpen] = useState(false);
  const [isNewAddressOpen, setIsNewAddressOpen] = useState(false);
  const [addressIndex, setAddressIndex] = useState(null);
  const [chosenAddress, setChosenAddress] = useState(null);

  const changeCheckbox = (e) => {
    console.log("e.target.value", e.target.value);
    setChosenAddress(e.target.value);
  };

  const addressList = [
    "5-я улица Ямского Поля, 7к2",
    "Авангардная улица, 13",
    "Кантемировская улица, 27А",
  ];
  const dynamicStyle = {
    "--address-margin-top": marginTop,
    "--address-maxWidth": maxWidth,
    "--address-height": height,
  };
  const handleChangeAddress = (id) => {
    setAddressIndex(id);
    setIsNewAddressOpen(false);
    setIsChangeAddressOpen(true);
  };

  const handleAddAddress = () => {
    setAddressIndex(null);
    setIsChangeAddressOpen(false);
    setIsNewAddressOpen(true);
    if (!isModal) setIsMapOpen(true);
  };

  const handleCloseChanging = () => {
    setAddressIndex(null);
    setIsChangeAddressOpen(false);
    setIsNewAddressOpen(false);
  };

  useEffect(() => {
    console.log("addressIndex", addressIndex);
  }, [addressIndex]);

  return (
    <div className={styles.container} ref={addressRef} style={dynamicStyle}>
      <h2>Выберите адрес доставки</h2>
      {addressList.map((item, index) => (
        <>
          {addressIndex !== index && (
            <div style={{ width: "100%" }}>
              <div className={styles.addressContainer}>
                <div>
                  <input
                    type="radio"
                    checked={chosenAddress == index ? true : false}
                    onChange={(e) => changeCheckbox(e)}
                    value={index}
                  />
                  <label>{item}</label>
                </div>

                <div
                  onClick={() => handleChangeAddress(index)}
                  className={styles.edit}
                >
                  <FiEdit size={20} />
                </div>
              </div>
              <div className={styles.line} />
            </div>
          )}
          {isChangeAddressOpen && addressIndex === index && (
            <AddAddressComponent
              streetName={item}
              closeChangeField={handleCloseChanging}
            />
          )}
        </>
      ))}
      {isModal &&
        (isNewAddressOpen ? (
          <>
            <h3>Добавьте адрес</h3>
            <AddAddressComponent
              streetName=""
              closeChangeField={handleCloseChanging}
            />
          </>
        ) : (
          <div className={styles.addAddress} onClick={handleAddAddress}>
            <MdOutlineAdd size={25} />
            <span>Добавить адрес</span>
          </div>
        ))}

      {!isModal &&
        (isMapOpen ? (
          <div className={styles.cardOverlay}>
            <MapComponent
              mapWrapperRef={mapWrapperRef}
              setIsMapOpen={setIsMapOpen}
            />
          </div>
        ) : (
          <div className={styles.addAddress} onClick={handleAddAddress}>
            <MdOutlineAdd size={25} />
            <span>Добавить адрес</span>
          </div>
        ))}
    </div>
  );
};

export default AddressModal;
