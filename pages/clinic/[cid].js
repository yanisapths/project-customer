import React from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import { useRouter } from "next/router";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListView from "./view/ListView";

function Clinic({ data }) {
  const router = useRouter();
  const { cid } = router.query;

  const handleClick = (e) => {
    e.preventDefault();
    router.push(
      {
        pathname: `/request/${data.cid}`,
        query: { cid: data.cid, clinic_name: data.clinic_name },
      },
      `/request/${cid}`
    );
  };

  return (
    <div>
      <Head>
        <title>Olive | Happy places for Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="lg:pb-32 h-screen overflow-scroll scrollbar-hide">
        {data.imageUrl ? (
          <Banner imageUrl={data.imageUrl} />
        ) : (
          <Banner imageUrl="/tree.jpg" />
        )}
        <div className="space-x-3 px-6 lg:pt-12">
          <h2 className="md:mt-0 mt-4 text-3xl md:text-6xl font-bold text-[#005844]">
            {data.clinic_name}
          </h2>
        </div>
        <div className="px-6">
          <p className="mt-3 text-lg text-[#005844]">{data.description}</p>

          <h2 className="mt-6 text-3xl font-bold text-[#005844]">Contact</h2>
          <p className="mt-1 text-lg text-[#005844]">{data.phoneNumber}</p>
          <p className="text-lg text-[#005844]">{data.email}</p>

          <h2 className="mt-6 text-3xl font-bold text-[#005844]">Location</h2>
          <p className="mt-1 text-lg text-[#005844]">{data.address}</p>

          <h2 className="mt-6 mb-8 text-3xl font-bold text-[#005844]">
            Providers
          </h2>
          <Image
            alt="/Avatar.png"
            className="rounded-full"
            src="/Avatar.png"
            width="120"
            height="120"
          />
          <p className="mt-2 pl-4 text-xl font-bold text-[#005844]">
            {data.owner}
          </p>
        </div>
        <ListView className="overflow-scroll scrollbar-hide " />
      </main>

      <footer className="fixed font-noto bottom-0 inset-x-0 flex justify-between shadow-black/10 shadow-3xl bg-white">
        <div className="bottomNav">
          <div
            onClick={handleClick}
            className="cursor-pointer inline-flex items-center buttonPrimary"
          >
            <AddCircleIcon className="h-8 w-8 lg:h-10 lg:w-10" />
            <span className="text-xl pl-3 font-medium lg:text-2xl">
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
  const res = await fetch("https://olive-service-api.vercel.app/clinic");
  const cinics = await res.json();

  const paths = cinics.map((clinic) => ({
    params: { cid: clinic._id },
  }));
  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const clinicId = params.cid;
  const res = await fetch(
    `https://olive-service-api.vercel.app/clinic/${clinicId}`
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
