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
        {/* <h2 className="text-3xl font-semibold pb-5 text-teal-900 font-noto">ศูนย์ดูแลใกล้คุณ</h2> */}
        {/* Pull some data from a server-  API Endpoints*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    
        </div>
      </section>
      <h2 className="text-3xl font-semibold mt-24 -mb-8 text-teal-900 font-noto">ข่าวสาร</h2>
      <LargeCard 
        img="/daycare/b3.png" 
        title="เปิดวิธีเตรียมเงินสู่บั้นปลายสไตล์ เกษียณโสด"
        description="เปิดราคาบ้านพักคนชรา พร้อมวิธีการเตรียมตัวของคนที่อยากอยู่ บ้านพักคนชรา ในชีวิตบั้นปลาย ควรวางแผนการเงินอย่างไร เพราะใช่ว่าใครๆ จะเดินเข้าไปอยู่ก็ได้" 
        link="https://www.bangkokbiznews.com/business/907159"
        buttonText="อ่าน"
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
