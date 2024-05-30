import { useEffect, useState } from "react";
import { fetchImage } from "../../../services/fetchImage";
import styles from "./OrderImages.module.scss";
import { IoFastFoodOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const OrderImages = ({ order, detailInfo }) => {
  const [filteredItems, setFilteredItems] = useState([]);

  const ordersItems = useSelector((state) => state.order.ordersItems);

  useEffect(() => {
    if (ordersItems.length > 0) {
      const filteredOrder = ordersItems.find((item) => item.id === order.id);
      const items = Object.values(filteredOrder.lines);
      setFilteredItems(items);
    }
  }, [ordersItems]);

  return (
    <>
      {filteredItems.map((item) => (
        <OrderImage item={item} detailInfo={detailInfo} />
      ))}
    </>
  );
};

export const OrderImage = ({ item, detailInfo }) => {
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
