import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeAmount: 0,
  orderDescription: "",
  bonus: null,
  newBonus: 0,
  bonusActivated: null,
  loyaltyCard: [],
  orders: [],
  ordersItems: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // addOrders: (state, action) => {
    //   state.orders = [...state.orders, action.payload];
    // },
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
    setNewBonus: (state, action) => {
      state.newBonus = parseInt(action.payload);
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
  // addOrders,
  setOrders,
  setOrdersItems,
  setChangeAmount,
  setBonus,
  setNewBonus,
  setOrderDescription,
  setBonusActivated,
  setLoyaltyCard,
} = orderSlice.actions;

export default orderSlice.reducer;
