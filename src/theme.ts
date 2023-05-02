import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a34857",
    },
    secondary: {
      main: "#48a394"
    }
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        regular: {
          height: 64
        }
      }
    }
  }
});

export default theme;
