import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   orderInfo: {},
  orders: [],
  changeAmount: null,
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
    setChangeAmount: (state, action) => {
      state.changeAmount = action.payload;
    },
  },
});

export const { setOrderInfo, removeOrderInfo, addOrders, setChangeAmount } =
  orderSlice.actions;

export default orderSlice.reducer;
