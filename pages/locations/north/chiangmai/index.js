import React from 'react'
import Head from "next/head";
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import Tab from "../../../../components/places/Tab"
import InfoCard from "../../../../components/InfoCard"

const places = [
    {
     img: '/daycare/n2.jpg',
     location: '783 แม่กำปอง เชียงใหม่ 12000',
     description: 'ตั้งอยู่กลางหมู่บ้านสโลว์ไลฟ์ขึ้นชื่อ ท่ามกลางธรรมชาติ ป่าเขา ดงพงไพร และแม่น้ำไหลผ่าน ณ แม่กำปอง ทีเจ้าหน้าที่ดูแล 24/7 ผ่านการอบรมเป็นอย่างดี เป็นที่ยอมรับ และให้ความอบอุ่นอก่คนที่คุณรักประดั่งครอบครัว ',
     title:'Mae Kampong Senior Living',
     star:'4',
     price:'500 บาท/คืน',
     total:'ดูวันว่าง',
    }
]

function Chiangmai() {
    const results = places;
  return (
      <div>
              <Head>
                    <title>Olive | Chiang Mai </title>
                    <link rel="icon" href="favicon.ico" />
                </Head>
                <Header/>
                <main className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
                    <Tab />
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:items-center md:text-center ">
                        <p className="text-sm md:text-md md:font-semibold font-medium md:mt-10 text-teal-600  "> Locations /  North </p>
                        <h1 className="mt-1 text-lg font-semibold text-teal-800  md:text-7xl md:mt-6 font-noto">เชียงใหม่</h1>
                
                        <p className="mt-4 md:mt-10 text-sm md:text-2xl col-start-1 sm:col-span-2  row-start-4 lg:col-span-1 text-teal-700 font-noto">
                        เสน่ห์ล้านนาอย่างเชียงใหม่ ครองใจนักท่องเที่ยวทั้งไทยและเทศจากทั่วโลก จนขึ้นเป็นจังหวัดอันดับต้นๆ ของไทยที่มีรายได้จากการท่องเที่ยวต่อปีสูงกว่า 67,000 ล้านบาท ด้วยสถานที่ท่องเที่ยวอันหลากหลายทั้งแนวธรรมชาติ ประวัติศาสตร์และวัฒนธรรมที่งดงามเป็นเอกลักษณ์ นอกจากความโดดเด่นในด้านการท่องเที่ยวแล้ว เชียงใหม่ยังติดอันดับต้นๆ ของจังหวัดที่มีความเจริญมากที่สุดในประเทศ จึงไม่น่าแปลกใจที่ใครหลายคนอยากย้ายไปตั้งหลักปักฐานและทำธุรกิจที่เชียงใหม่ 
                        </p>
                    </div>
                    <section className="flex-grow pt-14 px-6">
                        <div className="flex flex-col">
                        {results.map(( { img,location,description,title,star,price,total} 
                        ) => (
                            <InfoCard 
                                key={img}
                                img={img}
                                location={location}
                                description={description}
                                title={title}
                                star={star}
                                price={price}
                                total={total}
                            />
                        ))}
                    </div>
                    </section>
            </main>
        <Footer />
  </div>
  )
}

export default Chiangmai