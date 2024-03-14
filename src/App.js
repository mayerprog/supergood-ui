import { Provider } from "react-redux";
import "./App.css";
import "leaflet/dist/leaflet.css";
import MainPage from "./Pages/MainPage/MainPage";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountPage from "./Pages/AccountPage/AccountPage";
import ProtectedRoute from "./HOC/ProtectedRoute";
import NewOrderPage from "./Pages/NewOrderPage/NewOrderPage";
// import LevelContext, { LevelContextProvider } from "./contexts/LevelContext";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit"
            element={
              <ProtectedRoute>
                <NewOrderPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
