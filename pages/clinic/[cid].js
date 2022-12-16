import React from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import { useRouter } from "next/router";

function Clinic({ data }) {
  const router = useRouter();
  const { cid } = router.query;

  return (
    <div>
      <Head>
        <title>Olive | Happy places for Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <Banner imageUrl={data.imageUrl} />
      <main>
        <div className="space-x-3 overflow-scroll scrollbar-hide px-6 lg:pt-12">
          <h2 className="mt-6 text-3xl font-bold text-[#005844]">
            {data.clinic_name}
          </h2>
        </div>
          <div className="px-6">
           <p className="mt-3 text-lg text-[#005844]">{data.description}</p>

           
           <h2  className="mt-6 text-3xl font-bold text-[#005844]">
           Contact
           </h2>
           <p className="mt-1 text-lg text-[#005844]">{data.phoneNumber}</p> 
           <p className="text-lg text-[#005844]">{data.email}</p> 


           <h2  className="mt-6 text-3xl font-bold text-[#005844]">
           Location details 
           </h2>
             <p className="mt-1 text-lg text-[#005844]">{data.address}</p> 

           <h2  className="mt-6 text-3xl font-bold text-[#005844]">
             Providers 
           </h2>
           <p className="mt-1 text-lg font-medium text-[#005844]">{data.owner}</p> 
          </div>
      </main>
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
  const res = await fetch(
    "https://ukbze987lk.execute-api.ap-northeast-1.amazonaws.com/dev/clinic"
  );
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
    `https://ukbze987lk.execute-api.ap-northeast-1.amazonaws.com/dev/clinic/${clinicId}`
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
