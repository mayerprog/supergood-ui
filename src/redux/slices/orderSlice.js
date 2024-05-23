import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   orderInfo: {},
  orders: [],
  changeAmount: null,
  description: "",
  bonus: null,
  loyalty: null,
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
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setBonus: (state, action) => {
      state.bonus = action.payload;
    },
  },
});

export const {
  setOrderInfo,
  removeOrderInfo,
  addOrders,
  setChangeAmount,
  setBonus,
} = orderSlice.actions;

export default orderSlice.reducer;
