import FullscreenBox from "./FullscreenBox";
import { Button, Typography } from "@mui/material";
import errorIcon from "../assets/error.svg";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary, error }) => (
            <FullscreenBox
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              padding={4}
            >
              <img src={errorIcon} alt="error" style={{ maxWidth: 400 }} />

              <Typography component="h1" variant="h5" alignItems="center" marginY={3}>
                {error?.message ?? "An unknown error occurred"}
              </Typography>

              <Button variant="contained" size="large" onClick={resetErrorBoundary}>
                Retry
              </Button>
            </FullscreenBox>
          )}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
