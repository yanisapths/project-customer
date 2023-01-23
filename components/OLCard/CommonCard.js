import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import IconButton from "../OLButton/IconButton";
import SimpleChip from "../OLChip/SimpleChip";
import { Box } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function CommonCard({
  schedule_id,
  course_id,
  clinicName,
  status,
  rejectReason,
  tag,
}) {
  const theme = useTheme();
  const [courses, setCourseList] = useState({});
  const router = useRouter();

  const fetchData = async () => {
    let isSubscribed = true;
    const res = await fetch(
      `${process.env.local}/course/${course_id}`
    );
    const courses = await res.json();

    if (isSubscribed) {
      setCourseList(courses);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    if (course_id) {
      fetchData().catch(console.error);
    }
  });

  const procedureList = courses.procedures ? (
    courses.procedures?.map(({ procedureName }) => procedureName + ",")
  ) : (
    <></>
  );

  return (
    <Box
      className="cursor-pointer rounded-2xl shadow-xl overflow-x-auto p-4 pt-8 w-full lg:mb-8 mb-4 h-[300px] transition hover:shadow-2xl overflow-hidden"
      sx={{ bgcolor: theme.palette.background.white, width: "100%" }}
    >
      <div className="px-8 flex justify-between">
        <div className="flex space-x-6">
          <p className="h4 pt-2">{courses.courseName}</p>
          <div
            className={
              status == "pending"
                ? "mt-2 whitespace-nowrap rounded-full w-fit h-fit px-3 py-1 bg-[#F9D373]/90 shadow-lg shadow-[#F9D373]/40"
                : status == "Rejected"
                ? "mt-2 whitespace-nowrap rounded-full w-fit h-fit px-3 py-1 bg-[#FF2F3B]/90 shadow-lg shadow-[#FF2F3B]/40"
                : "mt-2 whitespace-nowrap rounded-full w-fit h-fit px-3 py-1 bg-[#2ED477]/90 shadow-lg shadow-[#2ED477]/40"
            }
          >
            <strong className="text-white font-light text-sm md:text-md">
              {status}{" "}
            </strong>
          </div>
        </div>
        {status != "Rejected" ? (
          <IconButton
            path={`/schedule/${schedule_id}`}
            icon={
              <OpenInNewIcon className="text-black/40 hover:text-black/80 xl:w-16 xl:h-8" />
            }
            title="ดูตาราง"
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        {courses.procedures ? (
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
      {rejectReason ? (
        <div className="relative lg:top-4 xl:-mt-4">
          <div className="bottom-0 left-0">
            {" "}
            <p className="h4 text-[#005844] pr-32 truncate">{clinicName}</p>
          </div>
        </div>
         ) : (
          <div className="relative top-16">
          <div className="bottom-0 left-0">
            {" "}
            <p className="h4 text-[#005844] pr-32 truncate">{clinicName}</p>
          </div>
        </div>
        )}
        <div className="relative xl:top-4">
          <div className="absolute bottom-0 right-0">
            {" "}
            {tag ? (
              <div className="whitespace-nowrap rounded-full px-3 py-2 bg-[#A5A6F6]/40 w-fit h-fit text-center">
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
