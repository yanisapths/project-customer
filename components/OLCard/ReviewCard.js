import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { alpha } from "@mui/material";
import ReviewForm from "../OLForm/ReviewForm";

function ReviewCard({ schedule_id, course_id, clinicName, status,clinic_id }) {
  const theme = useTheme();
  const [courses, setCourseList] = useState({});
  const router = useRouter();

  const fetchData = async () => {
    let isSubscribed = true;
    const res = await fetch(
      `https://olive-service-api.vercel.app/course/${course_id}`
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
      sx={{ bgcolor: alpha(theme.palette.iris.light,0.1), width: "100%" }}
    >
      <div className="px-8 flex justify-between">
        <div className="flex space-x-6">
          <p className="h4 pt-2">{courses.courseName}</p>
          <div className="mt-2 whitespace-nowrap rounded-full w-fit h-fit px-3 py-1 bg-[#7879F1]/90 shadow-lg shadow-[#7879F1]/40">
            <strong className="text-white font-light text-sm md:text-md">
              {status}{" "}
            </strong>
          </div>
        </div>
      </div>
      <div className="pt-2">
        <ReviewForm clinic_id={clinic_id} />
      </div>
      <div className="px-8 -mt-[12px]">
        <p className="h4 text-[#005844] pr-32 truncate">{clinicName}</p>
      </div>
    </Box>
  );
}

export default ReviewCard;
