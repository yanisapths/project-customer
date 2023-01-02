import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

function BannerCard({ courseName, procedures }) {
  const theme = useTheme();
  const procedureList = procedures ? (
    procedures?.map(({ procedureName }) => procedureName + ",")
  ) : (
    <></>
  );

  return (
    <>
      <Box
        className="overflow-y-auto py-6 rounded-lg shadow-md"
        sx={{ bgcolor: theme.palette.background.lightgrey }}
      >
        <p className="h4 px-4 pb-2 font-mitr">{courseName}</p>
        {procedures ? (
          <p className="px-4 pr-24 tracking-wide caption text-black/50 truncate">
            {procedureList}
          </p>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default BannerCard;
