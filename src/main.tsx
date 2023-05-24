import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { SnackbarProvider } from "notistack";
import "./global.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
