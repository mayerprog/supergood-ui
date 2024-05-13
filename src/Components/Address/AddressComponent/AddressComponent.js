import { useDispatch, useSelector } from "react-redux";
import styles from "./AddressComponent.module.scss";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineAdd } from "react-icons/md";
import { updateSelected } from "../../../redux/slices/userSlice";
import AddAddressContainer from "../AddAddressContainer/AddAddressContainer";
import MapComponent from "../../MapComponent/MapComponent";

const AddressComponent = ({
  mapWrapperRef,
  setIsMapOpen,
  isMapOpen,
  isModal,
}) => {
  const [isChangeAddressOpen, setIsChangeAddressOpen] = useState(false); //for updating address
  const [isNewAddressOpen, setIsNewAddressOpen] = useState(false); //for adding new address
  const [addressIndexForChange, setAddressIndexForChange] = useState(null); //for identifying address for update

  const dispatch = useDispatch();

  const addressList = useSelector((state) => state.user.addressList);

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

  const handleChangeSelected = (index) => {
    dispatch(updateSelected(index));
  };
  return (
    <>
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
                  <label>{`${item.street}, ${item.yhouse}`}</label>
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
              streetName={`${item.street}, ${item.yhouse}`}
              closeChangeField={handleCloseChanging}
              item={item}
              setAddressIndexForChange={setAddressIndexForChange}
              isModal={isModal}
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
    </>
  );
};

export default AddressComponent;
