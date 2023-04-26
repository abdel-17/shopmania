import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";

const queryClient = new QueryClient();
const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme baseColor="#DDDBDD">
        <App />
      </SkeletonTheme>
    </QueryClientProvider>
  </React.StrictMode>
);
