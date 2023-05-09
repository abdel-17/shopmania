import { Box, Button, Container } from "@mui/material";
import EmailTextField from "../components/EmailTextField";
import Logo from "../components/Logo";
import supabase from "../supabase/client";
import Form from "../components/Form";
import { useState } from "react";

export default function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);

  const onFormData = async (formData: FormData) => {
    setSubmitting(true);

    const email = formData.get("email") as string;
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert("An email will been sent to reset your password");
    }

    setSubmitting(false);
  };

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
        <Logo />

        <Form method="post" onFormData={onFormData} sx={{ marginTop: 4 }}>
          <EmailTextField id="email" autoFocus />

          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
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
