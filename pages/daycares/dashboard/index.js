import React from 'react';
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../../../components/Footer';
import {getSession} from "next-auth/react";
import { useSession} from "next-auth/react";
import signIn from "../../auth/signin";
import { useRouter } from "next/router";
import { useEffect } from 'react'

export default function Home( ) {
  const {data: session,status} = useSession();
  const router = useRouter();
  
    useEffect(() => {
        if (status === "unauthenticated") {
          router.push("/auth/signin/");
        }
      }, [status])

        return (
        <div className="">
          <Head>
            <title>Olive |  Daycare Dashboard</title>
            <link rel="icon" href="favicon.ico" />
          </Head>
        <Header />

        <main  className="main">
          <section className="pt-6">
          </section>
            <h1 className="text-3xl font-bold align-center item-center">Welcome to Daycare Dashboard</h1>
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
