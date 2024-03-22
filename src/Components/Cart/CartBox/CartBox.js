import { useEffect, useState } from "react";
import AddItemBox from "../../AddItemBox/AddItemBox";
import styles from "./CartBox.module.scss";
import { itemAPI } from "../../../api/itemAPI";
// import noImage from "../../../assets/images/No-Image-Placeholder.svg";

const CartBox = ({ item, index }) => {
  const [itemImage, setItemImage] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const uid = item.img[0].uid;
        const image = await itemAPI.getFile(uid);
        setItemImage(image);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className={styles.cartBox} key={index}>
      <img className={styles.cartImage} alt="Pizza" src={itemImage} />
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
