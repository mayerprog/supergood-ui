import styles from "./NavBar.module.scss";

const NavBar = ({
  categories,
  onCategorySelect,
  selectedCategory,
  scrolledCategory,
}) => {
  // useEffect(() => {
  //   console.log(
  //     `Компонент NavBar отрисован в ${new Date().toLocaleTimeString()}`
  //   );
  // });

  return (
    <div className={styles.navbar}>
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

export default NavBar;
