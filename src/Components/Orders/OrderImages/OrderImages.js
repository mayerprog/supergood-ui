import { useEffect, useState } from "react";
import { fetchImage } from "../../../services/fetchImage";
import styles from "./OrderImages.module.scss";
import { IoFastFoodOutline } from "react-icons/io5";

const OrderImages = ({ item, detailInfo }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uid = item.img[0].uid;

  useEffect(() => {
    fetchImage({ uid, width: 70, height: 70, setImageUrl, setLoaded });
  }, [uid]);

  return (
    <>
      {!loaded && (
        <IoFastFoodOutline
          className={styles.cartImage}
          color="#ccc"
          data-is-info={detailInfo ? "true" : "false"}
        />
      )}
      {loaded && (
        <>
          <img
            className={styles.cartImage}
            loading="lazy"
            alt={item.name}
            src={imageUrl}
            onLoad={() => setLoaded(true)}
            data-is-info={detailInfo ? "true" : "false"}
          />
        </>
      )}
    </>
  );
};

export default OrderImages;
