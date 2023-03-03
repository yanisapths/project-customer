import React, { useState, useEffect } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import SimpleChip from "../OLChip/SimpleChip";

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

function AppointmentCard({ result }) {
  const [course, setCourse] = useState({});
  const [clinic, setClinic] = useState({});
  const [event, setEvent] = useState([]);
  const [patient, setPatient] = useState([]);

  const fetchData = async () => {
    let isSubscribed = true;
    const courseurl = `${process.env.dev}/course/${result.course_id}`;
    const clinicurl = `${process.env.dev}/clinic/${result.clinic_id}`;
    const eventurl = `${process.env.dev}/event/match/${result._id}`;
    const patienturl = `${process.env.dev}/patient/${result.patient_id}`;
    const courses = await fetch(courseurl);
    const clinics = await fetch(clinicurl);
    const events = await fetch(eventurl);
    const patients = await fetch(patienturl);
    const course = await courses.json();
    const clinic = await clinics.json();
    const event = await events.json();
    const patient = await patients.json();
    if (isSubscribed) {
      setCourse(course);
      setClinic(clinic);
      setEvent(event);
      setPatient(patient);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <div className="shadow-xl px-2 py-8 xl:px-24 xl:py-10 rounded-3xl">
        <div className="flex justify-center gap-2">
          <h2 className="py-4 h3 lg:h1 text-center">{course.courseName}</h2>
          {course.type != "false" ? (
            <strong className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] px-2 py-1 text-sm font-medium self-center">
              {course.type}
            </strong>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-center space-x-2 px-6 pb-4 xl:px-10">
          <SimpleChip text={course.amount} quantify="ครั้ง" />
          <SimpleChip text={course.duration} quantify="ชั่วโมง/ครั้ง" />
          <SimpleChip prefix="ราคา" text={course.totalPrice} quantify="บาท" />
        </div>
        <div className="cursor-pointer bg-[#7BC6B7] transition hover:shadow-xl hover:shadow-[#7BC6B7]/40 w-fit px-2 py-1 xl:px-6 xl:py-2 lg:py-3 rounded-full mx-auto">
          <CustomTooltip title="เกี่ยวกับคลินิก" placement="top">
            <Link href={`/clinic/${clinic._id}`}>
              <p className="xl:h6 body2 text-white">{clinic.clinic_name}</p>
            </Link>
          </CustomTooltip>
        </div>
        <div className="text-center pt-6 text-black/60 caption xl:body1">
          <span>Appointment Id: </span> <span className="">{result._id}</span>
        </div>
        <div className="md:flex md:justify-center gap-10 xl:gap-60 body1 lg:h6 tracking-wide mt-6 lg:mt-12 md:h6 body2 truncate md:mx-0 mx-4">
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
            {result.patient_id ? (
              <p className="hover:text-[#0921FF]">{patient.phoneNumber}</p>
            ) : (
              <p className="hover:text-[#0921FF]">{result.phoneNumber}</p>
            )}

            {result.patient_id ? (
              <p className="">{patient.nickName}</p>
            ) : (
              <p className="">{result.nickName}</p>
            )}
            {result.patient_id ? (
              <p className="">
                {patient.firstName} {patient.lastName}
              </p>
            ) : (
              <p className="">
                {result.firstName} {result.lastName}
              </p>
            )}
          </div>
        </div>
        <section className="lg:w-full mb-2 pt-12 md:pt-20 overflow-scroll scroll-auto scrollbar-hide md:mx-2 md:ml-8 border-black/20 border-b-[1px] border-dashed">
          <div className="flex justify-cneter text-center caption lg:body1 tracking-wide gap-14 md:gap-28 text-black/50">
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

        <div
          className={
            result.progressStatus == "Done"
              ? "flex text-center md:p-2 bg-[#f0f1f2]/40 text-[#121212]/40 mb-1 md:mx-8 w-full caption md:h6 lg:h5"
              : "flex text-center md:p-2 bg-[#acded5]/20 text-black mb-1 md:mx-8 w-full caption md:h6 lg:h5"
          }
        >
          <div className="w-1/6">
            <p>1</p>
          </div>
          <div className="w-2/6">
            <p>{new Date(result.appointmentDate).toDateString()}</p>
          </div>
          <div className="w-2/6">
            <p>
              {new Date(result.appointmentTime).toLocaleTimeString("th-TH", {
                hour: "numeric",
                minute: "2-digit",
              })}
              {result.endTime ? (
                <>
                  {"-"}
                  {new Date(result.endTime).toLocaleTimeString("th-TH", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </>
              ) : (
                <></>
              )}
            </p>
          </div>
          <div className="w-1/6">
            {result.progressStatus ? (
              <p>{result.progressStatus == "Approved" ? (
                <span>รอรับบริการ</span>
              ) : result.progressStatus == "pending" ? (
                <span>รอการตอบรับ</span>
              ) : result.progressStatus == "Done" ? (
                <span>รับบริการแล้ว</span>
              ) : (
                result.progressStatus == "Rejected" && <span>ถูกปฏิเสธ</span>
              )}</p>
            ) : (
              <p>{result.status == "Approved" ? (
                <span>รอรับบริการ</span>
              ) : result.status == "pending" ? (
                <span>รอการตอบรับ</span>
              ) : result.status == "Done" ? (
                <span>รับบริการแล้ว</span>
              ) : (
                result.status == "Rejected" && <span>ถูกปฏิเสธ</span>
              )}</p>
            )}
          </div>
        </div>
        {event.map((result, index) => {
          return (
            <div
              key={index}
              className={
                result.status == "Done"
                  ? "flex text-center md:p-2 bg-[#f0f1f2]/40 text-[#121212]/40 mb-1 md:mx-8 w-full caption md:h6 lg:h5"
                  : "flex text-center md:p-2 bg-[#acded5]/20 text-black mb-1 md:mx-8 w-full caption md:h6 lg:h5"
              }
            >
              <div className="w-1/6">
                <p>{index + 2}</p>
              </div>
              <div className="w-2/6">
                <p>{new Date(result.date).toDateString()}</p>
              </div>
              <div className="w-2/6">
                <p>
                  {new Date(result.startTime).toLocaleTimeString("th-TH", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                  {result.endTime ? (
                    <>
                      {"-"}
                      {new Date(result.endTime).toLocaleTimeString("th-TH", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </p>
              </div>
              <div className="w-1/6">
                <p>  {result.status == "Approved" ? (
                    <span>รอรับบริการ</span>
                  ) : result.status == "pending" ? (
                    <span>รอการตอบรับ</span>
                  ) : result.status == "Done" ? (
                    <span>รับบริการแล้ว</span>
                  ) : (
                    data.status == "Rejected" && <span>ถูกปฏิเสธ</span>
                  )}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AppointmentCard;
