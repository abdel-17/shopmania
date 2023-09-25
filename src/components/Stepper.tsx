import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

type StepperProps = {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export function Stepper(props: StepperProps) {
  const { value, onChange, min = 0, max = Infinity, disabled = false } = props;
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        color="secondary"
        disabled={disabled || value === max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <AddIcon />
      </IconButton>

      <Typography fontSize={18} fontWeight={500} marginX={1}>
        {value}
      </Typography>

      <IconButton
        color="secondary"
        disabled={disabled || value === min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <RemoveIcon />
      </IconButton>
    </Box>
  );
}
