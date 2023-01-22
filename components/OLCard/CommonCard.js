import React from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "../OLButton/IconButton";
import SimpleChip from "../OLChip/SimpleChip";
import { Box } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function CommonCard({
  id,
  courseName,
  clinic_name,
  status,
  rejectReason,
  tag,
  procedures,
}) {
  const theme = useTheme();
  const procedureList = procedures ? (
    procedures?.map(({ procedureName }) => procedureName + ",")
  ) : (
    <></>
  );

  return (
    <Box
      className="cursor-pointer rounded-2xl shadow-xl overflow-x-auto p-4 pt-8 w-full lg:mb-8 mb-4 h-fit"
      sx={{ bgcolor: theme.palette.background.white, width: "100%" }}
    >
      <div className="px-8 flex justify-between">
        <div className="flex space-x-6">
          <p className="h4 pt-2">{courseName}</p>
          <div
            className={
              status == "pending"
                ? "whitespace-nowrap rounded-full w-fit h-fit px-3 py-2 xl:py-1 bg-[#F9D373]/90 shadow-lg shadow-[#F9D373]/40"
                : status == "rejected"
                ? "whitespace-nowrap rounded-full w-fit h-fit px-3 py-2 xl:py-1 bg-[#FF2F3B]/90 shadow-lg shadow-[#FF2F3B]/40"
                : "whitespace-nowrap rounded-full w-fit h-fit px-3 py-2 xl:py-1 bg-[#2ED477]/90 shadow-lg shadow-[#2ED477]/40"
            }
          >
            <strong className="text-white font-light text-sm md:text-md">
              {status}{" "}
            </strong>
          </div>
        </div>
        <IconButton
          icon={<OpenInNewIcon className="text-black/40 xl:w-16 xl:h-8" />}
          title="ดูตาราง"
        />
      </div>
      <div>
        {procedures ? (
          <div className="pt-6 px-8">
            <p className="tracking-wide body1 text-black truncate">
              {procedureList}
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="pt-2 px-8">
        {rejectReason ? (
          <div>
            <p className="text-black/50">เหตุผลจากคลินิก</p>
            <p className="body1 text-[#FF2F3B]">{rejectReason}</p>
          </div>
        ) : (
          <></>
        )}{" "}
      </div>
      <div className="p-8">
        <div class="relative top-4">
          <div class=" bottom-0 left-0">
            {" "}
            <p className="h4 text-[#005844]">{clinic_name}</p>
          </div>
        </div>
        <div class="relative top-4">
          <div class="absolute bottom-0 right-0">
            {" "}
            {tag ? (
              <div className="whitespace-nowrap rounded-full px-3 py-2 bg-[#A5A6F6]/40  w-fit h-fit text-center">
                <strong className="text-[#5D5FEF] font-light text-sm md:text-md">
                  {tag}
                </strong>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default CommonCard;
