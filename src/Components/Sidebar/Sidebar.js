import { useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.scss";

const Sidebar = ({ categories }) => {
  const sidebarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // const handleScroll = () => {
  //   if (!sidebarRef.current) return;

  //   const sidebar = sidebarRef.current;
  //   const sidebarBottom = sidebar.offsetTop + sidebar.offsetHeight;
  //   const windowHeight = window.innerHeight;
  //   const scrollY = window.scrollY;

  //   if (sidebarBottom <= scrollY + windowHeight) {
  //     setIsSticky(true);
  //   } else {
  //     setIsSticky(false);
  //   }
  // };

  // useEffect(() => {
  //   console.log();
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const sidebarClass = isSticky ? styles.sticky : styles.sidebar;

  return (
    <div className={styles.sidebar} ref={sidebarRef}>
      {categories.map((item, index) => (
        <button key={index} className={styles.item}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
