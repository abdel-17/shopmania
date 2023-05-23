import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Index from "./pages/Index";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ErrorBoundary from "./components/ErrorBoundary";
import { SessionProvider } from "./providers/SessionProvider";
import { CartItemsProvider } from "./providers/CartItemsProvider";

export function App() {
  return (
    <ErrorBoundary>
      <SessionProvider>
        <CartItemsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />

                <Route path="/products" element={<Products />} />

                <Route path="/products/:id" element={<ProductDetail />} />

                <Route path="/contact" element={<Contact />} />

                <Route path="/about" element={<About />} />

                <Route path="/cart" element={<Cart />} />
              </Route>

              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route path="/forgot" element={<ForgotPassword />} />

              <Route path="/reset" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
        </CartItemsProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}
