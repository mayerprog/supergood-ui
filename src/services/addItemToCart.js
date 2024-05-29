import { addItems } from "../redux/slices/cartSlice";
import { putToCartAPI } from "./putToCartAPI";
import { getOrderInfo } from "./getOrderInfo";
import { cartAPI } from "../api/cartAPI";

export const addItemToCart = async (info) => {
  const {
    event,
    addingInProgress,
    setAddingInProgress,
    toggleMapVisibility,
    addressList,
    dispatch,
    item,
    token,
    salesid,
    isAuth,
    cartItems,
  } = info;
  event.stopPropagation();

  if (addingInProgress)
    //for preventing multiple dispatches
    return;
  setAddingInProgress(true);
  if (addressList.length === 0) toggleMapVisibility();
  else {
    if (isAuth) {
      const selectedAddressList = addressList.filter(
        (address) => address.selected
      );
      const cutlery = cartItems.find((item) => item.itemid === 50831);
      await putToCartAPI(item, token, salesid, selectedAddressList[0].deptid);
      // if no cutlery then add it to Cart
      if (!cutlery) {
        const response = await cartAPI.addToCart({
          token,
          salesid,
          id: 0,
          deptid: selectedAddressList[0].deptid,
          itemid: 50831,
          qty: 1,
        });
      }

      await getOrderInfo({ token, salesid, dispatch });
    } else {
      dispatch(
        addItems({
          ...item,
          initialPrice: item.price,
          initialWeightout: item.params.weightout.value,
        })
      );
    }
  }
  setTimeout(() => setAddingInProgress(false), 300);
};
