import { addItems } from "../redux/slices/cartSlice";
import { putToCartAPI } from "./putToCartAPI";
import { getOrderInfo } from "./getOrderInfo";

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
      const selectedAddressList = addressList.filter(
        (address) => address.selected
      );
      const response = await putToCartAPI(
        item,
        token,
        salesid,
        selectedAddressList[0].deptid
      );
      if (response.status === "ok") {
        await getOrderInfo({ token, salesid, dispatch });
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
