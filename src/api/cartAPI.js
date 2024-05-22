import axios from "axios";
import { baseURL } from "../config.js";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const cartAPI = {
  async addToCart(params) {
    const { token, salesid, id, itemid, deptid, qty } = params;
    try {
      const response = await instance.post(`/putcart.php`, {
        token,
        salesid,
        id,
        itemid,
        qty,
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error putting products to cart:",
        err.response ? err.response.data : err
      );
      console.log("Failed to put products to cart. Check console for details.");
    }
  },
  async deleteItem(params) {
    const { token, salesid, id } = params;
    try {
      const response = await instance.post(`/deletecart.php`, {
        token,
        salesid,
        id,
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error getting order info:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get order info. Check console for details.");
    }
  },
  async getOrderInfo(params) {
    const { token, salesid } = params;
    try {
      const response = await instance.post(`/getsalesinfo.php`, {
        token,
        salesid,
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error getting order info:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get order info. Check console for details.");
    }
  },
};
