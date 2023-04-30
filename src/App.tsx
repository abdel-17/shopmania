import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/index/Index";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Cart from "./pages/cart/Cart";
import About from "./pages/about/About";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
