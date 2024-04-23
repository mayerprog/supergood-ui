import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./OrdersPage.module.scss";
import AddressModal from "../../Components/Address/AddressModal/AddressModal";
import Orders from "../../Components/Orders/Orders";
import UserModal from "../../Components/UserInfo/UserModal/UserModal";

const OrdersPage = ({
  userInfoRef,
  toggleUserInfoVisibility,
  addressRef,
  isUserInfoOpen,
  isModalAddressOpen,
  toggleAddressVisibility,
}) => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <div className={styles.content}>
      <h2>Мои заказы</h2>
      {!orders.length ? (
        <span>
          Пока нет ваших заказов. Заказать блюда можно
          <a href="/" className={styles.linkStyle}>
            {" "}
            здесь
          </a>
          .
        </span>
      ) : (
        <Orders />
      )}
      {isUserInfoOpen && (
        <div className={styles.cardOverlay}>
          <UserModal
            userInfoRef={userInfoRef}
            toggleUserInfoVisibility={toggleUserInfoVisibility}
          />
        </div>
      )}
      {isModalAddressOpen && (
        <div className={styles.cardOverlay}>
          <AddressModal
            addressRef={addressRef}
            isModal={true}
            toggleAddressVisibility={toggleAddressVisibility}
          />
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
