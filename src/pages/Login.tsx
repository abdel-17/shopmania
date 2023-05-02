import React, { useState } from "react";
import { Navigate } from "react-router";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, useFirebaseAuth } from "../firebase-hooks/auth";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { LockOutlined as LockIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import FullscreenBox from "../components/FullscreenBox";
import EmailTextField from "../components/EmailTextField";
import PasswordTextField from "../components/PasswordTextField";
import FormPaper from "../components/FormPaper";
import { FirebaseError } from "firebase/app";

export default function Login() {
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
    const shouldRemember = submission.remember === "yes";

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await auth.setPersistence(
        shouldRemember ? browserLocalPersistence : browserSessionPersistence
      );
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
          <Avatar sx={{ marginBottom: 1.5, backgroundColor: "secondary.main" }}>
            <LockIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Box component="form" method="post" onSubmit={onSubmit} marginTop={2}>
            <EmailTextField id="email" autoFocus />

            <PasswordTextField id="current-password" autoComplete="current-password" />

            <FormControlLabel
              control={<Checkbox name="remember" value="yes" />}
              label="Remember me"
            />

            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              fullWidth
              sx={{ marginTop: 3, marginBottom: 1 }}
            >
              Login
            </Button>

            <MuiLink component={Link} to="/register" color="primary.light">
              Don't have an account? Register
            </MuiLink>
          </Box>
        </FormPaper>
      </Container>
    </FullscreenBox>
  );
}
