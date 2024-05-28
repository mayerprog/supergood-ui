import { cartAPI } from "../api/cartAPI";
import {
  setDeliveryTime,
  setItems,
  setNoPromoItems,
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
    dispatch(setItems(items));
    let promo;
    dispatch(setNoPromoItems(itemsSum));
    if (itemsSum) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].promocode) {
          promo = items[i].lineamount;
        }
      }
      if (promo) {
        dispatch(updateSum(itemsSum + promo));
      } else {
        dispatch(updateSum(itemsSum));
      }
    } else {
      dispatch(updateSum(0));
    }
    if (deliveryTime) dispatch(setDeliveryTime(deliveryTime));
  }
};
