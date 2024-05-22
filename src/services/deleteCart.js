import { cartAPI } from "../api/cartAPI";
import { removeAllItems } from "../redux/slices/cartSlice";
import { getOrderInfo } from "./getOrderInfo";

export const deleteCart = async ({
  dispatch,
  cartItems,
  isAuth,
  token,
  salesid,
}) => {
  if (!isAuth) {
    dispatch(removeAllItems());
  } else {
    if (cartItems.length > 0) {
      try {
        await Promise.all(
          cartItems.map((item) =>
            cartAPI.deleteItem({ token, salesid, id: item.id })
          )
        );
        await getOrderInfo({ token, salesid, dispatch });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
