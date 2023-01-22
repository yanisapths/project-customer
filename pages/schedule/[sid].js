import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavigateBack from "../../components/OLNavigateBack/NavigateBack";

function ScheduleDetail({ data }) {
  const { data: session, status } = useSession();
  const [course, setCourse] = useState({});
  const [clinic, setClinic] = useState({});
  const router = useRouter();
  console.log(data)

  const fetchData = async () => {
    let isSubscribed = true;
    const courseData = await fetch(
      `https://olive-service-api.vercel.app/course/${data.course_id}`
    );
    const clinicData = await fetch(
      `https://olive-service-api.vercel.app/clinic/${data.clinic_id}`
    );
    const course = await courseData.json();
    const clinic = await clinicData.json();

    if (isSubscribed) {
      setCourse(course);
      setClinic(clinic);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData().catch(console.error);
    }
  }, [status]);

  return (
    <div>
      <Head>
        <title>Olive | Schedule</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="lg:pb-32 h-screen overflow-scroll scrollbar-hide">
        <NavigateBack path="/schedule" />
        <div className="px-6 pt-12 lg:px-96 text-center">
          <p className="body1 tracking-wide text-black/50">ตารางนัด</p>
          <h2 className="py-6 h3 lg:h1">{course.courseName}</h2>
          <div className="cursor-pointer bg-[#7BC6B7] transition hover:shadow-xl hover:shadow-[#7BC6B7]/40 w-fit px-6 py-2 lg:py-3 rounded-full mx-auto">
            <Link href={`/clinic/${data.clinic_id}`}>
              <p className="h6 text-white">{data.clinicName}</p>
            </Link>
          </div>
          <div className="flex justify-between body1 lg:h6 tracking-wide mt-6 lg:mt-12 lg:px-96">
            <div>
              <p className=" text-black/50">ติดต่อคลินิก</p>
              <p className=" hover:text-[#0921FF]">{clinic.phoneNumber}</p>
            </div>
            <div>
              <p className="text-black/50">ติดต่อลูกค้า</p>
              <p className=" hover:text-[#0921FF]">{data.phoneNumber}</p>
            </div>
          </div>
          <section className="lg:w-full mb-2 pt-12 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-2 md:ml-8 border-black/20 border-b-[1px] border-dashed">
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

          <div className="flex justify-between p-2 bg-[#acded5]/20 text-black mb-1  mx-2 md:ml-8 lg:w-full body1 md:h6 lg:h5">
            <div className="md:w-1/6">
              <p>1</p>
            </div>
            <div className="md:w-1/6">
              <p>{new Date(data.appointmentDate).toDateString()}</p>
            </div>
            <div className="md:w-1/6">
              <p>
                {new Date(data.appointmentTime).toLocaleTimeString("en-EN", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
                {data.endTime ? 
                <>
                 {"-"}{new Date(data.endTime).toLocaleTimeString("en-EN", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
                </>
                :
                <></>}
              </p>
            </div>
            <div className="md:w-1/6">
              <p>{data.status}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ScheduleDetail;

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
  const res = await fetch("https://olive-service-api.vercel.app/appointment");
  const appointments = await res.json();

  const paths = appointments.map((appointment) => ({
    params: { sid: appointment._id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const appointmentId = params.sid;
  const res = await fetch(
    `https://olive-service-api.vercel.app/appointment/${appointmentId}`
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
