import { Box, BoxProps } from "@mui/material";

export default function FullscreenBox(props: BoxProps) {
  return <Box width="100%" minHeight="calc(100vh - 64px)" {...props} />;
}
