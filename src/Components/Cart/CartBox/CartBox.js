import { useEffect, useState } from "react";
import AddItemBox from "../../AddItemBox/AddItemBox";
import styles from "./CartBox.module.scss";
import { itemAPI } from "../../../api/itemAPI";
import { MdImageNotSupported } from "react-icons/md";
import { useImageLoaded } from "../../../hooks/useImageLoaded";
import { baseURL } from "../../../config";

const CartBox = ({ item, index }) => {
  const [itemImage, setItemImage] = useState("");
  const [ref, loaded, onLoad] = useImageLoaded();

  const uid = item.img[0].uid;
  const uri = `${baseURL}/getFile?uid=${uid}`;

  return (
    <div className={styles.cartBox} key={index}>
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
          <MdImageNotSupported size={40} color="#ccc" />
        </div>
      )}
      <div className={styles.cartBoxText}>
        <span className={styles.text}>{item.name}</span>
        <div>
          <span>{`${item.price} ₽`}</span>
          &nbsp;|&nbsp;
          <span>{`${item.params.weightout.value} г.`}</span>
        </div>
      </div>
      <div className={styles.countBox}>
        <AddItemBox
          itemId={item.itemid}
          backgroundColor="#fcfcfc"
          boxShadow="0 0 2px rgba(0, 0, 0, 0.2)"
          width="5em"
          color="#5f5f5f"
        />
      </div>
    </div>
  );
};

export default CartBox;
