import React, { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      <Head>
        <title>Olive | About Us</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <div className="main pb-32 max-w-screen-xxl h-screen overflow-scroll scrollbar-hide pt-4 xl:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lg:text-center">
            <h2 className="text-base text-[#005844] font-semibold tracking-wide uppercase">
              About Us
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#7bc6b7] sm:text-4xl">
              A little bit about Olive
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Olive Physiotherapy Platform เป็น solution
              ที่เหมาะสำหรับคลินิกที่มีการให้บริการด้านกายภาพบำบัดและความงามที่ต้องการจัดการตารางนัดหมายได้อย่างมีประสิทธิภาพ
              ด้วยอินเตอร์เฟสที่ใช้งานง่ายของเรา
              คุณสามารถจัดการตารางนัดหมายได้อย่างง่ายดาย
              ติดตามข้อมูลลูกค้าและเก็บรวบรวมทุกอย่างไว้ในที่เดียว
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              ลืมการนัดหมายด้วยกระดาษและทักทาย Olive Physiotherapy Platform!
              แอปของเราทำให้การจัดการตารางและการติดตามข้อมูลลูกค้าง่ายขึ้น
              พร้อมที่จะให้ประสบการณ์ที่สมบูรณ์แบบให้กับลูกค้า
            </p>
          </div>
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#7bc6b7] text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      ariaHidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-[#005844]">
                    High-Quality Design
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Our team of designers creates beautiful, modern designs that
                    are both functional and visually appealing.
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#7bc6b7] text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      ariaHidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-[#005844]">
                    Abundance in Features
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Our platform web application is designed to streamline the
                    clinic management process, making it easier for clinics to
                    provide high-quality care to your patients.
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
        <div className="flex content-center justify-center lg:text-center">
          <Link href="https://daycare-portal.vercel.app/">
            <button className="bg-gradient-to-r hover:from-[#A17851]/40 hover:to-[#FFDF8D]/50  from-teal-100 to-blue-100 hover:shadow-lg hover:text-[#372B20] text-[#005844] underline font-bold py-4 px-8 rounded-full">
              👩‍⚕️ พาฉันไปที่ แอปบริหารคลินิกสำหรับผู้ประกอบการ
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
