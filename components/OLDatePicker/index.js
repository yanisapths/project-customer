import React from "react";
import PropTypes from "prop-types";

// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

// Material Kit 2 React components
import OLInput from "../OLInput";

function OLDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <OLInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

// Setting default values for the props of MKDatePicker
OLDatePicker.defaultProps = {
  input: {},
};

// Typechecking props for the MKDatePicker
OLDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default OLDatePicker;