import React, { useState, useEffect } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[10],
    fontSize: 14,
    borderRadius: 12,
  },
}));

function AppointmentCard({
  _id,
  clinic_id,
  course_id,
  firstName,
  lastName,
  nickName,
  phoneNumber,
  appointmentDate,
  appointmentTime,
  endTime,
  status,
}) {
  const [course, setCourse] = useState({});
  const [clinic, setClinic] = useState({});

  useEffect(() => {
    const courseurl = `${process.env.local}/course/${course_id}`;
    const clinicurl = `${process.env.local}/clinic/${clinic_id}`;
    fetch(courseurl, {
      method: "GET",
    })
      .then(async (res) => {
        const course = await res.json();
        setCourse(course);
      })
      .catch((err) => console.log(err));
    fetch(clinicurl, {
      method: "GET",
    })
      .then(async (res) => {
        const clinic = await res.json();
        setClinic(clinic);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="shadow-xl px-24 py-16 rounded-3xl">
      <h2 className="py-4 h3 lg:h1  text-center">{course.courseName}</h2>
      <div className="cursor-pointer bg-[#7BC6B7] transition hover:shadow-xl hover:shadow-[#7BC6B7]/40 w-fit px-6 py-2 lg:py-3 rounded-full mx-auto">
        <CustomTooltip title="เกี่ยวกับคลินิก" placement="top">
          <p className="h6 text-white">{clinic.clinic_name}</p>
        </CustomTooltip>
      </div>
      <div className="text-center pt-6 text-black/60">
        <span>Appointment Id: </span> <span className="body1">{_id}</span>
      </div>
      <div className="flex justify-center gap-60 ody1 lg:h6 tracking-wide mt-6 lg:mt-12">
        <div>
          <p className="text-black/50">ติดต่อคลินิก</p>
          <p className="hover:text-[#0921FF]">{clinic.phoneNumber}</p>
          <p className="">{clinic.openDay}</p>
          <p className="">
            {clinic.openTime} - {clinic.closeTime}
          </p>
        </div>
        <div>
          <p className="text-black/50">ผู้นัดหมาย</p>
          <p className="hover:text-[#0921FF]">{phoneNumber}</p>
          <p className="">{nickName}</p>
          <p className="">
            {firstName} {lastName}
          </p>
        </div>
      </div>
      <section className="lg:w-full mb-2 pt-12 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-2 md:ml-8 border-black/20 border-b-[1px] border-dashed">
        <div className="flex justify-cneter text-center lg:body1 tracking-wide gap-28">
          <div className="relative block md:w-1/6">
            <p className="">ครั้งที่</p>
          </div>
          <div className="relative block md:w-1/6">
            <p>วันนัด</p>
          </div>
          <div className="relative block md:w-1/6">
            <p>เวลานัด</p>
          </div>
          <div className="relative block md:w-1/6">
            <p>สถานะ</p>
          </div>
        </div>
      </section>

      <div className="flex text-center p-2 bg-[#acded5]/20 text-black mb-1 mx-8 w-full body1 md:h6 lg:h5">
        <div className="w-1/6">
          <p>1</p>
        </div>
        <div className="w-2/6">
          <p>{new Date(appointmentDate).toDateString()}</p>
        </div>
        <div className="w-2/6">
          <p>
            {new Date(appointmentTime).toLocaleTimeString("en-EN", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
            {endTime ? (
              <>
                {"-"}
                {new Date(endTime).toLocaleTimeString("en-EN", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </>
            ) : (
              <></>
            )}
          </p>
        </div>
        <div className="w-1/6">
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
