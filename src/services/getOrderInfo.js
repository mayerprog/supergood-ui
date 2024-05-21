import { cartAPI } from "../api/cartAPI";
import { setItems, updateSum } from "../redux/slices/cartSlice";

export const getOrderInfo = async (params) => {
  const { token, salesid, dispatch } = params;
  const data = await cartAPI.getOrderInfo({
    token,
    salesid,
  });
  const items = Object.values(data.sales.lines);
  const itemsSum = data.sales.amount;
  dispatch(setItems(items));
  dispatch(updateSum(itemsSum));
};
