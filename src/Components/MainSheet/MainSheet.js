import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import styles from "./MainSheet.module.scss";
import { useEffect } from "react";
import SocialMedia from "../Reusables/SocialMedia/SocialMedia";
import MobileApps from "../Reusables/MobileApps/MobileApps";

const MainSheet = ({
  mainSheetWrapperRef,
  setIsMainSheetOpen,
  mainSheetClosing,
  setMainSheetClosing,
  toggleUserInfoVisibility,
  navigate,
}) => {
  const links = [
    { name: "О компании", link: "https://supergood.ru/about" },
    { name: "Оплата и доставка", link: "https://supergood.ru/delivery-n-pay" },
    { name: "Сделать заказ", link: "https://supergood.ru/howto" },
    { name: "Акции и скидки", link: "https://supergood.ru/akcii" },
    { name: "Контакты", link: "https://supergood.ru/contacts" },
  ];

  // useEffect(() => {
  //   console.log(
  //     `Компонент MainSheet отрисован в ${new Date().toLocaleTimeString()}`
  //   );
  // });

  useGSAP(() => {
    const menu = mainSheetWrapperRef.current;
    gsap.from(menu, {
      x: "100%",
      opacity: 1,
      duration: 0.6,
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

  const handleClosing = () => {
    setIsMainSheetOpen(false);
    setMainSheetClosing(false);
  };

  const handleClick = (action) => {
    switch (action) {
      case "Мои данные":
        toggleUserInfoVisibility();
        handleClosing();
        break;
      case "Мои адреса":
        break;
      case "Мои заказы":
        navigate("/orders");
        break;
      case "Выйти":
        break;
      default:
        return;
    }
  };

  return (
    <div className={styles.container} ref={mainSheetWrapperRef}>
      <SocialMedia />

      {["Мои данные", "Мои адреса", "Мои заказы", "Выйти"].map(
        (item, index) => (
          <button
            className={styles.item}
            key={index}
            onClick={() => handleClick(item)}
          >
            <span>{item}</span>
          </button>
        )
      )}
      <div className={styles.line} />

      {links.map((item, index) => (
        <button className={styles.item} key={index}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.name}
          </a>
        </button>
      ))}

      <MobileApps />
    </div>
  );
};

export default MainSheet;
