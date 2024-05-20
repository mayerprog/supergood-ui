import { useSelector } from "react-redux";
import { cartAPI } from "../api/cartAPI";
import { addItems, setItems, updateSum } from "../redux/slices/cartSlice";
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
        const data = await cartAPI.getOrderInfo({ token, salesid });
        console.log("data", data);
        const items = Object.values(data.sales.lines);
        const itemsSum = data.sales.amount;

        dispatch(setItems(items));
        dispatch(updateSum(itemsSum));
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
