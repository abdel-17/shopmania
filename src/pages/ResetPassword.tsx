import { Box, Button, Container } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

import { Form, Logo, PasswordTextField } from "../components";
import { useSession } from "../hooks";
import { supabase } from "../supabase";

export function ResetPassword() {
  const navigate = useNavigate();
  const session = useSession();
  const [error, setError] = useState<string | null>(null);

  const onPasswordChange = () => setError(null);

  const action = (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    updatePassword.mutate(password);
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

  // Protect this route from unauthenticated users. It's not insecure to let an
  // unauthenticated user visit this page because the password change will fail
  // anyway, but it's pointless to let them try.
  if (session === null) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      className="fullscreen-no-toolbar"
      display="flex"
      alignItems="center"
      padding={1}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />

        <Form method="post" action={action} sx={{ marginTop: 4 }}>
          <PasswordTextField
            name="password"
            autoFocus
            autoComplete="new-password"
            label="New password"
            onChange={onPasswordChange}
            fullWidth
          />
          <PasswordTextField
            name="confirm"
            autoComplete="new-password"
            label="Confirm password"
            error={error !== null}
            helperText={error}
            onChange={onPasswordChange}
            fullWidth
            margin="normal"
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
