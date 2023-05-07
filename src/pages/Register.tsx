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
import { Link } from "react-router-dom";
import FullscreenBox from "../components/FullscreenBox";
import EmailTextField from "../components/EmailTextField";
import PasswordTextField from "../components/PasswordTextField";
import FormPaper from "../components/FormPaper";
import useSession from "../hooks/session";
import supabase from "../supabase/client";

export default function Register() {
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

    const email = submission.email as string;
    const password = submission.password as string;

    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: submission.email as string,
      password: submission.password as string,
    });
    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert("A confirmation email will be sent to verify the account")
    }
    setSubmitting(false);
  };

  return (
    <FullscreenBox display="flex" alignItems="center">
      <Container maxWidth="xs">
        <FormPaper>
          <Avatar sx={{ marginBottom: 1.5, backgroundColor: "secondary.main" }} />

          <Typography component="h1" variant="h5">
            Create an account
          </Typography>

          <Box component="form" method="post" onSubmit={onSubmit} marginTop={2}>
            <EmailTextField id="email" autoFocus />

            <PasswordTextField
              id="new-password"
              autoComplete="new-password"
              helperText="Enter 8 or more characters"
              inputProps={{
                minLength: 8,
              }}
            />

            <Button
              type="submit"
              disabled={submitting}
              variant="contained"
              fullWidth
              sx={{ marginTop: 3, marginBottom: 1 }}
            >
              Create Account
            </Button>
          </Box>
        </FormPaper>

        <MuiLink component={Link} to="/login" color="primary.light">
          Already have an account? Login
        </MuiLink>
      </Container>
    </FullscreenBox>
  );
}
