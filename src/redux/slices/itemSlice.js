import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.images = [...state.images, action.payload];
      console.log("images", state.images);
    },
  },
});

export const { setItems } = itemSlice.actions;

export default itemSlice.reducer;
