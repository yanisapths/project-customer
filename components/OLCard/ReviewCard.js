import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from "@mui/material";
import { alpha } from "@mui/material";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ReviewForm from "../OLForm/ReviewForm";
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
  const [review, setReview] = useState([]);

  const fetchReview = async () => {
    let isSubscribed = true;
    const res = await fetch(
      `${process.env.url}/review/match/${clinic_id}`
    );
    const review = await res.json();

    if (isSubscribed) {
      setReview(review);
    }
    return () => (isSubscribed = false);
  };

  const fetchData = async () => {
    let isSubscribed = true;
    const res = await fetch(
      `${process.env.url}/course/${course_id}`
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
    fetchReview().catch(console.error);
  });

  async function deleteRequest(appointmentId) {
    const res = await fetch(
      `${process.env.url}/appointment/delete/${appointmentId}`,
      { method: "DELETE" }
    )
      .then(async (res) => {})
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ลบรายการไม่สำเร็จ");
      });
  }

  const procedureList = courses.procedures ? (
    courses.procedures?.map(({ procedureName }) => procedureName + ",")
  ) : (
    <></>
  );

  return (
    <Box
      className="cursor-pointer rounded-2xl shadow-xl overflow-x-auto p-4 pt-8 w-full lg:mb-8 mb-4 h-[300px] transition hover:shadow-2xl overflow-hidden"
      sx={{ bgcolor: alpha(theme.palette.iris.light, 0.1), width: "100%" }}
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
        {review.status == "reviewed" ? (
          <ReviewForm clinic_id={clinic_id} />
        ) : (
          <div className="py-10 px-8 flex">
            <p className="h4">Thanks for the review! 🥳</p>
            <div className="">
              <CustomTooltip title="remove this" placement="top">
                <IconButton
                className="text-black/40 hover:text-black/80"
                  aria-label="delete"
                  size="medium"
                  onClick={() =>
                    Swal.fire({
                      title: "ลบรายการนี้?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "ใช่ ลบเลย!",
                      cancelButtonText: "ยกเลิก",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteRequest(schedule_id).then(() =>
                          Swal.fire({
                            title: "ลบแล้ว",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 1000,
                          })
                        );
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                          title: "ลบรายการนี้ไม่ได้ถูกลบ :)",
                          showConfirmButton: false,
                          icon: "error",
                          timer: 1000,
                        });
                      }
                    })
                  }
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </CustomTooltip>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-8 -mt-[12px]">
        <p className="h4 text-[#005844] pr-32 truncate">{clinicName}</p>
      </div>
    </Box>
  );
}

export default ReviewCard;
