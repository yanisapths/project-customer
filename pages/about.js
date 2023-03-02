import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSession } from "next-auth/react";

export default function About({ session }) {
  return (
    <div className="">
      <Head>
        <title>Olive | About</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="main pb-32 max-w-screen-xxl h-screen overflow-scroll scrollbar-hide pt-4 xl:pt-14">
        <div>
          <h1 className="text-center h1 text-[#7bc6b7]">Coming Soon!</h1>
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
