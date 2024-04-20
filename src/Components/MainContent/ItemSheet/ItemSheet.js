import { useDispatch, useSelector } from "react-redux";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./ItemSheet.module.scss";
import { useImageLoaded } from "../../../hooks/useImageLoaded";
import { baseURL } from "../../../config";
import { MdImageNotSupported } from "react-icons/md";
import ProductInfo from "../ProductInfo/ProductInfo";

const ItemSheet = ({
  navigate,
  setItemSheetClosing,
  setIsItemSheetOpen,
  itemSheetWrapperRef,
  itemSheetClosing,
  itemCardId,
  toggleMapVisibility,
}) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.item.items);
  const foundItem = items.find((item) => itemCardId === item.itemid);

  const handleClosing = () => {
    setItemSheetClosing(false);
    setIsItemSheetOpen(false);
  };

  useGSAP(() => {
    const menu = itemSheetWrapperRef.current;
    gsap.from(menu, {
      y: "100%",
      opacity: 1,
      duration: 0.2,
      delay: 0.2,
      ease: "power2.out",
    });
  }, []);
  useGSAP(() => {
    const menu = itemSheetWrapperRef.current;
    if (itemSheetClosing) {
      gsap.to(menu, {
        y: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => handleClosing(),
      });
    }
  }, [itemSheetClosing]);
  const [ref, loaded, setLoaded, onLoad] = useImageLoaded();

  const uid = foundItem.img[0].uid;
  const uri = `${baseURL}/getFile?uid=${uid}`;

  return (
    <div className={styles.container} ref={itemSheetWrapperRef}>
      {loaded ? (
        <div className={styles.productImage}>
          <img
            alt={foundItem.name}
            src={uri}
            ref={ref}
            onLoad={onLoad}
            onError={() => setLoaded(false)} // Handle image load errors
            loading="lazy" // Native lazy loading
            className={styles.image}
          />
        </div>
      ) : (
        <div className={styles.productImage}>
          <MdImageNotSupported
            // size={330}
            color="#ccc"
            className={styles.image}
          />
        </div>
      )}

      <ProductInfo
        itemCardId={itemCardId}
        toggleMapVisibility={toggleMapVisibility}
        isSheet={true}
      />
    </div>
  );
};

export default ItemSheet;
