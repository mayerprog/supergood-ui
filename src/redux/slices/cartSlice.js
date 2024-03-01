import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      console.log("reduxItems", state.cartItems);
    },
  },
});

export const { addItems } = cartSlice.actions;

export default cartSlice.reducer;
