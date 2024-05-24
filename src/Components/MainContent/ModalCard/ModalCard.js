import { useEffect, useState } from "react";
import styles from "./ModalCard.module.scss";
import { useSelector } from "react-redux";
import { IoFastFoodOutline } from "react-icons/io5";
import ProductInfo from "../ProductInfo/ProductInfo";
import { fetchImage } from "../../../services/fetchImage";
import { IoMdClose } from "react-icons/io";

const ModalCard = ({
  itemCardId,
  cardRef,
  toggleMapVisibility,
  toggleModalCardVisibility,
}) => {
  const items = useSelector((state) => state.item.items);
  const foundItem = items.find((item) => itemCardId === item.itemid);
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uid = foundItem.img[0].uid;

  useEffect(() => {
    (async () => {
      try {
        await fetchImage({
          uid,
          width: 330,
          height: 330,
          setImageUrl,
          setLoaded,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div ref={cardRef} className={styles.container}>
      <div>
        <div className={styles.icon} onClick={toggleModalCardVisibility}>
          <IoMdClose size={25} />
        </div>
        {!loaded ? (
          <div className={styles.productImage}>
            <IoFastFoodOutline size={330} color="#ccc" />
          </div>
        ) : (
          <>
            <img
              className={styles.productImage}
              loading="lazy"
              alt={foundItem.name}
              src={imageUrl}
              onLoad={() => setLoaded(true)}
            />
          </>
        )}
      </div>
      <ProductInfo
        itemCardId={itemCardId}
        toggleMapVisibility={toggleMapVisibility}
      />
    </div>
  );
};

export default ModalCard;
