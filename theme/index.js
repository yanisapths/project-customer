// @mui material components
import { createTheme } from "@mui/material/styles";

// Material Kit 2 React helper functions
import pxToRem from "../theme/functions/pxToRem";

// Material Kit 2 React base styles
import colors from "../theme/base/colors";


export default createTheme({
  palette: { ...colors },
  functions: {
    pxToRem,
  },
});