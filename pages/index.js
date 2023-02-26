import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSession } from "next-auth/react";
import MediumCard from "../components/MediumCard";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroBanner from "../components/HeroBanner";

export default function Home({ session, data }) {
  let { scrollY } = useScroll();
  let y = useTransform(scrollY, [0, 500], ["0%", "50%"]);
  return (
    <div className="">
      <Head>
        <title>Olive</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <section className="w-escape relative flex flex-col overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-x-0 top-0 -z-20 mx-auto"
        ></motion.div>
        <HeroBanner />
        <div className="absolute xl:-right-24 xl:-top-20 inset-y-0">
          <div className="rounded-full -mt-40 xl:mt-0 xl:h-96 xl:w-96 bg-[#7BC6B7]"></div>
          <div className="rounded-full xl:h-20 xl:w-20 top-[50vh] inset-y-0 right-80 bg-[#94CDDA]"></div>
        </div>
      </section>
      <main className="main pb-32 max-w-screen-xxl h-screen overflow-scroll scrollbar-hide pt-4 xl:pt-14">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 xl:grid xl:grid-cols-3 xl:gap-8 xl:px-28">
          {data?.map(
            ({
              _id,
              clinic_id,
              clinic_name,
              imageUrl,
              address,
              description,
              price,
              approvalStatus
            }) => (
              <MediumCard
                key={clinic_id}
                _id={_id}
                clinic_name={clinic_name}
                imageUrl={imageUrl}
                address={address}
                description={description}
                price={price}
                approvalStatus={approvalStatus}
              />
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const data = await fetch(`${process.env.url}/clinic`).then(
    (res) => res.json()
  );
  return {
    props: { session, data },
  };
}
