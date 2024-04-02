import styles from "./AddressModal.module.scss";
import { FiEdit } from "react-icons/fi";
import { MdOutlineAdd } from "react-icons/md";

import { useEffect, useState } from "react";
import AddAddressComponent from "../AddAddressComponent/AddAddressComponent";
import MapComponent from "../../MapComponent/MapComponent";
import { useSelector } from "react-redux";

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
  const [addressIndexForChange, setAddressIndexForChange] = useState(null);
  const [chosenAddress, setChosenAddress] = useState(null);

  const addressList = useSelector((state) => state.address.addressList);

  const changeCheckbox = (e) => {
    setChosenAddress(e.target.value);
  };

  const dynamicStyle = {
    "--address-margin-top": marginTop,
    "--address-maxWidth": maxWidth,
    "--address-height": height,
  };
  const handleChangeAddress = (id) => {
    setAddressIndexForChange(id);
    setIsNewAddressOpen(false);
    setIsChangeAddressOpen(true);
  };

  const handleAddAddress = () => {
    setAddressIndexForChange(null);
    setIsChangeAddressOpen(false);
    setIsNewAddressOpen(true);
    if (!isModal) setIsMapOpen(true);
  };

  const handleCloseChanging = () => {
    setAddressIndexForChange(null);
    setIsChangeAddressOpen(false);
    setIsNewAddressOpen(false);
  };

  useEffect(() => {
    console.log("addressIndex", addressIndexForChange);
  }, [addressIndexForChange]);

  return (
    <div
      className={styles.container}
      ref={addressRef}
      style={dynamicStyle}
      data-is-modal={isModal ? "true" : "false"}
    >
      <h2>Выберите адрес доставки</h2>
      {addressList.map((item, index) => (
        <>
          {addressIndexForChange !== index && (
            <div style={{ width: "100%" }}>
              <div className={styles.addressContainer}>
                <div>
                  <input
                    type="radio"
                    checked={chosenAddress == index ? true : false}
                    onChange={(e) => changeCheckbox(e)}
                    value={index}
                  />
                  <label>{item.address}</label>
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
          {isChangeAddressOpen && addressIndexForChange === index && (
            <AddAddressComponent
              streetName={item.address}
              closeChangeField={handleCloseChanging}
              item={item}
              setIsChangeAddressOpen={setIsChangeAddressOpen}
              setAddressIndexForChange={setAddressIndexForChange}
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
