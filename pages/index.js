import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSession } from "next-auth/react";
import MediumCard from "../components/MediumCard";

export default function Home({ session, data }) {
  return (
    <div className="">
      <Head>
        <title>Olive | Happybody</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />

      <main className="main h-screen overflow-scroll scrollbar-hide">
        <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 lg:pt-12"></div>
        <section className=" py-4 flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 "></section>
        <div className="flex flex-col md:grid md:grid-cols-3 md:space-x-8">
          {data?.map(
            ({
              _id,
              clinic_id,
              clinic_name,
              imageUrl,
              address,
              description,
              price,
            }) => (
              <MediumCard
                key={clinic_id}
                _id={_id}
                clinic_name={clinic_name}
                imageUrl={imageUrl}
                address={address}
                description={description}
                price={price}
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
  const data = await fetch(
    "https://olive-service-api.vercel.app/clinic"
  ).then((res) => res.json());
  return {
    props: { session, data },
  };
}
