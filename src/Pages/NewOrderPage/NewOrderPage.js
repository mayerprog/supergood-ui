import { useContext, useEffect, useState } from "react";
import styles from "./NewOrderPage.module.scss";
import UserInfo from "../../Components/UserInfo/UserInfo";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";

const NewOrderPage = ({ isUserInfoOpen, isModalAddressOpen }) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <h2>Оформление заказа</h2>
      </div>
    </div>
  );
};

export default NewOrderPage;
