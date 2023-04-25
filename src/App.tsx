import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index/Index";
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact";
import Root from "./pages/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Root>
          <Routes>
            <Route index element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Root>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
