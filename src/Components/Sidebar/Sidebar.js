import { useSelector } from "react-redux";
import SidebarShimmer from "../../Loaders/SidebarShimmer";
import styles from "./Sidebar.module.scss";
import { useEffect } from "react";

const Sidebar = ({
  categories,
  onCategorySelect,
  selectedCategory,
  scrolledCategory,
  loading,
}) => {
  // useEffect(() => {
  //   console.log(
  //     `Компонент Sidebar отрисован в ${new Date().toLocaleTimeString()}`
  //   );
  // });

  if (loading) {
    return <SidebarShimmer />;
  }
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
