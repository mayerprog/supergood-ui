import UserInfo from "../UserInfo/UserInfo";
import styles from "./UserModal.module.scss";

const UserModal = ({ userInfoRef, toggleUserInfoVisibility }) => {
  return (
    <div className={styles.container} ref={userInfoRef}>
      <UserInfo toggleUserInfoVisibility={toggleUserInfoVisibility} />
    </div>
  );
};

export default UserModal;
