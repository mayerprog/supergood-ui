import { orderAPI } from "../api/orderAPI";
import { setItemsUnavailable } from "../redux/slices/cartSlice";

export const fetchMinSum = async (params) => {
  const {
    token,
    salesid,
    cartItems,
    addressSelected,
    dispatch,
    action,
    setCartErrMessage,
  } = params;
  if (cartItems.length > 0) {
    try {
      const response = await orderAPI.getMinSum({
        token,
        salesid,
        addressid: addressSelected.addressid,
      });
      if (response.status === "ok") {
        setCartErrMessage("");
        dispatch(setItemsUnavailable([]));
        action();
      } else {
        if (response.errorcode === 200) {
          setCartErrMessage(response.msg);
          const errorItems = response.params.items;
          //   const errorItems = [
          //     { itemid: 52385, name: "Брускетта со слабосоленым лососем и авокадо" },
          //     { itemid: 50607, name: "Суп-лапша с куриными фрикадельками" },
          //   ]; // hardcode for testing

          const foundItems = cartItems.filter((cartItem) =>
            errorItems.some((errorItem) => errorItem.itemid === cartItem.itemid)
          );
          dispatch(setItemsUnavailable(foundItems));
        }
        setCartErrMessage(response.msg);
      }
    } catch (err) {
      console.log(err);
    }
  }
};
