import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import {getSession} from "next-auth/react";

export default function Home({session} ) {
  
  return (
    <div className="">
      <Head>
        <title>Olive | Happy places for Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
     <Header />
     <Banner /> 

    <main  className="main">
      <section className="pt-6">
        <h2 className="text-3xl font-semibold pb-5 text-teal-900">ค้นหาศูนย์ดูแลใกล้คุณ</h2>
        {/* Pull some data from a server-  API Endpoints*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    
        </div>
      </section>

      <LargeCard 
        img="/ed2.jpg" 
        title="Happy Elders"
        description="Find someone who cares" 
        buttonText="Get Care"
      />
    </main>
    <Footer />

    </div>
  );

}
// export async  function getStaticProps() {
//   const exploreData = await fetch("https://links.papareact.com/pyp").
//   then(
//     (res) => res.json()
//   );
//   const cardsData = await fetch("https://links.papareact.com/zp1").
//   then(
//     (res) => res.json()
//   );

//   return {
//     props: {
//       exploreData,cardsData
//     },
//   }
// }

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session}
  }
}
