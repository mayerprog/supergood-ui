import { useEffect, useRef } from "react";
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

  const navbarRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const activeButton = buttonRefs.current.find(
      (btn) => btn && btn.textContent === selectedCategory
    );
    if (activeButton && navbarRef.current) {
      const buttonRect = activeButton.getBoundingClientRect();
      const scrollLeft = buttonRect.left;
      navbarRef.current.scroll({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [selectedCategory]);

  return (
    <div className={styles.navbar} ref={navbarRef}>
      {categories.map((category, index) => (
        <button
          key={index}
          ref={(el) => (buttonRefs.current[index] = el)}
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
