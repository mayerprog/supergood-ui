import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const items = [
    "Наборы",
    "Пицца Т.Т",
    "Роллы",
    "Салаты",
    "Супы",
    "Домашняя еда",
    "Паста",
    "Фитнес меню",
    "Сэндвичи",
    "Завтрак",
    "Кулинария",
    "Хлеб",
    "Сладкое",
    "Напитки",
    "Кофе и чай",
    "Корпоративное меню",
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
