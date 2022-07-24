import React,{useState,useEffect} from 'react';
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tabs from '../components/Tabs';
import MediumCard from '../components/MediumCard';
import {getSession} from "next-auth/react";
import  {
    All,
   nature,
  } from "../components/data/placeType"

export default function Home({session} ) {
  const [selected, setSelected] = useState("");
  const [cardsData, setCardsData] = useState([]);
  const list = [
      {
        id: "all",
        title: "All",
      },
      {
        id: "nature",
        title: "nature",
      },    
    ];
useEffect(() => {
  switch (selected) {
    case "nature":
      setCardsData(nature);
      break;
    default:
      setCardsData(All);
  }
}, [selected]);
  return (
    <div className="">
      <Head>
        <title>Olive | Happy places for Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
     <Header />

    <main  className="main">
        {list.map((item) => (
                <Tabs
                        title={item.title}
                        active={selected === item.id}
                        setSelected={setSelected}
                        id={item.id}
                        key={item.id} 
                />
                ))}
      <section className="pt-6">
        <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
          {cardsData?.map(({ img, title, link }) => (
            <MediumCard key={img} img={img} title={title} link={link}/>
            ))} 
          </div>
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
