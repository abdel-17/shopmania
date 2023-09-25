import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ErrorBoundary, SessionProvider } from "./components";
import {
  About,
  Cart,
  Contact,
  ForgotPassword,
  Layout,
  Login,
  ProductDetail,
  Products,
  Register,
  ResetPassword,
} from "./pages";

export function App() {
  return (
    <ErrorBoundary>
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/products" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Route>

            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </ErrorBoundary>
  );
}
