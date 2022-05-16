import React from 'react';
import Head from 'next/head'
import Header from './components/Header';
import Footer from '../../components/Footer';
import Link from "next/link"
import {getSession} from "next-auth/react";

export default function Home({session} ) {
    return (
    <div className="">
      <Head>
        <title>Olive | Daycare Owner</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
     <Header />

    <main  className="main">
      <section className="pt-6">
      <div className="absolute top-1/4 md:top-1/3 w-full text-center">
             <p className="text-white text-3xl md:text-5xl  font-black shadow-4xl opacity-100 p-3">เพิ่มรายการศูนย์ดูแลของคุณ</p>
             <button className="text-teal-500 bg-white px-10 py-4 shadow-xl rounded-full font-bold my-3 xl:text-3xl md:text-2xl transform hover:scale-110  transition  duration-2000 ease-out ">
                <Link href="/daycares/dashboard/">Create a new daycare </Link>
              </button>
           </div>
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
