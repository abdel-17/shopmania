import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as InvisibilityIcon,
} from "@mui/icons-material";
import { useState } from "react";

export default function PasswordTextField(props: TextFieldProps) {
  const [hidden, setHidden] = useState(true);
  const onToggleHidden = () => setHidden((show) => !show);
  return (
    <TextField
      type={hidden ? "password" : "text"}
      name="password"
      label="Password"
      margin="normal"
      fullWidth
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onToggleHidden}>
              {hidden ? (
                <InvisibilityIcon htmlColor="gray" />
              ) : (
                <VisibilityIcon htmlColor="lightgray" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
