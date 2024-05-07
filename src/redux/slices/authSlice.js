import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  dataSms: {},
  dataLogin: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setDataSms: (state, action) => {
      state.dataSms = action.payload;
      console.log("dataSms", state.dataSms);
    },
    setDataLogin: (state, action) => {
      state.dataLogin = action.payload;
    },
  },
});

export const { setIsAuth, setDataSms, setDataLogin } = authSlice.actions;

export default authSlice.reducer;
