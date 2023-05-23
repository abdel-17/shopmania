import { Box, BoxProps } from "@mui/material";

export default function FullscreenBox(props: BoxProps) {
  return (
    <Box
      width="100%"
      minHeight={(theme) => `calc(100vh - ${theme.mixins.toolbar.height}px)`}
      {...props}
    />
  );
}
