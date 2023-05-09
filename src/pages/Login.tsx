import React, { useState } from "react";
import { Navigate } from "react-router";
import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import supabase from "../supabase/client";
import { useSession } from "../components/SessionProvider";
import EmailTextField from "../components/EmailTextField";
import PasswordTextField from "../components/PasswordTextField";
import Logo from "../components/Logo";

export default function Login() {
  const session = useSession();
  const [submitting, setSubmitting] = useState(false);

  if (session) {
    // Replace this component with the home page on login.
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the page from reloading.
    event.preventDefault();

    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (error) {
      console.error(error);
      alert(error.message);
    }

    setSubmitting(false);
  };

  return (
    <Box display="flex" alignItems="center" minHeight="100vh">
      <Container maxWidth="xs">
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            marginBottom: 2,
            borderRadius: 4,
          }}
        >
          <Logo />

          <Box component="form" method="post" onSubmit={onSubmit} marginTop={3}>
            <EmailTextField id="email" autoFocus />

            <PasswordTextField id="current-password" autoComplete="current-password" />

            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              fullWidth
              sx={{ marginTop: 3, marginBottom: 2 }}
            >
              Sign In
            </Button>
          </Box>

          <MuiLink component={Link} to="/forgot" color="text.secondary">
            Forgot your password?
          </MuiLink>
        </Paper>

        <Typography color="text.primary">
          Don't have an account?
          <MuiLink component={Link} to="/register" color="primary.light" marginLeft={1}>
            Sign up
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
}
