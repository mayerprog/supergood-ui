import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";
import authReducer from "./slices/authSlice";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../services/localStorage";

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    item: itemReducer,
    cart: cartReducer,
    address: addressReducer,
    auth: authReducer,
  },
  // Preload the state
  // preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // immutableCheck: {
      //   // Ignore state paths, e.g. state for 'items':
      //   ignoredPaths: ["items.data"],
      // },
      // serializableCheck: { ignoredPaths: ["some.nested.path"] },
    }),
});

// store.subscribe(() => {
//   saveToLocalStorage({
//     cart: store.getState().cart,
//     // Include any other part of the state you wish to persist
//   });
// });
