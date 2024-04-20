import { memo, useEffect, useState } from "react";
import styles from "./ModalCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PizzaOptions from "../PizzaOptions/PizzaOptions";
import AddItemBox from "../../AddItemBox/AddItemBox";
import { addItems } from "../../../redux/slices/cartSlice";
import { MdImageNotSupported } from "react-icons/md";
import { useImageLoaded } from "../../../hooks/useImageLoaded";
import { baseURL } from "../../../config";
import { addItemToCart } from "../../../services/addItemToCart";
import ProductInfo from "../ProductInfo/ProductInfo";

const ModalCard = ({ itemCardId, cardRef, toggleMapVisibility }) => {
  const items = useSelector((state) => state.item.items);
  const foundItem = items.find((item) => itemCardId === item.itemid);
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

  const [ref, loaded, setLoaded, onLoad] = useImageLoaded();

  const uid = foundItem.img[0].uid;
  const uri = `${baseURL}/getFile?uid=${uid}`;

  return (
    <div ref={cardRef} className={styles.container}>
      {loaded ? (
        <img
          className={styles.productImage}
          alt={foundItem.name}
          src={uri}
          ref={ref}
          onLoad={onLoad}
          onError={() => setLoaded(false)} // Handle image load errors
          loading="lazy" // Native lazy loading
        />
      ) : (
        <div className={styles.productImage}>
          <MdImageNotSupported size={330} color="#ccc" />
        </div>
      )}

      <ProductInfo
        itemCardId={itemCardId}
        toggleMapVisibility={toggleMapVisibility}
      />
    </div>
  );
};

export default ModalCard;
