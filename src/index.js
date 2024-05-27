import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { AddressContextProvider } from "./contexts/AddressContext";
import { ModalsContextProvider } from "./contexts/ModalsContext";

export const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AddressContextProvider>
          <ModalsContextProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ModalsContextProvider>
        </AddressContextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
