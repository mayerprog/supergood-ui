import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const items = [
    "Пиццы",
    "Комбо",
    "Закуски",
    "Напитки",
    "Коктейли",
    "Кофе",
    "Десерты",
    "Соусы",
    "Другие товары",
    "Акции",
  ];
  return (
    <div className={styles.sidebar}>
      {items.map((item, index) => (
        <button key={index} className={styles.item}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
