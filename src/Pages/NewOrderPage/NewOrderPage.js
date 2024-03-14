import { useContext, useState } from "react";
import Header from "../../Components/Header/Header";
import styles from "./NewOrderPage.module.scss";

const NewOrderPage = () => {
  return (
    <div className={styles.container}>
      <Header isProfile={true} />
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>Оформление заказа</h2>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;
