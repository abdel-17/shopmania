import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useState } from "react";

export function PasswordTextField(props: TextFieldProps) {
  const [hidden, setHidden] = useState(true);
  return (
    <TextField
      type={hidden ? "password" : "text"}
      name="password"
      label="Password"
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setHidden((hidden) => !hidden)}>
              {hidden ? (
                <VisibilityOffIcon htmlColor="gray" />
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
