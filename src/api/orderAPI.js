import axios from "axios";
import { baseURL } from "../config.js";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const orderAPI = {
  async orderPost(params) {
    const {
      token,
      salesid,
      addressid,
      nocontact,
      payamount,
      points,
      changeamount,
      paytype,
      description,
      dlvtime,
      minor_area_id,
    } = params;
    try {
      const response = await instance.post(`/orderpost.php`, {
        token,
        salesid,
        addressid,
        nocontact,
        payamount,
        points,
        changeamount,
        paytype,
        description,
        dlvtime,
        minor_area_id,
      });
      console.log("response", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error posting order:",
        err.response ? err.response.data : err
      );
      console.log("Failed to post order. Check console for details.");
    }
  },
  async getMinSum(params) {
    const { token, salesid, addressid } = params;
    try {
      const response = await instance.post(`/minsum.php`, {
        token,
        salesid,
        addressid,
      });
      console.log("response", response);
      return response.data;
    } catch (err) {
      console.error(
        "Error getting minimum sum:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get minimum sum. Check console for details.");
    }
  },
  async getBonus(token) {
    try {
      const response = await instance.post(`/getbalance.php`, {
        token,
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error getting points:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get points. Check console for details.");
    }
  },
  async getLoyalty(token) {
    try {
      const response = await instance.post(`/getbalancelevel.php`, {
        token,
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error getting points:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get points. Check console for details.");
    }
  },
  async setPromoCode(params) {
    const { token, salesid, promo } = params;
    try {
      const response = await instance.post(`/setpromo.php`, {
        token,
        salesid,
        promo,
      });
      console.log("response", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error activating promo:",
        err.response ? err.response.data : err
      );
      console.log("Failed to activate promocode. Check console for details.");
    }
  },
  async getSalesIds(params) {
    const { token } = params;
    try {
      const response = await instance.post(`/getsales.php`, {
        token,
      });
      console.log("response", response.data);
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
