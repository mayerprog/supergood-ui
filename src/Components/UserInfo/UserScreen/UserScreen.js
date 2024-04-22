import UserInfo from "../UserInfo";
import styles from "./UserScreen.module.scss";
import { useState } from "react";

const UserScreen = ({ toggleUserInfoVisibility }) => {
  return (
    <div className={styles.container}>
      <UserInfo toggleUserInfoVisibility={toggleUserInfoVisibility} />
    </div>
  );
};

export default UserScreen;
