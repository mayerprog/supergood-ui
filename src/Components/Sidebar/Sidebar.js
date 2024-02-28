import styles from "./Sidebar.module.scss";

const Sidebar = ({ categories }) => {
  return (
    <div className={styles.sidebar} id="sidebar">
      {categories.map((item, index) => (
        <button key={index} className={styles.item}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
