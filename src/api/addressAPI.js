import axios from "axios";
import { baseURL } from "../config.js";

// const path = "/tasks";

const instance = axios.create({
  //   baseURL: baseURL + path,
  baseURL: baseURL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const addressAPI = {
  async saveAddress(params) {
    const {
      token,
      street,
      lat,
      long,
      addressid,
      streetid,
      houseid,
      entrance,
      floor,
      flat,
      description,
      selected,
    } = params;
    try {
      const response = await instance.post(`/saveaddress.php`, {
        token,
        street,
        lat,
        long,
        addressid,
        streetid,
        houseid,
        entrance,
        floor,
        flat,
        description,
        selected,
      });
      console.log("responseFromSaveAddress", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error saving address:",
        err.response ? err.response.data : err
      );
      console.log("Failed to save address. Check console for details.");
    }
  },

  async deleteAddress(params) {
    const { token, addressid, status } = params;
    try {
      const response = await instance.post(`/saveaddress.php`, {
        token,
        addressid,
        status,
      });
      console.log("responseFromDeleteAddress", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error saving address:",
        err.response ? err.response.data : err
      );
      console.log("Failed to save address. Check console for details.");
    }
  },

  async getAddress(lat, long) {
    try {
      const response = await instance.post(`/getaddress.php`, {
        lat,
        long,
      });
      console.log("address", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error getting address:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get address. Check console for details.");
    }
  },

  async getAddressList(street) {
    try {
      const response = await instance.post(`/getaddress.php`, {
        street,
      });
      console.log("addressList", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error getting address list:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get address list. Check console for details.");
    }
  },

  async getHousesList(streetid) {
    try {
      const response = await instance.post(`/getaddress.php`, {
        streetid,
      });
      console.log("housesList", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error getting houses list:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get houses list. Check console for details.");
    }
  },

  async getHouse(streetid, house) {
    try {
      const response = await instance.post(`/getaddress.php`, {
        streetid,
        house,
      });
      console.log("house", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error getting house number:",
        err.response ? err.response.data : err
      );
      console.log("Failed to get house number. Check console for details.");
    }
  },

  async getPoly() {
    try {
      const response = await instance.post(`/getpoly.php`);
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
