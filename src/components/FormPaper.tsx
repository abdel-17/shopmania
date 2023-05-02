import { Paper, PaperProps } from "@mui/material";

export default function FormPaper(props: PaperProps) {
  const { sx, ...rest } = props;
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        borderRadius: 4,
        ...sx,
      }}
      {...rest}
    />
  );
}
