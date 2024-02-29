import styles from "./Sidebar.module.scss";

const Sidebar = ({ categories, onCategorySelect, selectedCategory }) => {
  return (
    <div className={styles.sidebar}>
      {categories.map((category, index) => (
        <button
          key={index}
          className={`${styles.item} ${
            category === selectedCategory && styles.active
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
