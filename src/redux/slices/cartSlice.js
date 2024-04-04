import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  itemsSum: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeItems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.itemid !== action.payload
      );
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

export const { addItems, removeItems, updateItem, updateSum, removeAllItems } =
  cartSlice.actions;

export default cartSlice.reducer;
