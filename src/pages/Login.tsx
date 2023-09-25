import { Box, Button, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { Navigate } from "react-router";

import {
  EmailTextField,
  Form,
  Link,
  Logo,
  PasswordTextField,
} from "../components";
import { useSession } from "../hooks";
import { supabase } from "../supabase";

export function Login() {
  const session = useSession();

  const { mutate: login, isLoading } = useMutation(
    async (formData: FormData) => {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
  );

  // Navigate back to the home page on login.
  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      className="fullscreen-no-toolbar"
      display="flex"
      alignItems="center"
      padding={1}
    >
      <Container maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Logo />

          <Form method="post" action={login} sx={{ marginTop: 4 }}>
            <EmailTextField autoFocus fullWidth />
            <PasswordTextField
              autoComplete="current-password"
              fullWidth
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
              sx={{ marginTop: 3 }}
            >
              Sign In
            </Button>
          </Form>

          <Link to="/forgot" color="text.secondary" sx={{ marginTop: 2 }}>
            Forgot your password?
          </Link>
        </Box>

        <Typography marginTop={4}>
          Don't have an account?{" "}
          <Link to="/register" color="primary.light">
            Sign up
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
