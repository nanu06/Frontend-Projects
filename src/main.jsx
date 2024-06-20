import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/Search.jsx";
import Calculator from './pages/Calculator.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/calculator" element={<Calculator />}></Route>
    </Routes>
  </BrowserRouter>
);
