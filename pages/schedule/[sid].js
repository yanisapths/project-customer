import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavigateBack from "../../components/OLNavigateBack/NavigateBack";
import SimpleChip from "../../components/OLChip/SimpleChip";

function ScheduleDetail({ data, event, clinic, course }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { id } = router.query;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    }
  }, [status]);

  if (router.isFallback) return null;

  if (status === "unauthenticated") {
    return (
      <div className="h-screen">
        <Head>
          <title>Olive | Schedule </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <section className="text-center mt-12">
          <h1 className="mt-5 mb-6 text-3xl font-extrabold text-[#7BC6B7]">
            ตารางนัด
          </h1>
          <button className="buttonPrimary text-xl" onClick={signIn}>
            เข้าสู่ระบบ
          </button>
        </section>
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Olive | Schedule</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="lg:pb-32 h-screen overflow-scroll scrollbar-hide">
        <div className="max-w-screen-lg mx-auto text-center items-center justify-center pt-2 pb-32 px-4">
          <div className="flex justify-between">
            <NavigateBack path="/schedule" />
          </div>
          <p className="body1 tracking-wide text-black/50">ตารางนัด</p>
          <div className="text-center cursor-pointer transition hover:underline text-[#005844] px-6 py-2 lg:py-3 mx-auto">
            <Link href={`/clinic/${data.clinic_id}`}>
              <p className="h3">{data.clinicName}</p>
            </Link>
          </div>
          <div className="flex justify-center gap-4 text-center items-center align-middle pt-6">
            <h2 className="h6 lg:h5">{course.courseName}</h2>
            {course.type != "false" ? (
              <strong className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] px-2 py-1 text-sm font-medium">
                {course.type}
              </strong>
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-center space-x-2 px-6 py-2 pb-4 xl:px-10">
            <SimpleChip text={course.amount} quantify="ครั้ง" />
            <SimpleChip text={course.duration} quantify="ชั่วโมง/ครั้ง" />
            <SimpleChip prefix="ราคา" text={course.totalPrice} quantify="บาท" />
          </div>
          <div className="flex justify-center gap-10 xl:gap-60 body1 lg:h6 tracking-wide md:h6 body2">
            <div>
              <p className=" text-black/50">ติดต่อคลินิก</p>
              <p className=" hover:text-[#0921FF]">{clinic.phoneNumber}</p>
            </div>
            <div>
              <p className="text-black/50">ติดต่อลูกค้า</p>
              <p className=" hover:text-[#0921FF]">{data.phoneNumber}</p>
            </div>
          </div>
          <section className="lg:w-full mb-2 pt-6 md:pt-10 overflow-scroll scroll-auto scrollbar-hide mx-2 md:ml-8 border-black/20 border-b-[1px] border-dashed">
            <div className="flex justify-between lg:body1 tracking-wide">
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
              data.progressStatus == "Done"
                ? "bg-[#f0f1f2]/40 text-[#121212]/40 flex justify-between p-2 mb-1  mx-2 md:ml-8 lg:w-full body1 md:h6 lg:h5"
                : "bg-[#acded5]/20 text-[#005844] flex justify-between p-2 mb-1  mx-2 md:ml-8 lg:w-full body1 md:h6 lg:h5"
            }
          >
            <div className="w-1/6">
              <p>1</p>
            </div>
            <div className="w-2/6">
              <p>
                {new Date(data.appointmentDate).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="w-2/6">
              <p>
                {new Date(data.appointmentTime).toLocaleTimeString("th-TH", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
                {data.endTime ? (
                  <>
                    {"-"}
                    {new Date(data.endTime).toLocaleTimeString("th-TH", {
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
              {data.progressStatus ? (
                <p>
                  {data.progressStatus == "Approved" ? (
                    <span>รอรับบริการ</span>
                  ) : data.progressStatus == "pending" ? (
                    <span>รอการตอบรับ</span>
                  ) : data.progressStatus == "Done" ? (
                    <span>รับบริการแล้ว</span>
                  ) : (
                    data.progressStatus == "Rejected" && <span>ถูกปฏิเสธ</span>
                  )}
                </p>
              ) : (
                <p>
                  {data.status == "Approved" ? (
                    <span>รอรับบริการ</span>
                  ) : data.status == "pending" ? (
                    <span>รอการตอบรับ</span>
                  ) : data.status == "Done" ? (
                    <span>รับบริการแล้ว</span>
                  ) : (
                    data.status == "Rejected" && <span>ถูกปฏิเสธ</span>
                  )}
                </p>
              )}
            </div>
          </div>
          {event.map((result, index) => {
            return (
              <div
                className={
                  result.status == "Done"
                    ? "bg-[#f0f1f2]/40 text-[#121212]/40 flex justify-between p-2 mb-1  mx-2 md:ml-8 lg:w-full body1 md:h6 lg:h5"
                    : "bg-[#acded5]/10 text-[#005844] flex justify-between p-2 mb-1  mx-2 md:ml-8 lg:w-full body1 md:h6 lg:h5"
                }
                key={index}
              >
                <div className="w-1/6">
                  <p>{index + 2}</p>
                </div>
                <div className="w-2/6">
                  <p>
                    {new Date(result.date).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
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
                  {result.status == "Approved" ? (
                    <span>รอรับบริการ</span>
                  ) : result.status == "pending" ? (
                    <span>รอการตอบรับ</span>
                  ) : result.status == "Done" ? (
                    <span>รับบริการแล้ว</span>
                  ) : (
                    result.status == "Rejected" && <span>ถูกปฏิเสธ</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ScheduleDetail;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.dev}/appointment`);
  const appointments = await res.json();

  const paths = appointments.map((appointment) => ({
    params: { sid: appointment._id },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const appointmentId = params.sid;
  const res = await fetch(`${process.env.dev}/appointment/${appointmentId}`);
  const data = await res.json();
  const courseurl = `${process.env.dev}/course/${data.course_id}`;
  const clinicurl = `${process.env.dev}/clinic/${data.clinic_id}`;
  const eventurl = `${process.env.dev}/event/match/${data._id}`;
  try {
    const courses = await fetch(courseurl);
    const clinics = await fetch(clinicurl);
    const events = await fetch(eventurl);
    const course = await courses.json();
    const clinic = await clinics.json();
    const event = await events.json();
    return { props: { data, course, event, clinic } };
  } catch (error) {
    console.log("error: ", error);
    return {
      props: {
        data,
      },
    };
  }
}
