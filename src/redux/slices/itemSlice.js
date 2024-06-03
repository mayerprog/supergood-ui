import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  promotions: [],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setPromotions: (state, action) => {
      state.promotions = action.payload;
    },
  },
});

export const { setItems, setPromotions } = itemSlice.actions;

export default itemSlice.reducer;
