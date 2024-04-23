import UserInfo from "../UserInfo/UserInfo";
import styles from "./UserModal.module.scss";
import { IoMdClose } from "react-icons/io";

const UserModal = ({ userInfoRef, toggleUserInfoVisibility }) => {
  return (
    <div className={styles.container} ref={userInfoRef}>
      <div onClick={toggleUserInfoVisibility} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <UserInfo toggleUserInfoVisibility={toggleUserInfoVisibility} />
    </div>
  );
};

export default UserModal;
