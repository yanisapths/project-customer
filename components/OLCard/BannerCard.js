import React from "react";
import { useTheme } from "@mui/material/styles";

function BannerCard({ courseName, procedures, type }) {
  const theme = useTheme();
  const procedureList = procedures ? (
    procedures?.map(({ procedureName }) => procedureName + ",")
  ) : (
    <></>
  );

  return (
    <div className="px-4 xl:px-8">
      <div className="flex pt-4 pb-2">
      <p className="h4 p-4 font-mitr text-[#005844] truncate">
        {courseName}
      </p>
      {type != "false" ? (
        <strong className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] px-2 py-1 text-xs font-medium self-center">
          {type}
        </strong>
      ) : (
        <></>
      )}
      </div>
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
