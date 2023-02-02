import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommonCard from "../../components/OLCard/CommonCard";
import ReviewCard from "../../components/OLCard/ReviewCard";

function Schedule() {
  const [appointments, setRequestList] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchData = async () => {
    let isSubscribed = true;
    const res = await fetch(
      `${process.env.url}/appointment/match/customer/${session.user.id}`
    );
    const appointments = await res.json();

    if (isSubscribed) {
      setRequestList(appointments);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  });

  if (status === "authenticated") {
    return (
      <div>
        <Head>
          <title>Olive | Schedule</title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <main className="max-w-screen lg:pb-32 h-screen overflow-scroll scrollbar-hide content-center lg:px-24 xl:px-0 xxl:px-48">
          <div className="px-6 pt-12">
            <p className="h6 text-black text-center">นัดทั้งหมด</p>
            <div className="grid grid-cols-1 py-6 lg:grid lg:grid-cols-3 lg:gap-4">
              {appointments &&
                appointments.map((data) => {
                  return (
                    <>
                      {data.status != "Done" ? (
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
                    </>
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
        <section className="text-center mt-12">
          <h1 className="mt-5 mb-6 text-3xl font-extrabold text-[#7BC6B7]">
            ตารางนัด
          </h1>
          <p className="mt-5 mb-6 text-xl text-[#7BC6B7]">
            เข้าสู่ระบบเพื่อดูตารางนัด
          </p>
          <button className="buttonPrimary text-xl" onClick={signIn}>
            เข้าสู่ระบบ
          </button>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Schedule;
