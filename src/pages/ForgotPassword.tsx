import { Box, Button, Container } from "@mui/material";
import EmailTextField from "../components/EmailTextField";
import Logo from "../components/Logo";
import supabase from "../supabase/client";
import Form from "../components/Form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function ForgotPassword() {
  const { mutate: reset, isLoading } = useMutation(async (formData: FormData) => {
    const email = formData.get("email") as string;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://shopmania.pages.dev/reset"
    });
    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }
    alert("An email will been sent to reset your password");
  });

  return (
    <Box display="flex" alignItems="center" minHeight="100vh">
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

        <Form method="post" action={reset} sx={{ marginTop: 4 }}>
          <EmailTextField id="email" autoFocus />

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Reset Password
          </Button>
        </Form>
      </Container>
    </Box>
  );
}
