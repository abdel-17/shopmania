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
import EmailTextField from "../components/EmailTextField";
import PasswordTextField from "../components/PasswordTextField";
import Logo from "../components/Logo";
import Form from "../components/Form";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "../App";

export default function Login() {
  const session = useSession();

  const { mutate: login, isLoading } = useMutation(async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error(error);
      alert(error.message);
    }
  });

  // Navigate back to the home page on login success.
  if (session) {
    return <Navigate to="/" replace />
  }

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
          <Link to="/">
            <Logo />
          </Link>

          <Form method="post" action={login} sx={{ marginTop: 3 }}>
            <EmailTextField id="email" autoFocus />

            <PasswordTextField id="current-password" autoComplete="current-password" />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
              sx={{ marginTop: 3, marginBottom: 2 }}
            >
              Sign In
            </Button>
          </Form>

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
