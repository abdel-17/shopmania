import { Box, SxProps, Theme } from "@mui/material";

export default function Form(props: {
  action: (formData: FormData) => void;
  method?: string;
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}) {
  const { action, method, sx, children } = props;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the page from reloading.
    const formData = new FormData(event.currentTarget);
    action(formData);
  };

  return (
    <Box component="form" method={method} onSubmit={onSubmit} sx={sx}>
      {children}
    </Box>
  );
}
