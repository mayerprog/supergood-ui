import { useContext } from "react";
import Header from "../../Components/Header/Header";
import styles from "./AccountPage.module.scss";
import LevelContext from "../../contexts/LevelContext";
import Cart from "../../Components/Cart/Cart";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const { setIsAuthorised } = useContext(LevelContext);
  let navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsAuthorised(false);
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <Header isProfile={true} />
      <div className={styles.content}>
        <h2>Personal Information</h2>
        <div onClick={handleLogoutClick}>
          <AiOutlineLogout size={25} className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
