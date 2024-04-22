import UserInfo from "../UserInfo/UserInfo";
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
