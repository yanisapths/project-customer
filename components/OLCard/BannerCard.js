import React from "react";
import { useTheme } from "@mui/material/styles";

function BannerCard({ courseName, procedures }) {
  const theme = useTheme();
  const procedureList = procedures ? (
    procedures?.map(({ procedureName }) => procedureName + ",")
  ) : (
    <></>
  );

  return (
    <div>
      <p className="h4 pt-6 p-4 pb-2 font-mitr text-[#005844]">{courseName}</p>
      {procedures ? (
        <p className="pb-4 px-4 pr-24 tracking-wide body1 text-[#005844] truncate">
          {procedureList}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default BannerCard;
