import React from "react";
import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for OLInput
import OLInputRoot from "./OLInputRoot";

const OLInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <OLInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of MKInput
OLInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MKInput
OLInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default OLInput;