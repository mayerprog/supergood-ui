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
      console.log("loyaltylvl", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error getting points:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get points. Check console for details.");
    }
  },
};
