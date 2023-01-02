// @mui material components
import { createTheme } from "@mui/material/styles";

// Material Kit 2 React helper functions
import pxToRem from "../theme/functions/pxToRem";

// Material Kit 2 React base styles
import colors from "../theme/base/colors";


const theme = createTheme({
  palette: { ...colors },
  functions: {
    pxToRem,
  },
  typography: {
    fontFamily: ['Mitr','sans-serif'].join(','), 
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          {
            fontFamily: "Mitr",
            fontDisplay: "swap",
          },
        ],
      },
    },
  },
});

export default theme;