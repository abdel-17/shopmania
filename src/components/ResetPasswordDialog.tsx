import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PasswordTextField from "./PasswordTextField";
import Form from "./Form";
import { useMutation } from "@tanstack/react-query";
import supabase from "../supabase/client";
import { useState } from "react";

export default function ResetPasswordDialog(props: {
  open: boolean;
  onClose: () => void;
}) {
  const { open, onClose } = props;
  const [error, setError] = useState<string | null>(null);

  const onPasswordChange = () => setError(null);

  const action = (formData: FormData) => {
    const newPassword = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (newPassword !== confirm) {
      setError("Passwords do not match");
      return;
    }
    updatePassword.mutate(newPassword);
  };

  const updatePassword = useMutation(async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setError(error.message);
      return;
    }
    console.log("Updated password successfully");
    onClose(); 
  });

  return (
    <Dialog open={open} maxWidth="xs">
      <Form action={action}>
        <DialogTitle>Reset Password</DialogTitle>

        <DialogContent>
          <PasswordTextField
            id="new-password"
            name="password"
            autoFocus
            autoComplete="new-password"
            label="New password"
            onChange={onPasswordChange}
          />
          <PasswordTextField
            id="confirm-password"
            name="confirm"
            autoComplete="new-password"
            label="Confirm password"
            error={error !== null}
            helperText={error}
            onChange={onPasswordChange}
          />
        </DialogContent>

        <DialogActions>
          <Button type="button" onClick={onClose} disabled={updatePassword.isLoading}>
            Cancel
          </Button>

          <Button type="submit" disabled={updatePassword.isLoading}>
            Confirm
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
