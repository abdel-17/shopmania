import { Close as CloseIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSnackbar, type SnackbarKey } from "notistack";

type SnackbarCloseButtonProps = {
  snackbarKey: SnackbarKey;
};

export function SnackbarCloseButton(props: SnackbarCloseButtonProps) {
  const { snackbarKey } = props;
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)} color="inherit">
      <CloseIcon />
    </IconButton>
  );
}
