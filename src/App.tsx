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
import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import ErrorBoundary from "./components/ErrorBoundary";
import supabase from "./supabase/client";

const SessionContext = createContext<Session | null>(null);

export function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Listen to changes to the auth state.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <ErrorBoundary>
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
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
