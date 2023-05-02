import { TextField, TextFieldProps } from "@mui/material";

export default function EmailTextField(props: TextFieldProps) {
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
