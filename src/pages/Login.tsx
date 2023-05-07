import React, { useState } from "react";
import { Navigate } from "react-router";
import {
  Avatar,
  Box,
  Button,
  Container,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { LockOutlined as LockIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import FullscreenBox from "../components/FullscreenBox";
import EmailTextField from "../components/EmailTextField";
import PasswordTextField from "../components/PasswordTextField";
import FormPaper from "../components/FormPaper";
import useSession from "../hooks/session";
import supabase from "../supabase/client";

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

    const formData = new FormData(event.currentTarget);
    const submission = Object.fromEntries(formData);

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: submission.email as string,
      password: submission.password as string,
    });
    if (error) {
      console.error(error);
      alert(error.message);
    }
    setSubmitting(false);
  };

  return (
    <FullscreenBox display="flex" alignItems="center">
      <Container maxWidth="xs">
        <FormPaper>
          <Avatar sx={{ marginBottom: 1.5, backgroundColor: "secondary.main" }}>
            <LockIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Box component="form" method="post" onSubmit={onSubmit} marginTop={2}>
            <EmailTextField id="email" autoFocus />

            <PasswordTextField id="current-password" autoComplete="current-password" />

            <Button
              type="submit"
              disabled={submitting}
              variant="contained"
              fullWidth
              sx={{ marginTop: 3 }}
            >
              Login
            </Button>
          </Box>
        </FormPaper>

        <MuiLink component={Link} to="/register" color="primary.light">
          Don't have an account? Register
        </MuiLink>
      </Container>
    </FullscreenBox>
  );
}
