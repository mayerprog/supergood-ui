import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  addressSelected: "",
  mapPosition: [55.7558, 37.6173],
  addressList: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMapPosition: (state, action) => {
      state.mapPosition = action.payload;
      console.log("mapPositionState", state.mapPosition);
    },
    setAddressSelected: (state, action) => {
      state.addressSelected = action.payload;
      // console.log("addressSelected", state.addressSelected);
    },
    removeAddressSelected: (state, action) => {
      state.addressSelected = "";
    },
    addAddress: (state, action) => {
      const { address, selected } = action.payload;

      //if new address selected=true, then make all old addresses selected false
      if (selected) {
        state.addressList.forEach((item) => {
          item.selected = false;
        });
      }
      //to add new address to addressList
      state.addressList = [
        ...state.addressList,
        { id: uuidv4(), address: address, selected: selected },
      ];
    },
    updateAddress: (state, action) => {
      const { id, newAddress } = action.payload;
      state.addressList = state.addressList.map((item) =>
        item.id === id ? { ...item, address: newAddress } : item
      );
    },
    updateSelected: (state, action) => {
      const elementIndex = action.payload;

      state.addressList = state.addressList.map((item, index) => {
        const isSelected = index === elementIndex;
        return {
          ...item,
          selected: isSelected,
        };
      });
      // to update addressSelected according to changed selected property
      const selectedAddress = state.addressList.find((item) => item.selected);
      state.addressSelected = selectedAddress ? selectedAddress.address : "";
    },
    removeAddress: (state, action) => {
      state.addressList = state.addressList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setAddressSelected,
  addAddress,
  updateAddress,
  updateSelected,
  removeAddress,
  removeAddressSelected,
  setMapPosition,
} = userSlice.actions;

export default userSlice.reducer;
