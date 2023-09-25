import { Box, type BoxProps } from "@mui/material";

type FormProps = Omit<
  BoxProps<"form", { action: (formData: FormData) => void }>,
  "component" | "onSubmit"
>;

export function Form(props: FormProps) {
  const { action, ...rest } = props;
  return (
    <Box
      {...rest}
      component="form"
      onSubmit={(event) => {
        event.preventDefault(); // Prevent the page from reloading.
        const formData = new FormData(event.currentTarget);
        action(formData);
      }}
    />
  );
}
