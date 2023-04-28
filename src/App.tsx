import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index/Index";
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact";
import Root from "./pages/Root";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Root>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Root>
    </BrowserRouter>
  );
}

export default App;
