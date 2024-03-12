import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";

export const store = configureStore({
  reducer: {
    item: itemReducer,
    cart: cartReducer,
    address: addressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        // Ignore state paths, e.g. state for 'items':
        ignoredPaths: ["items.data"],
      },
      serializableCheck: { ignoredPaths: ["some.nested.path"] },
    }),
});
