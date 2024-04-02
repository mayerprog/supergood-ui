import styles from "./AddressModal.module.scss";
import { FiEdit } from "react-icons/fi";
import { MdOutlineAdd } from "react-icons/md";

import { useEffect, useState } from "react";
import AddAddressComponent from "../AddAddressComponent/AddAddressComponent";
import MapComponent from "../../MapComponent/MapComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateSelected } from "../../../redux/slices/addressSlice";

const AddressModal = ({
  addressRef,
  marginTop,
  maxWidth,
  maxHeight,
  isModal,
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
}) => {
  // const address = useSelector((state) => state.address.address);
  const [isChangeAddressOpen, setIsChangeAddressOpen] = useState(false); //for updating address
  const [isNewAddressOpen, setIsNewAddressOpen] = useState(false); //for adding new address
  const [addressIndexForChange, setAddressIndexForChange] = useState(null); //for identifying address for update
  const [chosenAddress, setChosenAddress] = useState(null);

  const dispatch = useDispatch();

  const addressList = useSelector((state) => state.address.addressList);

  const dynamicStyle = {
    "--address-margin-top": marginTop,
    "--address-maxWidth": maxWidth,
    "--address-maxHeight": maxHeight,
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

  const handleChangeSelected = (id) => {
    dispatch(updateSelected(id));
    // setChosenAddress(id);
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
            <div style={{ width: "100%" }} key={index}>
              <div className={styles.addressContainer}>
                <div>
                  <input
                    type="radio"
                    checked={item.selected}
                    onChange={() => handleChangeSelected(item.id)}
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
