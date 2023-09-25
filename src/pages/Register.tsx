import { Box, Button, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import {
  EmailTextField,
  Form,
  Link,
  Logo,
  PasswordTextField,
} from "../components";
import { supabase } from "../supabase";

export function Register() {
  const { mutate: register, isLoading } = useMutation(
    async (formData: FormData) => {
      const { error } = await supabase.auth.signUp({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: "error" });
        return;
      }

      enqueueSnackbar(
        "A confirmation email will be sent to verify your account",
        { variant: "info" },
      );
    },
  );

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

          <Form method="post" action={register} sx={{ marginTop: 4 }}>
            <EmailTextField autoFocus fullWidth />

            <PasswordTextField
              autoComplete="new-password"
              helperText="Enter 8 or more characters"
              fullWidth
              margin="normal"
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
        </Box>

        <Typography marginTop={4}>
          Already have an account?{" "}
          <Link to="/login" color="primary.light">
            Sign in
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
