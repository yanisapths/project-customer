import React, { useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/dist/client/router";
import InfoCard from "../components/InfoCard";

function Search({ data }) {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div className="h-screen">
      <Header placeholder={`${address}`} />
      <main className="flex max-w-screen-xl px-24 mx-auto items-center justify-center">
        <section className="flex-grow pt-14">
          <p className=" text-md text-teal-900 mt-4"></p>
          <h1 className="px-6 md:px-0 text-3xl font-semibold mt-2 mb-6 text-teal-900">
            คลินิกกายภาพใน {address}
          </h1>

          <div className="flex flex-col">
            {data
              .filter(
                ({
                  clinic_id,
                  clinic_name,
                  imageUrl,
                  address,
                  description,
                  price,
                  _id,
                }) => {
                  if (router.query.address == "") {
                    return {
                      clinic_id,
                      clinic_name,
                      imageUrl,
                      address,
                      description,
                      price,
                      _id,
                    };
                  } else if (
                    address
                      .toLowerCase()
                      .includes(router.query.address.toLowerCase())
                  ) {
                    return {
                      clinic_id,
                      clinic_name,
                      imageUrl,
                      address,
                      description,
                      price,
                      _id,
                    };
                  }
                }
              )
              .map(
                ({
                  clinic_id,
                  clinic_name,
                  imageUrl,
                  address,
                  description,
                  price,
                  _id,
                }) => (
                  <InfoCard
                    key={clinic_id}
                    clinic_name={clinic_name}
                    imageUrl={imageUrl}
                    address={address}
                    description={description}
                    price={price}
                    _id={_id}
                  />
                )
              )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const data = await fetch(`${process.env.dev}/clinic`).then(
    (res) => res.json()
  );

  return {
    props: {
      data,
    },
  };
}
