import React from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommonCard from "../../components/OLCard/CommonCard";

const appointments = [
  {
    id: 1,
    courseName: "คอร์ส 1",
    clinic_name: "ศวิตาคลินิก",
    status: "Approved",
    procedures: [{ procedureName: "Ultrasound" }, { procedureName: "Laser" }],
  },
  {
    id: 2,
    courseName: "คอร์ส 2",
    clinic_name: "ศวิตาคลินิก",
    status: "pending",
    procedures: [{ procedureName: "Ultrasound" }, { procedureName: "Laser" }],
  },
  {
    id: 3,
    courseName: "คอร์ส 2",
    clinic_name: "ศวิตาคลินิก",
    status: "rejected",
    rejectReason:
      "เวลาไม่ตรงกับคลินิก คุณลูกค้าสามารถเช็คเวลาแล้วขอมาใหม่ได้ค่ะ",
    tag: "เวลาไม่สะดวก",
    procedures: [{ procedureName: "Ultrasound" }, { procedureName: "Laser" }],
  },
  {
    id: 4,
    courseName: "คอร์ส 2",
    clinic_name: "ศวิตาคลินิก",
    status: "rejected",
    rejectReason:
      "เวลาไม่ตรงกับคลินิก คุณลูกค้าสามารถเช็คเวลาแล้วขอมาใหม่ได้ค่ะ",
    tag: "เวลาไม่สะดวก",
    procedures: [{ procedureName: "Ultrasound" }, { procedureName: "Laser" }],
  },
];

function Schedule() {
  return (
    <div>
      <Head>
        <title>Olive | Schedule</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-screen lg:pb-32 h-screen overflow-scroll scrollbar-hide content-center lg:px-24 xl:px-36 xxl:px-48">
        <div className="px-6 pt-12">
          <p className="h6 text-black text-center">นัดทั้งหมด</p>
          <div className="grid grid-cols-1 py-6 lg:grid lg:grid-cols-3 lg:gap-4">
            {appointments &&
              appointments.map((data) => {
                return <CommonCard
                  key={data.id}
                  courseName={data.courseName}
                  clinic_name={data.clinic_name}
                  status={data.status}
                  rejectReason={data.rejectReason}
                  procedures={data.procedures}
                  tag={data.tag}
                />;
              })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Schedule;
