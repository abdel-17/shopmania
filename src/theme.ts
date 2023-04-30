import { ThemeOptions, createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ec407a",
    },
    secondary: {
      main: "#ab47bc",
    },
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
