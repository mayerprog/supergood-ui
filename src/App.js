import { Provider } from "react-redux";
import "./App.css";
import "leaflet/dist/leaflet.css";
import MainPage from "./Pages/MainPage/MainPage";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountPage from "./Pages/AccountPage/AccountPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/user" element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
