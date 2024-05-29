import { combineReducers, configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage: storage,
  blacklist: [
    "addressList",
    "mapPosition",
    "userData",
    "salesid",
    "token",
    "floor",
    "flat",
    "entrance",
    "description",
    "minorAreaId",
  ],
};

const rootReducer = combineReducers({
  item: itemReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  // cart: cartReducer,
  user: persistReducer(userPersistConfig, userReducer),
  // user: userReducer,
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
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["_persist"],
      },
    }).concat(thunk),
});
