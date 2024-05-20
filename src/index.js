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
import { LevelContextProvider } from "./contexts/LevelContext";

export const persistor = persistStore(store);
// export { persistor };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LevelContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </LevelContextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
