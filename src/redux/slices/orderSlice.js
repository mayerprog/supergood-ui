import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeAmount: 0,
  orderDescription: "",
  bonus: null,
  bonusActivated: null,
  loyaltyCard: [],
  orders: [],
  ordersItems: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrdersItems: (state, action) => {
      state.ordersItems = action.payload;
      console.log("ordersItems", state.ordersItems);
    },
    setChangeAmount: (state, action) => {
      state.changeAmount = parseInt(action.payload);
    },
    setOrderDescription: (state, action) => {
      state.orderDescription = action.payload;
    },
    setBonus: (state, action) => {
      state.bonus = parseInt(action.payload);
    },

    setBonusActivated: (state, action) => {
      state.bonusActivated = parseInt(action.payload);
    },
    setLoyaltyCard: (state, action) => {
      state.loyaltyCard = action.payload;
    },
  },
});

export const {
  setOrders,
  setOrdersItems,
  setChangeAmount,
  setBonus,
  setOrderDescription,
  setBonusActivated,
  setLoyaltyCard,
} = orderSlice.actions;

export default orderSlice.reducer;
