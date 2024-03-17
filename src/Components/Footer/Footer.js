import styles from "./Footer.module.scss";
import logo from "../../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  let navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <img
        src={logo}
        alt=""
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      <p>Author: Hege Refsnes</p>
      <p>
        <a href="mailto:hege@example.com">hege@example.com</a>
      </p>
    </footer>
  );
};

export default Footer;
