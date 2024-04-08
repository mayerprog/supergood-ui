import { combineReducers, configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";
import authReducer from "./slices/authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["dataSms", "dataLogin"],
};

const addressPersistConfig = {
  key: "address",
  storage: storage,
  blacklist: ["addressList"],
};

const rootReducer = combineReducers({
  item: itemReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  address: persistReducer(addressPersistConfig, addressReducer),
  auth: persistReducer(authPersistConfig, authReducer),
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
