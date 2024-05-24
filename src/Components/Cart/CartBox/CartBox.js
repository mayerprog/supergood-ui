import { useEffect, useState } from "react";
import AddItemBox from "../../AddItemBox/AddItemBox";
import styles from "./CartBox.module.scss";
import { itemAPI } from "../../../api/itemAPI";
import { IoFastFoodOutline } from "react-icons/io5";
import { baseURL } from "../../../config";
import { useMediaQuery } from "react-responsive";
import { fetchImage } from "../../../services/fetchImage";

const CartBox = ({ item, index, isSheet, isOrderCart }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const phoneMediaQuery = useMediaQuery({ maxWidth: 418 });

  const uid = item.img[0].uid;
  // const uri = `${baseURL}/getFile?uid=${uid}`;

  useEffect(() => {
    fetchImage({ uid, width: 170, height: 170, setImageUrl, setLoaded });
  }, [uid]);

  return (
    <>
      {item.promocode === null && (
        <div
          className={styles.cartBox}
          key={index}
          data-is-ordercart={isOrderCart ? "true" : "false"}
        >
          {!loaded && (
            <div className={styles.cartImage}>
              <IoFastFoodOutline className={styles.icon} color="#ccc" />
            </div>
          )}
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
          <div className={styles.cartBoxText}>
            <span className={styles.text}>
              {item.name ? item.name : item.itemname}
            </span>
            {!phoneMediaQuery ? (
              <div>
                <span>{`${item.price ? item.price : item.lineamount} ₽`}</span>
                &nbsp;|&nbsp;
                <span>{`${item.params.weightout.value} ${item.params.weightout.unit}.`}</span>
              </div>
            ) : (
              <div>
                <span className={styles.text}>{`${item.price} ₽`}</span>
                <span
                  className={styles.text}
                >{`${item.params.weightout.value} ${item.params.weightout.unit}.`}</span>
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
      )}
    </>
  );
};

export default CartBox;
