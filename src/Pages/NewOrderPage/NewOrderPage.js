import { useContext, useEffect, useState } from "react";
import styles from "./NewOrderPage.module.scss";

const NewOrderPage = ({ setIsMainPage }) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <h2>Оформление заказа</h2>
      </div>
    </div>
  );
};

export default NewOrderPage;
