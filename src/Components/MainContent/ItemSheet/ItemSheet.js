import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./ItemSheet.module.scss";
import { baseURL } from "../../../config";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import ProductInfo from "../ProductInfo/ProductInfo";
import { fetchImage } from "../../../services/fetchImage";

const ItemSheet = ({
  navigate,
  setItemSheetClosing,
  setIsItemSheetOpen,
  itemSheetWrapperRef,
  itemSheetClosing,
  itemCardId,
  toggleMapVisibility,
  toggleItemSheetVisibility,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const items = useSelector((state) => state.item.items);
  const foundItem = items.find((item) => itemCardId === item.itemid);

  const uid = foundItem.img[0].uid;

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

  useEffect(() => {
    (async () => {
      try {
        await fetchImage({
          uid,
          width: 900,
          height: 900,
          setImageUrl,
          setLoaded,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className={styles.container} ref={itemSheetWrapperRef}>
      <div className={styles.icon} onClick={toggleItemSheetVisibility}>
        <IoMdClose size={25} />
      </div>
      <div>
        {!loaded ? (
          <div className={styles.productImage}>
            <IoFastFoodOutline size={500} color="#ccc" />
          </div>
        ) : (
          <img
            className={styles.productImage}
            loading="lazy"
            alt={foundItem.name}
            src={imageUrl}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>

      <ProductInfo
        itemCardId={itemCardId}
        toggleMapVisibility={toggleMapVisibility}
        isSheet={true}
      />
    </div>
  );
};

export default ItemSheet;
