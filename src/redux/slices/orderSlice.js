import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  changeAmount: null,
  description: "",
  bonus: null,
  loyalty: [], //can be empty if no orders made
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrders: (state, action) => {
      state.orders = [...state.orders, action.payload];
      console.log("orders", state.orders);
    },
    setChangeAmount: (state, action) => {
      state.changeAmount = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setBonus: (state, action) => {
      state.bonus = action.payload;
    },
    setLoyalty: (state, action) => {
      state.loyalty = action.payload;
    },
  },
});

export const { addOrders, setChangeAmount, setBonus, setLoyalty } =
  orderSlice.actions;

export default orderSlice.reducer;
