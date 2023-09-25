import { Box, Button, Container } from "@mui/material";
import EmailTextField from "../components/EmailTextField";
import Logo from "../components/Logo";
import supabase from "../supabase/client";
import Form from "../components/Form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export default function ForgotPassword() {
  const { mutate: reset, isLoading } = useMutation(
    async (formData: FormData) => {
      const email = formData.get("email") as string;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://shopmania.pages.dev/reset",
      });

      if (error) {
        console.error(error);
        enqueueSnackbar(error.message, { variant: "error" });
        return;
      }
      enqueueSnackbar("An email will been sent to reset your password", {
        variant: "info",
      });
    }
  );

  return (
    <Box className="fullscreen-no-toolbar centered" padding={1}>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <Logo />
        </Link>

        <Form method="post" action={reset} sx={{ marginTop: 3 }}>
          <EmailTextField id="email" autoFocus />

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{ marginTop: 1 }}
          >
            Reset Password
          </Button>
        </Form>
      </Container>
    </Box>
  );
}
