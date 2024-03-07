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
      // console.log("reduxItems", state.cartItems);
    },
    removeItems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateItem: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      // console.log("cartItems", state.cartItems);
    },
    updateSum: (state, action) => {
      state.itemsSum = action.payload;
      // console.log("state.itemsSum", state.itemsSum);
    },
  },
});

export const { addItems, removeItems, updateItem, updateSum } =
  cartSlice.actions;

export default cartSlice.reducer;
