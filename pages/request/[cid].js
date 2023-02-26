import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, withRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RequestForm from "../../components/OLForm/RequestForm";

import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

function Request(props) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState();
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const { query } = useRouter();
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [availData, setAvailData] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [endTime, setEndTime] = useState("");

  function getSelectedDate(appointmentDate, appointmentTime, endTime) {
    setAppointmentDate(appointmentDate);
    setAppointmentTime(appointmentTime);
    setEndTime(endTime);
  }

  const fetchData = async () => {
    let isSubscribed = true;
    const url = `${process.env.url}/course/match/owner/${query.owner_id}`;
    const availurl = `${process.env.url}/available/match/owner/${query.owner_id}`;
    const staffurl = `${process.env.url}/staff/owner/${query.owner_id}`;
    const courses = await fetch(url);
    const avails = await fetch(availurl);
    const staff = await fetch(staffurl);

    const courseData = await courses.json();
    const availData = await avails.json();
    const staffs = await staff.json();

    if (isSubscribed) {
      setCourseData(courseData);
      setAvailData(availData);
      setStaffs(staffs);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const {
    control,
    register,
    formState: {},
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (router.isFallback) {
    return <p className="h1">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen">
        <Head>
          <title>Olive | Book Appointment </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <section className="text-center mt-12">
          <h1 className="mt-5 mb-6 text-3xl font-extrabold text-[#7BC6B7]">
            สร้างนัดดูแล
          </h1>
          <p className="mt-5 mb-6 text-xl text-[#7BC6B7]">
            เข้าสู่ระบบเพื่อสร้างนัดดูแล
          </p>
          <button className="buttonPrimary text-xl" onClick={signIn}>
            เข้าสู่ระบบ
          </button>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="whitespace-nowrap overflow-auto scrollbar-hide">
      <Head>
        <title>Olive | Book Appointment </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="">
        <div className="h-full flex-grow pt-10 md:pt-30 mt-5 px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 via-blue-50 to-[#7BC6B7]/20 rounded-md pb-48">
          <div className="max-w-lg mx-auto text-center pb-8 ">
            <h1 className="pb-4 text-2xl text-[#005844]">จองนัดกับคลินิก</h1>
            <Link href={`/clinic/${query.cid}`}>
            <h1 className="cursor-pointer font-bold text-3xl text-[#7BC6B7] sm:text-5xl text-ellipsis transition hover:scale-95">
              {props.router.query.clinic_name}
            </h1>
            </Link>
          </div>
          <div className="max-w-xl mx-auto mt-2 md:mt-6 shadow-md py-14 px-6 rounded-2xl bg-white">
            <RequestForm
              courses={courseData}
              currentDate={currentDate}
              today={today}
              setToday={setToday}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              control={control}
              availables={availData}
              getSelectedDate={getSelectedDate}
              staffs={staffs}
              ownerId={query.owner_id}
              customerId={session.user.id}
              clinicId={query.cid}
              clinicName={query.clinic_name}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default withRouter(Request);
