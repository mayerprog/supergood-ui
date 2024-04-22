import styles from "./AddressModal.module.scss";

import React from "react";
import AddressComponent from "../AddressComponent/AddressComponent";

const AddressModal = ({
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
  addressRef,
  isModal,
}) => {
  return (
    <div
      className={styles.container}
      ref={addressRef}
      data-is-modal={isModal ? "true" : "false"}
    >
      <AddressComponent
        mapWrapperRef={mapWrapperRef}
        setIsMapOpen={setIsMapOpen}
        isMapOpen={isMapOpen}
        isModal={isModal}
      />
      {/* <>
        <h2>Выберите адрес доставки</h2>
        {addressList.map((item, index) => (
          <React.Fragment key={index}>
            {addressIndexForChange !== index && (
              <div style={{ width: "100%" }}>
                <div className={styles.addressContainer}>
                  <div>
                    <input
                      type="radio"
                      checked={item.selected}
                      onChange={() => handleChangeSelected(index)}
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
              <AddAddressContainer
                streetName={item.address}
                closeChangeField={handleCloseChanging}
                item={item}
                setAddressIndexForChange={setAddressIndexForChange}
              />
            )}
          </React.Fragment>
        ))}
        {isModal &&
          (isNewAddressOpen ? (
            <>
              <h3>Добавьте адрес</h3>
              <AddAddressContainer
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
      </> */}
    </div>
  );
};

export default AddressModal;
