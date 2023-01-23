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
        <title>Olive</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />

      <main className="main max-w-screen-xxl h-screen overflow-scroll scrollbar-hide pt-4 xl:pt-14">
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
