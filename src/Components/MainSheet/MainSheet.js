import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import styles from "./MainSheet.module.scss";
import { useEffect } from "react";
import SocialMedia from "../SocialMedia/SocialMedia";

const MainSheet = ({
  mainSheetWrapperRef,
  setIsMainSheetOpen,
  mainSheetClosing,
  setMainSheetClosing,
}) => {
  useEffect(() => {
    console.log(
      `Компонент MainSheet отрисован в ${new Date().toLocaleTimeString()}`
    );
  });
  const handleClosing = () => {
    setIsMainSheetOpen(false);
    setMainSheetClosing(false);
  };
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
  return (
    <div className={styles.container} ref={mainSheetWrapperRef}>
      <SocialMedia />
      <div>Мои данные</div>
      <div>Мои адреса</div>
      <div>Мои заказы</div>
      <div>Выйти</div>

      <a
        href="https://supergood.ru/about"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>О компании</span>
      </a>
      <a
        href="https://supergood.ru/delivery-n-pay"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Оплата и доставка</span>
      </a>
      <a
        href="https://supergood.ru/howto"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Сделать заказ</span>
      </a>

      <a
        href="https://supergood.ru/akcii"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Акции и скидки</span>
      </a>
      <a
        href="https://supergood.ru/contacts"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Контакты</span>
      </a>
    </div>
  );
};

export default MainSheet;
