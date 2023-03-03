import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import ReviewForm from "../OLForm/ReviewForm";

import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[10],
    fontSize: 16,
    borderRadius: 12,
  },
}));

function ReviewCard({ schedule_id, course_id, clinicName, status, clinic_id }) {
  const theme = useTheme();
  const [courses, setCourseList] = useState({});
  const router = useRouter();
  const fetchData = async () => {
    let isSubscribed = true;
    const res = await fetch(`${process.env.dev}/course/${course_id}`);
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
  const navigate = (status, path) => {
    if (status != "Rejected") {
      router.push(path);
    }
  };

  return (
    <Box
      onClick={() => navigate(status, `/schedule/${schedule_id}`)}
      className="cursor-pointer rounded-2xl shadow-xl overflow-x-auto p-4 pt-8 w-full lg:mb-8 mb-4 min-h-[250px] transition hover:shadow-2xl overflow-hidden"
      sx={{ bgcolor: alpha(theme.palette.iris.light, 0.1), width: "100%" }}
    >
      <div className="px-8">
        <p className="h4 text-[#005844] pr-32 truncate">{clinicName}</p>
      </div>
      <div className="px-8 flex justify-between">
        <div className="flex space-x-6">
          <p className="h4 pt-2">{courses.courseName}</p>
          <div className="mt-2 whitespace-nowrap rounded-full w-fit h-fit px-3 py-1 bg-[#7879F1]/90 shadow-lg shadow-[#7879F1]/40">
            <strong className="text-white font-light text-sm md:text-md">
              {status != "reviewed" ? "รอรีวิว" : "รีวิวแล้ว"}
            </strong>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/schedule/${schedule_id}`}>
            <CustomTooltip title="history" placement="top">
              <IconButton className="">
                <OpenInNewIcon className="text-black/40 hover:text-black/80" />
              </IconButton>
            </CustomTooltip>
          </Link>
        </div>
      </div>
      <div className="pt-2">
        {status != "reviewed" ? (
          <ReviewForm clinic_id={clinic_id} schedule_id={schedule_id} />
        ) : (
          <div className="py-10 px-8 flex">
            <p className="h4">ขอบคุณสำหรับรีวิว! 🥳</p>
          </div>
        )}
      </div>
    </Box>
  );
}

export default ReviewCard;
