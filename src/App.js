import { Provider } from "react-redux";
import "./App.css";
import "leaflet/dist/leaflet.css";
import MainPage from "./Pages/MainPage/MainPage";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./HOC/ProtectedRoute";
import NewOrderPage from "./Pages/NewOrderPage/NewOrderPage";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import { ModalOptionsContextProvider } from "./contexts/ModalOptionsContext";
// import LevelContext, { LevelContextProvider } from "./contexts/LevelContext";

function App() {
  return (
    <Provider store={store}>
      <ModalOptionsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/submit"
              element={
                <ProtectedRoute>
                  <NewOrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ModalOptionsContextProvider>
    </Provider>
  );
}

export default App;
