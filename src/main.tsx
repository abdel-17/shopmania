import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import {
  ErrorBoundary,
  SessionProvider,
  SnackbarCloseButton,
} from "./components";
import "./global.css";
import theme from "./theme";

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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={(key) => <SnackbarCloseButton snackbarKey={key} />}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <ErrorBoundary>
            <SessionProvider>
              <App />
            </SessionProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
