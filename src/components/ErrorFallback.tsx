import FullscreenBox from "./FullscreenBox";
import { Button, Typography } from "@mui/material";
import error from "../assets/error.svg";

export default function ErrorFallback(props: { error: Error; onRetry: () => void }) {
  return (
    <FullscreenBox
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
    >
      <img src={error} alt="error" style={{ maxWidth: 400 }} />

      <Typography component="h1" variant="h5" alignItems="center" marginY={3}>
        {props.error.message}
      </Typography>

      <Button variant="contained" size="large" onClick={props.onRetry}>
        Retry
      </Button>
    </FullscreenBox>
  );
}
