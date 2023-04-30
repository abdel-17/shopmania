import { Box, BoxProps } from "@mui/material";

function FullscreenBox(props: BoxProps) {
  return <Box width="100%" minHeight="calc(100vh - 64px)" {...props} />;
}

export default FullscreenBox;
