import { useEffect, useState } from "react";
import { fetchImage } from "../../../services/fetchImage";
import styles from "./OrderImages.module.scss";
import { MdImageNotSupported } from "react-icons/md";

const OrderImages = ({ item }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uid = item.img[0].uid;

  useEffect(() => {
    fetchImage({ uid, width: 70, height: 70, setImageUrl, setLoaded });
  }, [uid]);

  return (
    <div>
      {!loaded && <MdImageNotSupported className={styles.icon} color="#ccc" />}
      {loaded && (
        <>
          <img
            className={styles.cartImage}
            loading="lazy"
            alt={item.name}
            src={imageUrl}
            onLoad={() => setLoaded(true)}
          />
        </>
      )}
    </div>
  );
};

export default OrderImages;
