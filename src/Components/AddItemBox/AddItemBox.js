import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./AddItemBox.module.scss";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItems, updateItem } from "../../redux/slices/cartSlice";
import { putToCartAPI } from "../../services/putToCartAPI";
import { cartAPI } from "../../api/cartAPI";
import { getOrderInfo } from "../../services/getOrderInfo";
import ModalsContext from "../../contexts/ModalsContext";

const AddItemBox = ({
  backgroundColor,
  boxShadow,
  width,
  color,
  margin,
  itemId,
  isSheet,
  isOrderCart,
}) => {
  const dynamicStyle = {
    "--counter-bg-color": backgroundColor,
    "--counter-box-shadow": boxShadow,
    "--counter-width": width,
    "--counter-color": color,
    "--counter-margin": margin,
  };

  const [amount, setAmount] = useState(null);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.user.token);
  const salesid = useSelector((state) => state.user.salesid);
  const addressSelected = useSelector((state) => state.user.addressSelected);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const minAmount = useSelector((state) => state.cart.minAmount);
  const noPromoItemsSum = useSelector((state) => state.cart.noPromoItemsSum);

  const { togglePromoErrorVisibility } = useContext(ModalsContext);

  useEffect(() => {
    const foundCartItem = cartItems.find(
      (cartItem) => itemId === cartItem.itemid
    );
    if (foundCartItem) {
      if (!foundCartItem.qty) {
        setAmount(foundCartItem.params.amount.value);
      } else {
        setAmount(foundCartItem.qty);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const increment = async (event) => {
    event.stopPropagation();
    const item = cartItems.find((item) => item.itemid === itemId);
    if (!item) return;

    const updatedItem = {
      ...item,
      params: {
        ...item.params,
        amount: {
          ...item.params.amount,
          value: item.qty
            ? Number(item.qty) + 1
            : Number(item.params.amount.value) + 1,
        },
        weightout: {
          ...item.params.weightout,
          value:
            Number(item.params.weightout.value) + Number(item.initialWeightout),
        },
      },
      price: item.price + item.initialPrice,
    };
    if (isAuth) {
      const response = await putToCartAPI(
        updatedItem,
        token,
        salesid,
        addressSelected.deptid
      );
      if (response.status === "ok") {
        await getOrderInfo({ token, salesid, dispatch });
      }
    } else {
      dispatch(updateItem(updatedItem));
    }
  };

  const decrement = async (event) => {
    event.stopPropagation();

    const item = cartItems.find((item) => item.itemid === itemId);
    if (!item) return;

    const updatedItem = {
      ...item,
      params: {
        ...item.params,
        amount: {
          ...item.params.amount,
          value: item.qty
            ? Math.max(Number(item.qty) - 1, 0)
            : Math.max(Number(item.params.amount.value) - 1, 0),
        },
        weightout: {
          ...item.params.weightout,
          value:
            Number(item.params.weightout.value) - Number(item.initialWeightout),
        },
      },
      price: item.price - item.initialPrice,
    };

    // checking if total sum will be bigger than minSum after deleting an item. If not - then needed to delete promocode
    const promoItem = cartItems.find((item) => item.promocode != null);
    if (promoItem) {
      const withoutPromo = noPromoItemsSum - item.lineamount / item.qty; //sum without promo and decremented item
      if (withoutPromo < minAmount) {
        togglePromoErrorVisibility(true);
        return;
      }
    }

    if (isAuth) {
      if (item.qty > 1) {
        const response = await putToCartAPI(
          updatedItem,
          token,
          salesid,
          addressSelected.deptid
        );
        if (response.status === "ok") {
          await getOrderInfo({ token, salesid, dispatch });
        }
      } else {
        const response = await cartAPI.deleteItem({
          token,
          salesid,
          id: item.id,
        });
        if (response.status === "ok") {
          await getOrderInfo({ token, salesid, dispatch });
        }
      }
    } else {
      if (item.params.amount.value > 1) {
        dispatch(updateItem(updatedItem));
      } else {
        dispatch(removeItems(item.itemid));
      }
    }
  };

  return (
    <div
      className={styles.counter}
      style={dynamicStyle}
      data-is-sheet={isSheet ? "true" : "false"}
      data-is-ordercart={isOrderCart ? "true" : "false"}
    >
      <button
        onClick={(e) => decrement(e)}
        className={
          !backgroundColor ? styles.cardCounterButton : styles.cartCounterButton
        }
      >
        <AiOutlineMinus className={styles.icon} />
      </button>
      <span className={styles.count}>{amount}</span>
      <button
        onClick={(e) => increment(e)}
        className={
          !backgroundColor ? styles.cardCounterButton : styles.cartCounterButton
        }
      >
        <AiOutlinePlus className={styles.icon} />
      </button>
    </div>
  );
};

export default AddItemBox;
