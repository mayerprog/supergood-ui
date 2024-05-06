import { memo, useEffect, useState } from "react";
import styles from "./ModalCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PizzaOptions from "../PizzaOptions/PizzaOptions";
import AddItemBox from "../../AddItemBox/AddItemBox";
import { addItems } from "../../../redux/slices/cartSlice";
import { MdImageNotSupported } from "react-icons/md";
import { baseURL } from "../../../config";
import { addItemToCart } from "../../../services/addItemToCart";
import ProductInfo from "../ProductInfo/ProductInfo";
import { fetchImage } from "../../../services/fetchImage";

const ModalCard = ({ itemCardId, cardRef, toggleMapVisibility }) => {
  const items = useSelector((state) => state.item.items);
  const foundItem = items.find((item) => itemCardId === item.itemid);
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // const cartItems = useSelector((state) => state.cart.cartItems);
  // const addressList = useSelector((state) => state.address.addressList);
  // const [addingInProgress, setAddingInProgress] = useState(false);
  // const [amount, setAmount] = useState(null);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(
  //     `Компонент ModalCard отрисован в ${new Date().toLocaleTimeString()}`
  //   );
  // });

  // useEffect(() => {
  //   const foundCartItem = cartItems.find(
  //     (cartItem) => itemCardId === cartItem.itemid
  //   );
  //   if (foundCartItem) {
  //     setAmount(foundCartItem.params.amount.value);
  //   } else {
  //     setAmount(0);
  //   }
  // }, [cartItems, itemCardId]);

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
      {!loaded ? (
        <div className={styles.productImage}>
          <MdImageNotSupported size={330} color="#ccc" />
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

      <ProductInfo
        itemCardId={itemCardId}
        toggleMapVisibility={toggleMapVisibility}
      />
    </div>
  );
};

export default ModalCard;
