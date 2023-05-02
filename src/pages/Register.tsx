import React, { useState } from "react";
import { Navigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, useFirebaseAuth } from "../firebase-hooks/auth";
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
import { FirebaseError } from "firebase/app";

export default function Register() {
  const user = useFirebaseAuth();
  const [loading, setLoading] = useState(false);

  if (user) {
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

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        alert(error.message);
      }
    }
    setLoading(false);
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
              disabled={loading}
              variant="contained"
              fullWidth
              sx={{ marginTop: 3, marginBottom: 1 }}
            >
              Create Account
            </Button>

            <MuiLink component={Link} to="/login" color="primary.light">
              Already have an account? Login
            </MuiLink>
          </Box>
        </FormPaper>
      </Container>
    </FullscreenBox>
  );
}
