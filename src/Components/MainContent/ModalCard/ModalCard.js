import { memo, useEffect, useState } from "react";
import styles from "./ModalCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PizzaOptions from "../PizzaOptions/PizzaOptions";
import AddItemBox from "../../AddItemBox/AddItemBox";
import { addItems } from "../../../redux/slices/cartSlice";
import { IoFastFoodOutline } from "react-icons/io5";
import { baseURL } from "../../../config";
import { addItemToCart } from "../../../services/addItemToCart";
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

  // const cartItems = useSelector((state) => state.cart.cartItems);
  // const addressList = useSelector((state) => state.user.addressList);
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
