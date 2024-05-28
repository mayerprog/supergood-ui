import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  itemsSum: null,
  deliveryTime: 0,
  minAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    setItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setDeliveryTime: (state, action) => {
      state.deliveryTime = action.payload;
    },
    setMinAmount: (state, action) => {
      state.minAmount = action.payload;
    },
    removeItems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.itemid !== action.payload
      );
      state.itemsSum = 0;
    },
    removeAllItems: (state, action) => {
      state.cartItems = [];
    },
    updateItem: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.itemid === action.payload.itemid ? action.payload : item
      );
    },
    updateSum: (state, action) => {
      state.itemsSum = action.payload;
    },
  },
});

export const {
  addItems,
  setItems,
  setDeliveryTime,
  setMinAmount,
  removeItems,
  updateItem,
  updateSum,
  removeAllItems,
} = cartSlice.actions;

export default cartSlice.reducer;
