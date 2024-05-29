import { cartAPI } from "../api/cartAPI";

export const putToCartAPI = async (item, token, salesid, deptid) => {
  try {
    const response = await cartAPI.addToCart({
      token,
      salesid,
      id: 0,
      deptid,
      itemid: item.itemid,
      qty: item.params.amount.value,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
