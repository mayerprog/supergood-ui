import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Логотип</div>
      <input className={styles.input} placeholder="Найти блюдо" />
      <button onClick={() => console.log("click")} className={styles.address}>
        <span className={styles.buttonText}>
          Большая Новодмитровская улица, 12с15
        </span>
      </button>
      <div className={styles.socialMedia}>Соцсети</div>
      <button className={styles.loginButton}>Войти</button>
    </header>
  );
};

export default Header;
