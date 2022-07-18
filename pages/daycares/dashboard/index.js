import React from 'react';
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../../../components/Footer';
import {getSession} from "next-auth/react";
import { useSession} from "next-auth/react";
import signIn from "../../auth/signin";
import MediumCard from '../../../components/MediumCard';
import { makeStyles, useTheme } from "@mui/styles";
import { useRouter } from "next/router";
import { useEffect } from 'react'
import { style } from '@mui/system';


const  useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: '#F0F6A5',
  },
 }));
export default function Home( ) {
  const {data: session,status} = useSession();
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const cardsData = [
    {
      img: '/daycare/bg.png', 
      title: 'Requests',
      link: '/daycares/requestLists/',
    },
  ];

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

        <main  className="main bg-amber-50">
          <section className="pt-6">
          </section>
            <h1 className="text-3xl font-bold align-center item-center">Welcome to Daycare Dashboard</h1>
            <section>
              <h2 className="text-3xl font-semibold py-8 text-teal-900">Admin Services</h2>
              <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
                {cardsData?.map(({ img, title, link }) => (
                  <MediumCard key={img} img={img} title={title} link={link}/>
                ))} 
              </div>
          </section>
        </main>

        </div>
      );

}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session}
  }
}
