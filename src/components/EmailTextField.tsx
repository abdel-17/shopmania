import { TextField, type TextFieldProps } from "@mui/material";

export function EmailTextField(props: TextFieldProps) {
  return (
    <TextField
      type="email"
      name="email"
      label="Email Address"
      autoComplete="email"
      required
      {...props}
    />
  );
}
