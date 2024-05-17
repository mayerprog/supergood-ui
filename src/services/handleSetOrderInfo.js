import { removeAllItems } from "../redux/slices/cartSlice";
import { addOrders } from "../redux/slices/orderSlice";
import { v4 as uuidv4 } from "uuid";

export const handleSetOrderInfo = (params) => {
  const { cartItems, itemsSum, addressSelected, dispatch } = params;

  const now = new Date();

  // Formatting the date as DD.MM.YYYY
  const formattedDate =
    now.getDate().toString().padStart(2, "0") +
    "." +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    now.getFullYear().toString();

  // Formatting the time as HH:mm
  const formattedTime =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");

  const orderInfoToDispatch = {
    orderId: uuidv4(),
    address: `${addressSelected.street}, ${addressSelected.yhouse}`,
    noContact: true,
    payAmount: itemsSum,
    payType: "Наличными курьеру",
    status: "Pending",
    date: formattedDate,
    time: formattedTime,
    items: cartItems,
  };
  dispatch(addOrders(orderInfoToDispatch));
  dispatch(removeAllItems());
};
