import styles from "./Sidebar.module.scss";

const Sidebar = ({
  categories,
  onCategorySelect,
  selectedCategory,
  scrolledCategory,
}) => {
  return (
    <div className={styles.sidebar}>
      {categories.map((category, index) => (
        <button
          key={index}
          className={`${styles.item} ${
            (category === selectedCategory || category === scrolledCategory) &&
            styles.active
          }`}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
