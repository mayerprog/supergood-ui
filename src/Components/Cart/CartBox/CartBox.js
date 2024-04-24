import { useEffect, useState } from "react";
import AddItemBox from "../../AddItemBox/AddItemBox";
import styles from "./CartBox.module.scss";
import { itemAPI } from "../../../api/itemAPI";
import { MdImageNotSupported } from "react-icons/md";
import { useImageLoaded } from "../../../hooks/useImageLoaded";
import { baseURL } from "../../../config";
import { useMediaQuery } from "react-responsive";

const CartBox = ({ item, index, isSheet, isOrderCart }) => {
  const [itemImage, setItemImage] = useState("");
  const [ref, loaded, onLoad] = useImageLoaded();
  const mediaQuery = useMediaQuery({ maxWidth: 1024, minWidth: 367 });
  const phoneMediaQuery = useMediaQuery({ maxWidth: 418 });

  const uid = item.img[0].uid;
  const uri = `${baseURL}/getFile?uid=${uid}`;

  return (
    <div
      className={styles.cartBox}
      key={index}
      data-is-orderCart={isOrderCart ? "true" : "false"}
    >
      {loaded ? (
        <img
          className={styles.cartImage}
          alt={item.name}
          src={uri}
          ref={ref}
          onLoad={onLoad}
        />
      ) : (
        <div className={styles.cartImage}>
          <MdImageNotSupported size={!mediaQuery ? 50 : 100} color="#ccc" />
        </div>
      )}
      <div className={styles.cartBoxText}>
        <span className={styles.text}>{item.name}</span>
        {!phoneMediaQuery ? (
          <div>
            <span>{`${item.price} ₽`}</span>
            &nbsp;|&nbsp;
            <span>{`${item.params.weightout.value} г.`}</span>
          </div>
        ) : (
          <div>
            <span className={styles.text}>{`${item.price} ₽`}</span>
            <span
              className={styles.text}
            >{`${item.params.weightout.value} г.`}</span>
          </div>
        )}
      </div>
      <div className={styles.countBox}>
        <AddItemBox
          itemId={item.itemid}
          backgroundColor="#fcfcfc"
          boxShadow="0 0 2px rgba(0, 0, 0, 0.2)"
          width="5em"
          color="#5f5f5f"
          isSheet={isSheet}
          isOrderCart={isOrderCart}
        />
      </div>
    </div>
  );
};

export default CartBox;
