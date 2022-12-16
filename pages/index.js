import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSession } from "next-auth/react";

export default function Home({ session }) {
  return (
    <div className="">
      <Head>
        <title>Olive | Happy places for Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />

      <main className="main h-screen overflow-scroll scrollbar-hide">
        <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 lg:pt-12"></div>
        <section className=" py-4 flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 "></section>
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
