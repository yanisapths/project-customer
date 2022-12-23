import React from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSession }  from "next-auth/react";
import Link from "next/link";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

function Calendar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen">
        <Head>
          <title>Olive | Calendar </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <section className="text-center mt-12">
          <h1 className="mt-5 mb-6 text-3xl font-extrabold text-[#7BC6B7]">
            ตารางนัด
          </h1>
          <button className="buttonPrimary text-xl">
            <Link href="/auth/signin">เข้าสู่ระบบ</Link>
          </button>
        </section>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Head>
          <title>Olive | Calendar </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <main className="main bg-teal-50 md:h-screen xl:h-screen md:py-28i">
          <section className="flex-grow md:pt-30 pt-10 ">
            <h1 className="mt-5 mb-2   text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
              ตารางนัด
            </h1>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
            />
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Calendar;
