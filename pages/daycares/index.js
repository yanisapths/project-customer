import React from 'react';
import Head from 'next/head'
import Footer from '../../components/Footer';
import Link from "next/link"
import {getSession} from "next-auth/react";
import { signIn,signOut,useSession} from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

    return (
    <div className="">
      <Head>
        <title>Olive | Daycare Owner</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
    <main  className="main">
      <section className="pt-6">
          <> 
            <button className="text-teal-500 bg-white px-10 py-4 shadow-xl rounded-full font-bold my-3 xl:text-3xl md:text-2xl transform hover:scale-110  transition  duration-2000 ease-out ">
                <Link href="/daycares/dashboard/">Try one </Link>
              </button>
           </>
      </section>
      <section>
      </section>
    </main>
    <Footer />

    </div>
  );

}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session}
  }
}
