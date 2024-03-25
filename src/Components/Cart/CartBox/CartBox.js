import { useEffect, useState } from "react";
import AddItemBox from "../../AddItemBox/AddItemBox";
import styles from "./CartBox.module.scss";
import { itemAPI } from "../../../api/itemAPI";
import { MdImageNotSupported } from "react-icons/md";

const CartBox = ({ item, index }) => {
  const [itemImage, setItemImage] = useState("");
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const uid = item.img[0].uid;
  //       const image = await itemAPI.getFile(uid);
  //       setItemImage(image);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  const uid = item.img[0].uid;
  const uri = `http://localhost:8000/?uid=${uid}`;

  return (
    <div className={styles.cartBox} key={index}>
      {/* {uid ? (
       <img className={styles.cartImage} alt={item.name} src={uri} />
      ) : ( */}
      <div className={styles.cartImage}>
        <MdImageNotSupported size={40} color="#ccc" />
      </div>
      {/* )} */}
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
