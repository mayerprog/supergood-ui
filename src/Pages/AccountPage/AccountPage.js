import { useContext, useState } from "react";
import Header from "../../Components/Header/Header";
import styles from "./AccountPage.module.scss";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../redux/slices/authSlice";
import ContactInfo from "../../Components/ContactInfo/ContactInfo";

const AccountPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(setIsAuth(false));
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <Header isProfile={true} />
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>Личный кабинет</h2>
          <div onClick={handleLogoutClick} className={styles.logout}>
            <span>Выйти</span>
            <AiOutlineLogout size={25} className={styles.icon} />
          </div>
        </div>
        <ContactInfo
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default AccountPage;
