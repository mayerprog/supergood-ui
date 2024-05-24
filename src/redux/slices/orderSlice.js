import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  changeAmount: null,
  description: "",
  bonus: null,
  loyalty: [], //can be empty if no orders made
  errMessage: "",
  itemsUnavailable: [],
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
    setErrMessage: (state, action) => {
      state.errMessage = action.payload;
    },
    setItemsUnavailable: (state, action) => {
      state.itemsUnavailable = action.payload;
    },
  },
});

export const {
  addOrders,
  setChangeAmount,
  setBonus,
  setLoyalty,
  setErrMessage,
  setItemsUnavailable,
} = orderSlice.actions;

export default orderSlice.reducer;
