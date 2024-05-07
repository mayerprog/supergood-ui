import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import styles from "./MainSheet.module.scss";
import { useEffect } from "react";
import SocialMedia from "../Reusables/SocialMedia/SocialMedia";
import MobileApps from "../Reusables/MobileApps/MobileApps";
import { removeDataLogin } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const MainSheet = ({
  mainSheetWrapperRef,
  setIsMainSheetOpen,
  mainSheetClosing,
  setMainSheetClosing,
  toggleUserInfoVisibility,
  toggleAddressVisibility,
  toggleBonusVisibility,
  toggleLoginVisibility,
  navigate,
}) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

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

  const dispatch = useDispatch();

  useGSAP(() => {
    const menu = mainSheetWrapperRef.current;
    gsap.from(menu, {
      x: "-100%",
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
        x: "-100%",
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
        toggleAddressVisibility();
        handleClosing();
        break;
      case "Мои заказы":
        navigate("/orders");
        handleClosing();
        break;
      case "Бонусы":
        toggleBonusVisibility();
        handleClosing();
        break;
      case "Выйти":
        dispatch(removeDataLogin());
        handleClosing();
        break;
      case "Войти":
        toggleLoginVisibility();
        handleClosing();
        break;
      default:
        return;
    }
  };

  return (
    <div className={styles.container} ref={mainSheetWrapperRef}>
      <SocialMedia />

      {isAuth ? (
        ["Мои данные", "Мои адреса", "Мои заказы", "Бонусы", "Выйти"].map(
          (item, index) => (
            <button
              className={styles.item}
              key={index}
              onClick={() => handleClick(item)}
            >
              <span>{item}</span>
            </button>
          )
        )
      ) : (
        <button className={styles.item} onClick={() => handleClick("Войти")}>
          <span>Войти</span>
        </button>
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
