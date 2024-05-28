import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  changeAmount: 0,
  orderDescription: "",
  bonus: null,
  errMessage: "",
  bonusActivated: null,
  loyaltyCard: [],
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
    setOrderDescription: (state, action) => {
      state.orderDescription = action.payload;
    },
    setBonus: (state, action) => {
      state.bonus = action.payload;
    },
    setErrMessage: (state, action) => {
      state.errMessage = action.payload;
    },
    setBonusActivated: (state, action) => {
      state.bonusActivated = action.payload;
    },
    setLoyaltyCard: (state, action) => {
      state.loyaltyCard = action.payload;
    },
  },
});

export const {
  addOrders,
  setChangeAmount,
  setBonus,
  setOrderDescription,
  setErrMessage,
  setBonusActivated,
  setLoyaltyCard,
} = orderSlice.actions;

export default orderSlice.reducer;
