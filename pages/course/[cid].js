import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";

function CourseDetail() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Olive | Happy places for Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="lg:pb-32 h-screen overflow-scroll scrollbar-hide"></main>
    </div>
  );
}

export default CourseDetail;
