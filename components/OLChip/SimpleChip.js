import React from "react";
import { useTheme } from "@mui/material/styles";

function SimpleChip({ prefix, text, quantify }) {
  const theme = useTheme();

  return (
    <p className="whitespace-nowrap rounded-full px-4 py-1 md:px-6 md:py-1.5 text-md md:text-lg font-light bg-[#acded5]/40 text-[#005844] w-fit text-center">
      {prefix} <span> </span> {text} <span> </span> {quantify}
    </p>
  );
}

export default SimpleChip;
