import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";

export const store = configureStore({
  reducer: {
    item: itemReducer,
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
