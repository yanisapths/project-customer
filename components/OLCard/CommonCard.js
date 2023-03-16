import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import PrimaryIconButton from "../OLButton/IconButton";
import SimpleChip from "../OLChip/SimpleChip";
import { Box } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function CommonCard({
  schedule_id,
  course_id,
  clinicName,
  status,
  rejectReason,
  tag,
  clinic_id,
}) {
  const theme = useTheme();
  const [courses, setCourseList] = useState({});
  const router = useRouter();

  const fetchData = async () => {
    let isSubscribed = true;
    const res = await fetch(`${process.env.url}/course/${course_id}`);
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
    courses.procedures?.map(({ procedureName }) => procedureName + " ")
  ) : (
    <></>
  );

  async function cancelRequest(appointmentId) {
    const res = await fetch(
      `${process.env.url}/appointment/delete/${appointmentId}`,
      {
        method: "DELETE",
      }
    )
      .then(async (res) => {
        toast.success("ยกเลิกแล้ว");
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ไม่สามารถยกเลิกได้");
      });
  }

  const navigate = (status, path) => {
    if (status != "Rejected") {
      router.push({
        pathname: path,
        query: {
          clinic_id: clinic_id,
        },
      });
    }
  };

  return (
    <Box
      onClick={() => navigate(status, `/schedule/${schedule_id}`)}
      className="cursor-pointer rounded-2xl shadow-xl overflow-x-auto pt-8 xl:min-w-[450px] min-h-[250px] transition hover:shadow-2xl overflow-hidden"
      sx={{ bgcolor: theme.palette.background.white, width: "100%" }}
    >
      <p className="px-6 lg:px-8 h4 text-[#005844] pr-32 truncate">
        {clinicName}
      </p>
      <div className="flex justify-between px-6 lg:px-8">
        <div className="flex space-x-2 md:space-x-4">
          <p className="md:h5 h6 font-semibold pt-2">
            {" "}
            {course_id == "ตรวจร่างกาย" ? "ตรวจร่างกาย" : courses.courseName}
          </p>
          <div
            className={
              status == "pending"
                ? "mt-2 whitespace-nowrap rounded-full w-fit h-fit px-2 py-0.5 md:px-3 md:py-1 bg-[#F9D373]/90 shadow-lg shadow-[#F9D373]/40"
                : status == "Rejected"
                ? "mt-2 whitespace-nowrap rounded-full w-fit h-fit px-2 py-0.5 md:px-3 md:py-1 bg-[#FF2F3B]/90 shadow-lg shadow-[#FF2F3B]/40"
                : "mt-2 whitespace-nowrap rounded-full w-fit h-fit px-2 py-0.5 md:px-3 md:py-1 bg-[#2ED477]/90 shadow-lg shadow-[#2ED477]/40"
            }
          >
            <strong className="text-white font-light text-sm md:text-md">
              {status == "pending"
                ? "รอการตอบรับ"
                : status == "Done"
                ? "รับบริการแล้ว"
                : status == "Rejected"
                ? "ถูกปฏิเสธ"
                : "ยืนยันแล้ว"}
            </strong>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {status == "pending" ||
            (status == "Rejected" && (
              <Tooltip title="ยกเลิกคำขอ" placement="top">
                <IconButton
                  aria-label="delete"
                  size="small"
                  className="text-[#FF2F3B]"
                  onClick={() =>
                    Swal.fire({
                      title: "ยกเลิกคำขอนี้?",
                      text: "หากยกเลิกแล้วจะไม่สามารถย้อนกลับได้",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "ตกลง",
                      cancelButtonText: "ยกเลิก",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        cancelRequest(schedule_id).then(() =>
                          Swal.fire({
                            title: "ยกเลิกแล้ว",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 1000,
                          })
                        );
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                          title: "ยกเลิก :)",
                          showConfirmButton: false,
                          icon: "error",
                          timer: 1000,
                        });
                      }
                    })
                  }
                >
                  <DoDisturbIcon className="text-[#FF2F3B]/80" />
                </IconButton>
              </Tooltip>
            ))}
          {status != "Rejected" ? (
            <PrimaryIconButton
              path={`/schedule/${schedule_id}`}
              icon={
                <OpenInNewIcon className="text-black/40 hover:text-black/80" />
              }
              title="ดูตาราง"
            />
          ) : (
            <></>
          )}
        </div>
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
      {rejectReason ? (
        <div className="pt-2 px-8">
          <p className="text-black/50">เหตุผลจากคลินิก</p>
          <p className="body1 text-[#FF2F3B]">{rejectReason}</p>
        </div>
      ) : (
        <></>
      )}{" "}
      {tag ? (
        <div className="relative pt-14">
          <div className="absolute bottom-0 right-6">
            <div className="whitespace-nowrap rounded-full px-10 py-0.5 bg-[#A5A6F6]/40 w-full h-fit text-center">
              <strong className="text-[#5D5FEF] font-light text-sm">
                {tag}
              </strong>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default CommonCard;
