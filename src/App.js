import { Provider } from "react-redux";
import "./App.css";
import "leaflet/dist/leaflet.css";
import MainPage from "./Pages/MainPage/MainPage";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountPage from "./Pages/AccountPage/AccountPage";
import LevelContext, { LevelContextProvider } from "./contexts/LevelContext";

function App() {
  return (
    <Provider store={store}>
      <LevelContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/user" element={<AccountPage />} />
          </Routes>
        </BrowserRouter>
      </LevelContextProvider>
    </Provider>
  );
}

export default App;
