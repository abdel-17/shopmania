import { Box, Button, Container } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import { EmailTextField, Form, Logo } from "../components";
import { supabase } from "../supabase";

export function ForgotPassword() {
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
    },
  );

  return (
    <Box
      className="fullscreen-no-toolbar"
      display="flex"
      alignItems="center"
      padding={1}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />

        <Form method="post" action={reset} sx={{ marginTop: 4 }}>
          <EmailTextField autoFocus fullWidth />

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Reset Password
          </Button>
        </Form>
      </Container>
    </Box>
  );
}
