import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSession } from "next-auth/react";
import DarkenCardHover from "../components/OLCard/DarkenCardHover";

export default function Demo({ session }) {
  return (
    <div className="">
      <Head>
        <title>Olive | Demo</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="main pb-32 max-w-screen-xxl h-screen overflow-scroll scrollbar-hide pt-4 xl:pt-14">
        <div className="py-4 pb-6">
          <h1 className="text-center h1 text-[#7bc6b7]">
            Our Popular Features ✨
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-12 py-10">
          <DarkenCardHover
            img={"/asset/Home.png"}
            subtitle="Search and Reserve"
            desc="ค้นหาพร้อมอัตราค่าบริการและนัดล่วงหน้า"
          />

          <DarkenCardHover
            img={"/asset/Services.png"}
            subtitle="Service Packages and Pricing"
            desc="บริการต่างๆและอัตราค่าบริการ"
          />
          <DarkenCardHover
            img={"/asset/Schedule.png"}
            subtitle="Schedule with Clinic"
            desc="ดูตารางนัดของคุณ"
          />
        </div>
        <div className="lg:px-12 mt-4">
          <DarkenCardHover
            img={"/asset/Booking.png"}
            subtitle="Book Your Appointment"
            title="วิธีนัดล่วงหน้า"
            desc="วิธีจองนัดผ่านแอพพลิเคชั่น"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
