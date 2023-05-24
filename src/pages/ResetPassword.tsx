import { Button, Box, Container } from "@mui/material";
import PasswordTextField from "../components/PasswordTextField";
import Form from "../components/Form";
import { useMutation } from "@tanstack/react-query";
import supabase from "../supabase/client";
import { useState } from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";

export default function ResetPassword() {
  const navigate = useNavigate();
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
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
      return;
    }
    enqueueSnackbar("Password updated successfully", { variant: "success" });
    navigate("/", { replace: true });
  });

  return (
    <Box className="fullscreen-no-toolbar centered" padding={1}>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />

        <Form action={action} sx={{ marginTop: 3 }}>
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={updatePassword.isLoading}
            sx={{ marginTop: 3 }}
          >
            Reset Password
          </Button>
        </Form>
      </Container>
    </Box>
  );
}
