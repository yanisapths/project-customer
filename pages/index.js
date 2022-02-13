import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import {getSession} from "next-auth/react";


export default function Home( {exploreData, cardsData } ) {
  return (
    <div className="">
      <Head>
        <title>Happy Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

     <Header />
     <Banner /> 

    <main  className="msx-w-7xl mx-auto px-8 sm:px-16">
      <section className="pt-6">
        <h2 className="text-3xl font-semibold pb-5 text-teal-900">ค้นหาศูนย์ดูแลใกล้คุณ</h2>
        {/* Pull some data from a server-  API Endpoints*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exploreData?.map(( {img, location , distance} ) => (
            <SmallCard
              key={img} 
              img={img} 
              location={location} 
              distance={distance}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-semibold py-8 text-teal-900">กิจกรรมใกล้คุณ</h2>
        <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
          {cardsData?.map(({ img, title }) => (
            <MediumCard key={img} img={img} title={title}/>
          ))} 
        </div>
      </section>

      <LargeCard 
        img="/ed2.jpg" 
        title="Happy Elders"
        description="Find someone who cares" 
        buttonText="Get Care"
      />
    </main>

    </div>
    
  );
}
export async  function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").
  then(
    (res) => res.json()
  );
  const cardsData = await fetch("https://links.papareact.com/zp1").
  then(
    (res) => res.json()
  );

  return {
    props: {
      exploreData,cardsData
    },
  }
}
