import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   orderInfo: {},
  orders: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // setOrderInfo: (state, action) => {
    //   state.orderInfo = action.payload;
    // },
    // removeOrderInfo: (state, action) => {
    //   state.orderInfo = [];
    // },
    addOrders: (state, action) => {
      state.orders = [...state.orders, action.payload];
      console.log("orders", state.orders);
    },
  },
});

export const { setOrderInfo, removeOrderInfo, addOrders } = orderSlice.actions;

export default orderSlice.reducer;
