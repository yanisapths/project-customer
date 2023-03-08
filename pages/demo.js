import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSession } from "next-auth/react";

export default function Demo({ session }) {
  return (
    <div className="">
      <Head>
        <title>Olive | Demo</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="main pb-32 max-w-screen-xxl h-screen overflow-scroll scrollbar-hide pt-4 xl:pt-14">
        <div>
          <h1 className="text-center h1 text-[#7bc6b7]">
            สำหรับ Demo ติดต่อได้ที่
          </h1>
        </div>
        <div className="flex justify-center content-center py-6">
          <div id="fbRoot"></div>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v16.0&appId=559430456093362&autoLogAppEvents=1"
            nonce="lPdwa7Ol"
          ></script>
          <div
            className="fb-page"
            dataHref="https://www.facebook.com/profile.php?id=100090759916798"
            dataTabs="timeline"
            dataWidth="500"
            dataHeight="500"
            dataSmallHeader="false"
            dataAdapContainerWidth="true"
            dataHideCover="false"
            dataShowFacepile="true"
          >
            <blockquote
              cite="https://www.facebook.com/profile.php?id=100090759916798"
              className="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/profile.php?id=100090759916798">
                Olive Physiotherapy Platform
              </a>
            </blockquote>
          </div>
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
