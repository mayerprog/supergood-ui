import { cartAPI } from "../api/cartAPI";
import {
  setDeliveryTime,
  setItems,
  updateSum,
} from "../redux/slices/cartSlice";

export const getOrderInfo = async (params) => {
  const { token, salesid, dispatch } = params;
  const data = await cartAPI.getOrderInfo({
    token,
    salesid,
  });
  if (data.sales) {
    const items = Object.values(data.sales.lines);
    const itemsSum = data.sales.amount;
    const deliveryTime = data.sales.calcdlvtime;

    console.log("itemsSum", itemsSum);
    dispatch(setItems(items));
    if (itemsSum) dispatch(updateSum(itemsSum));
    if (deliveryTime) dispatch(setDeliveryTime(deliveryTime));
  }
};
