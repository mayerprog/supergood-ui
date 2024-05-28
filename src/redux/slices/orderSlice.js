import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  changeAmount: null,
  description: "",
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
    setDescription: (state, action) => {
      state.description = action.payload;
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
  setErrMessage,
  setBonusActivated,
  setLoyaltyCard,
} = orderSlice.actions;

export default orderSlice.reducer;
