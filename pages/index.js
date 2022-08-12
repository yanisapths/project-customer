import React,{useState,useEffect} from 'react';
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tabs from '../components/Tabs';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import {getSession} from "next-auth/react";
import { MdMap, MdPark } from "react-icons/md";

import  {
    All,
   nature,
  } from "../components/data/placeType"

export default function Home({session} ) {
  const [selected, setSelected] = useState("");
  const [cardsData, setCardsData] = useState([]);

  const exploreData = [
    {
      img: '/asset/primaryBG.png', 
      title: 'Add Request',
    },
    { 
      img: '/asset/primaryBG.png',
      title: 'Explore',
    },
    { 
      img: '/asset/primaryBG.png',
      title: 'Activities',
    },
    { 
      img: '/asset/primaryBG.png',
      title: 'Reserved',
    }
  ];
  const list = [
      {
        id: "all",
        title: "Province",
        icons: MdMap,
      },
      {
        id: "nature",
        title: "nature",
        icons: MdPark,
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

    <main  className="main h-screen overflow-scroll scrollbar-hide">
      <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 lg:pt-12">
          {exploreData?.map(( {img, title } ) => (
            <SmallCard
              key={img} 
              img={img} 
              title={title} 
            />
            ))}
        </div>
        <section className=" py-4 flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 ">
        {list.map((item) => (
          <div    key={item.id}  className="inline-flex border-b border-gray-100">
            <div className="relative block p-4">
                  <div className="inline-flex ml-2">
                      <item.icons className="flex-shrink-0 w-8 h-8 text-gray-500 pt-3" />
                    </div>
                  <Tabs
                          title={item.title}
                          active={selected === item.id}
                          setSelected={setSelected}
                          id={item.id}
                          key={item.id} 
                  />
                </div>
            </div>
                ))}
        </section>
          <div className="flex-1 pt-4 m-auto p-auto md:m-auto :space-x-8 md:grid md:grid-cols-3 space-y-12 xl:grid-cols-6  ">
            {cardsData?.map(({ img, title, link }) => (
              <MediumCard key={img} img={img} title={title} link={link}/>
              ))} 
            </div>
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
