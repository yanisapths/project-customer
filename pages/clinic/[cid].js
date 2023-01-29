import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import { useRouter } from "next/router";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListView from "./view/ListView";
import { useTheme } from "@mui/material/styles";
import VerifiedIcon from '@mui/icons-material/Verified';
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[10],
    fontSize: 14,
    borderRadius: 12,
    p:8
  },
}));


function Clinic({ data, courses }) {
  const router = useRouter();
  const theme = useTheme();
  const { cid, clinic_name, owner_id } = router.query;
  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    let isSubscribed = true;
    const res = await fetch(`${process.env.local}/review/match/${cid}`);
    const reviews = await res.json();

    if (isSubscribed) {
      setReviews(reviews);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  });

  const handleClick = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/request/${cid}`,
      query: {
        cid: data.cid,
        clinic_name: data.clinic_name,
        owner_id: data.owner_id,
      },
    });
  };

  if (router.isFallback) {
    return <p className="h1">Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>Olive | Happybody</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="lg:pb-32 h-screen overflow-scroll scrollbar-hide">
        {data.imageUrl ? (
          <Banner imageUrl={data.imageUrl} />
        ) : (
          <Banner imageUrl="/tree.jpg" />
        )}
        <div className="space-x-3 px-8 lg:px-24 lg:pt-12">
          <h2 className="md:mt-0 mt-4 text-3xl md:text-6xl font-bold text-[#005844]">
            {data.clinic_name}
            {data.approvalStatus == "Authorized" ? <span className="px-2"><CustomTooltip title="Verified Clinic" placement="top" ><VerifiedIcon className="text-[#7bc6b7]" fontSize="large" /></CustomTooltip></span>:"" }
          </h2>
        </div>
        <div className="px-8 lg:px-24">
          <p className="mt-3 text-lg text-[#005844]">{data.description}</p>

          <h2 className="mt-6 h6 tracking-wide text-gray-500 uppercase">
            ติดต่อ
          </h2>
          <p className="mt-1 h5">{data.phoneNumber}</p>
          <p className="h5">{data.email}</p>
          <ul className="mt-8 space-y-1 text-gray-700">
            <span className="mt-6 h6 tracking-wide text-gray-500 uppercase">
              วันและเวลาทำการ
            </span>
            <li className="h5 text-black">
              {data.openDay}: {data.openTime} am - {data.closeTime} pm
            </li>
          </ul>
          <h2 className="mt-6 h6 tracking-wide text-gray-500 uppercase">
            ที่อยู่
          </h2>
          <p className="mt-1 h5">{data.address}</p>

          <h2 className="mt-6 h6 tracking-wide text-gray-500 uppercase">
            ผู้ให้บริการ
          </h2>
          <Image
            alt="/Avatar.png"
            className="rounded-full"
            src="/Avatar.png"
            width="120"
            height="120"
          />
          <p className="mt-2 pl-4 h5">{data.owner}</p>
        </div>
        <ListView
          className="pt-6 max-w-screen h-screen content-center overflow-scroll scrollbar-hide"
          data={data}
          courses={courses}
          reviews={reviews}
        />
      </main>

      <footer className="fixed font-noto bottom-0 inset-x-0 flex justify-between shadow-black/10 shadow-3xl bg-white">
        <div className="bottomNav">
          <div
            onClick={handleClick}
            className="cursor-pointer inline-flex items-center buttonPrimary"
          >
            <AddCircleIcon className="h-8 w-8 xl:h-10 xl:w-10" />
            <span className="text-xl pl-3 font-medium xl:text-2xl text-center">
              {" "}
              จองนัด{" "}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Clinic;

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  // Call an external API endpoint to get clinics
  const res = await fetch(`${process.env.local}/clinic`);
  const cinics = await res.json();

  const paths = cinics.map((clinic) => ({
    params: { cid: clinic._id },
  }));
  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const clinicId = params.cid;
  const res = await fetch(`${process.env.local}/clinic/${clinicId}`);
  const data = await res.json();

  const courseRes = await fetch(
    `${process.env.local}/course/match/${clinicId}`
  );
  const courses = await courseRes.json();

  return {
    props: { data, courses },
  };
}
