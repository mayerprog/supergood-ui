import { useEffect, useRef, useState } from "react";
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

  const [prevActiveButtonId, setPrevActiveButtonId] = useState(0);

  useEffect(() => {
    // find index of selected button
    const activeButtonIndex = buttonRefs.current.findIndex(
      (btn) => btn && btn.textContent === selectedCategory
    );
    // access the button itself using the index
    const activeButton = buttonRefs.current[activeButtonIndex];

    if (activeButton && navbarRef.current) {
      //the position of the left edge of the button relative to the left edge of its offset parent
      const scrollLeft = activeButton.offsetLeft;
      // when choosing buttons to the right
      if (activeButtonIndex > prevActiveButtonId) {
        navbarRef.current.scroll({
          left: scrollLeft,
          behavior: "smooth",
        });

        setPrevActiveButtonId(activeButtonIndex);
        // when choosing buttons to the left
      } else if (activeButtonIndex < prevActiveButtonId) {
        const buttonEndPosition = scrollLeft + activeButton.offsetWidth;
        const visibleWidth = navbarRef.current.clientWidth;

        navbarRef.current.scroll({
          left: buttonEndPosition - visibleWidth,
          behavior: "smooth",
        });
        setPrevActiveButtonId(activeButtonIndex);
      }

      console.log("activeButtonWidth", activeButton.offsetWidth);
      console.log(
        "navbarRef.current.clientWidth",
        navbarRef.current.clientWidth
      );
    }
  }, [selectedCategory, prevActiveButtonId]);

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
