import styles from "./MobileApps.module.scss";
import AppStore from "../../../assets/images/App-Store.png";
import GooglePlay from "../../../assets/images/Google-Play.png";

const MobileApps = () => {
  return (
    <div className={styles.appLinks}>
      <span>С приложением удобнее!</span>
      <div className={styles.images}>
        <a
          href="https://apps.apple.com/ru/app/supergood/id1520374517"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={AppStore} alt="" />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.psw.supergood"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={GooglePlay} alt="" />
        </a>
      </div>
    </div>
  );
};

export default MobileApps;
