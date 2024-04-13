import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import styles from "./MainSheet.module.scss";

const MainSheet = ({
  mainSheetWrapperRef,
  setIsMainSheetOpen,
  mainSheetClosing,
  setMainSheetClosing,
}) => {
  const handleClosing = () => {
    setIsMainSheetOpen(false);
    setMainSheetClosing(false);
  };
  useGSAP(() => {
    const menu = mainSheetWrapperRef.current;
    gsap.from(menu, {
      x: "100%",
      opacity: 1,
      duration: 0.7,
      delay: 0.5,
      ease: "power2.out",
    });
  }, []);
  useGSAP(() => {
    const menu = mainSheetWrapperRef.current;
    if (mainSheetClosing) {
      gsap.to(menu, {
        x: "100%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => handleClosing(),
      });
    }
  }, [mainSheetClosing]);
  return (
    <div className={styles.container} ref={mainSheetWrapperRef}>
      yoyoyo
    </div>
  );
};

export default MainSheet;
