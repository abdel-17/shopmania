import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export default function Stepper({
  value,
  onChange,
  min = 0,
  max = Infinity,
}: {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
}) {
  const onIncrement = () => onChange(Math.min(max, value + 1));
  const onDecrement = () => onChange(Math.max(min, value - 1));
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={onIncrement} disabled={value === max} color="secondary">
        <AddIcon />
      </IconButton>

      <Typography fontSize={18} fontWeight={500} marginX={1}>
        {value}
      </Typography>

      <IconButton onClick={onDecrement} disabled={value === min} color="secondary">
        <RemoveIcon />
      </IconButton>
    </Box>
  );
}
