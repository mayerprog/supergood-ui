import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderInfo: {},
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orderInfo = action.payload;
    },
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
