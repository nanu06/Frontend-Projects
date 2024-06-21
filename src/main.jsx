import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/Search.jsx";
import Calculator from './pages/Calculator.jsx'
import Todo from "./pages/Todo.jsx";
import Ecommerce from "./pages/Ecommerce.jsx";
import Form from "./pages/Form.jsx";
import Pagination from "./pages/Pagination.jsx";
import ImageGallery from "./pages/ImageGallery.jsx";
import Wether from "./pages/Wether.jsx";
import ChatApp from "./pages/ChatApp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/calculator" element={<Calculator />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
      <Route path="/ecommerce" element={<Ecommerce />}></Route>
      <Route path="/form" element={<Form />}></Route>
      <Route path="/pagination" element={<Pagination />}></Route>
      <Route path="/imageGallery" element={<ImageGallery />}></Route>
      <Route path="/wether" element={<Wether />}></Route>
      <Route path="/chatApp" element={<ChatApp />}></Route>\{" "}
    </Routes>
  </BrowserRouter>
);
