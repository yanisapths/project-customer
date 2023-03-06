import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommonCard from "../../components/OLCard/CommonCard";
import ReviewCard from "../../components/OLCard/ReviewCard";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";

const option = [
  { id: 0, label: "ทั้งหมด" },
  { id: 1, label: "รอตอบรับ" },
  { id: 2, label: "กำลังดำเนินการ" },
  { id: 3, label: "ปฏิเสธ/ยกเลิก" },
  { id: 4, label: "เสร็จสิ้น" },
];

function Schedule({ appointments }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [result, setResult] = useState("");
  const handleChange = (event) => {
    setResult(event.target.value);
  };

  if (status === "authenticated") {
    return (
      <div>
        <Head>
          <title>Olive | Schedule</title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <main className="max-w-screen lg:pb-32 h-screen overflow-scroll scrollbar-hide content-center px-8 lg:px-12 xl:px-0 xxl:px-42 pb-12 xl:pb-32">
          <div className="flex justify-center gap-4 md:gap-6 px-6 pt-12 items-center">
            <p className="h6 text-black text-center">นัดทั้งหมด</p>
            <Box sx={{ width: 180 }}>
              <FormControl fullWidth>
                <InputLabel>สถานะ</InputLabel>
                <Select
                  sx={{ borderRadius: "32px" }}
                  label="เลือกนัดจากชื่อ"
                  value={result}
                  onChange={handleChange}
                >
                  {option.map((input, index) => {
                    return (
                      <MenuItem
                        key={input.id}
                        value={input.id}
                        className="gap-4"
                      >
                        <CircleIcon
                          className={
                            input.id == 0
                              ? "p-1 text-[#acded5]"
                              : input.id == 1
                              ? "p-1 text-[#ffe898]"
                              : input.id == 2
                              ? "p-1 text-[#2ED477]"
                              : input.id == 3
                              ? "p-1 text-[#FF2F3B]"
                              : "p-1 text-[#7879F1]"
                          }
                        />{" "}
                        <span className="text-sm">{input.label}</span>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="lg:flex lg:justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-10 pt-6">
              {result == "" &&
                result == 0 &&
                appointments &&
                appointments.map((data, index) => {
                  return (
                    <div key={index}>
                      {data.status != "Done" && data.status != "reviewed" ? (
                        <CommonCard
                          key={data.id}
                          course={data.course}
                          course_id={data.course_id}
                          clinicName={data.clinicName}
                          status={data.status}
                          rejectReason={data.rejectReason}
                          procedures={data.procedures}
                          tag={data.tag}
                          schedule_id={data._id}
                        />
                      ) : (
                        <ReviewCard
                          key={data.id}
                          course={data.course}
                          course_id={data.course_id}
                          clinicName={data.clinicName}
                          status={data.status}
                          schedule_id={data._id}
                          clinic_id={data.clinic_id}
                        />
                      )}
                    </div>
                  );
                })}

              {appointments.map((data, index) => {
                return result == 1 && data.status == "Approved" ? (
                  <div key={index}>
                    {data.status != "Done" && data.status != "reviewed" ? (
                      <CommonCard
                        key={data.id}
                        course={data.course}
                        course_id={data.course_id}
                        clinicName={data.clinicName}
                        status={data.status}
                        rejectReason={data.rejectReason}
                        procedures={data.procedures}
                        tag={data.tag}
                        schedule_id={data._id}
                      />
                    ) : (
                      <ReviewCard
                        key={data.id}
                        course={data.course}
                        course_id={data.course_id}
                        clinicName={data.clinicName}
                        status={data.status}
                        schedule_id={data._id}
                        clinic_id={data.clinic_id}
                      />
                    )}
                  </div>
                ) : result == 1 && data.status == "pending" ? (
                  <div key={index}>
                    {data.status != "Done" && data.status != "reviewed" ? (
                      <CommonCard
                        key={data.id}
                        course={data.course}
                        course_id={data.course_id}
                        clinicName={data.clinicName}
                        status={data.status}
                        rejectReason={data.rejectReason}
                        procedures={data.procedures}
                        tag={data.tag}
                        schedule_id={data._id}
                      />
                    ) : (
                      <ReviewCard
                        key={data.id}
                        course={data.course}
                        course_id={data.course_id}
                        clinicName={data.clinicName}
                        status={data.status}
                        schedule_id={data._id}
                        clinic_id={data.clinic_id}
                      />
                    )}
                  </div>
                ) : result == 2 && data.status == "Approved" ? (
                  <div key={index}>
                    {data.status != "Done" && data.status != "reviewed" ? (
                      <CommonCard
                        key={data.id}
                        course={data.course}
                        course_id={data.course_id}
                        clinicName={data.clinicName}
                        status={data.status}
                        rejectReason={data.rejectReason}
                        procedures={data.procedures}
                        tag={data.tag}
                        schedule_id={data._id}
                      />
                    ) : (
                      <ReviewCard
                        key={data.id}
                        course={data.course}
                        course_id={data.course_id}
                        clinicName={data.clinicName}
                        status={data.status}
                        schedule_id={data._id}
                        clinic_id={data.clinic_id}
                      />
                    )}
                  </div>
                ) : result == 3 && data.status == "Rejected" ? (
                  <div key={index}>
                    {data.status != "Done" && data.status != "reviewed" ? (
                      <CommonCard
                        key={data.id}
                        course={data.course}
                        course_id={data.course_id}
                        clinicName={data.clinicName}
                        status={data.status}
                        rejectReason={data.rejectReason}
                        procedures={data.procedures}
                        tag={data.tag}
                        schedule_id={data._id}
                      />
                    ) : (
                      <ReviewCard
                        key={data.id}
                        course={data.course}
                        course_id={data.course_id}
                        clinicName={data.clinicName}
                        status={data.status}
                        schedule_id={data._id}
                        clinic_id={data.clinic_id}
                      />
                    )}
                  </div>
                ) : result == 4 && data.status == "Done" ? (
                  <div key={index}>
                    {data.status != "Done" && data.status != "reviewed" ? (
                      <CommonCard
                        key={data.id}
                        course={data.course}
                        course_id={data.course_id}
                        clinicName={data.clinicName}
                        status={data.status}
                        rejectReason={data.rejectReason}
                        procedures={data.procedures}
                        tag={data.tag}
                        schedule_id={data._id}
                      />
                    ) : (
                      <ReviewCard
                        key={data.id}
                        course={data.course}
                        course_id={data.course_id}
                        clinicName={data.clinicName}
                        status={data.status}
                        schedule_id={data._id}
                        clinic_id={data.clinic_id}
                      />
                    )}
                  </div>
                ) : (
                  <div key={index}></div>
                );
              })}
            </div>
          </div>
          {appointments.length < 1 && (
            <div className="text-center justify-center">
              <Image src="/asset/inbox.png" width={100} height={100} />
              <p className="h4 text-black/50 pt-8">Appointment is empty.</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="h-screen">
        <Head>
          <title>Olive | Schedule </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <section className="text-center mt-12 lg:pb-48">
          <h1 className="mt-5 mb-6 text-3xl font-extrabold text-[#7BC6B7]">
            ตารางนัด
          </h1>
          <p className="mt-5 mb-6 text-xl text-[#7BC6B7]">
            เข้าสู่ระบบเพื่อดูตารางนัด
          </p>
          <button
            className="buttonPrimary text-xl hover:shadow-[#ACDED5] hover:shadow-2xl"
            onClick={signIn}
          >
            เข้าสู่ระบบ 🚪
          </button>
          <div className="pt-12">
            <p className="mt-5 mb-6 text-xl text-[#7BC6B7]">
              หรือ ค้นหานัดของคุณด้วย HappyTrack
            </p>
            <Link href="/happytrack">
              <button
                className="rounded-full border-2 border-[#ACDED5]/20 hover:bg-[#ACDED5]/20 text-[#005844] px-28 py-4 shadow-lg hover:shadow-[#ACDED5] hover:shadow-2xl focus:outline-none focus:ring 
     xl:px-96 xl:py-6 lg:px-60 text-xl"
              >
                ค้นหานัด 🔍
              </button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Schedule;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const url = `${process.env.dev}/appointment/match/customer/${session.user.id}`;
    try {
      const res = await fetch(url);
      const appointments = await res.json();
      return { props: { appointments } };
    } catch (error) {
      return {
        props: {
          error: true,
        },
      };
    }
  }
  return {
    props: {
      error: true,
    },
  };
}
