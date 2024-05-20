import { useSelector } from "react-redux";
import { cartAPI } from "../api/cartAPI";
import { addItems } from "../redux/slices/cartSlice";
import { putToCartAPI } from "./putToCartAPI";

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
  } = info;
  event.stopPropagation();

  if (addingInProgress)
    //for preventing multiple dispatches
    return;
  setAddingInProgress(true);
  if (addressList.length === 0) toggleMapVisibility();
  else {
    if (isAuth) {
      const response = await putToCartAPI(item, token, salesid);
      if (response.status === "ok") {
        dispatch(
          addItems({
            ...item,
            initialPrice: item.price,
            initialWeightout: item.params.weightout.value,
          })
        );
      }
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
