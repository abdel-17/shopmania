import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import EmailTextField from "../components/EmailTextField";
import PasswordTextField from "../components/PasswordTextField";
import supabase from "../supabase/client";
import Logo from "../components/Logo";
import Form from "../components/Form";
import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const { mutate: register, isLoading } = useMutation(async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }
    alert("A confirmation email will be sent to verify your account");
  });

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

          <Form method="post" action={register} sx={{ marginTop: 3 }}>
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
              variant="contained"
              disabled={isLoading}
              fullWidth
              sx={{ marginTop: 3 }}
            >
              Sign Up
            </Button>
          </Form>
        </Paper>

        <Typography color="text.primary">
          Already have an account?
          <MuiLink component={Link} to="/login" color="primary.light" marginLeft={1}>
            Sign in
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
}
