import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";

function EmailTextField(props: TextFieldProps) {
  return (
    <TextField
      type="email"
      name="email"
      label="Email Address"
      autoComplete="email"
      margin="normal"
      fullWidth
      required
      {...props}
    />
  );
}

export default EmailTextField;
