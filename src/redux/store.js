import { combineReducers, configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";
import cartReducer from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage: storage,
  blacklist: ["addressList", "mapPosition", "userData", "salesid", "token"],
};

const rootReducer = combineReducers({
  item: itemReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  user: persistReducer(userPersistConfig, userSlice),
  auth: authReducer,
  order: orderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        // Ignore state paths, e.g. state for 'items':
        ignoredPaths: ["items.data"],
      },
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
        ignoredPaths: ["_persist"],
      },
    }),
});
