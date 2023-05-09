import FullscreenBox from "./FullscreenBox";
import { Button, Typography } from "@mui/material";
import errorIcon from "../assets/error.svg";

export default function ErrorFallback(props: { error: string; onRetry: () => void }) {
  const { error, onRetry } = props;
  return (
    <FullscreenBox
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
    >
      <img src={errorIcon} alt="error" style={{ maxWidth: 400 }} />

      <Typography component="h1" variant="h5" alignItems="center" marginY={3}>
        {error}
      </Typography>

      <Button variant="contained" size="large" onClick={onRetry}>
        Retry
      </Button>
    </FullscreenBox>
  );
}
