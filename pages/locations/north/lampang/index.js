import React from 'react'
import Head from "next/head";
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import Tab from "../../../../components/places/Tab"
import InfoCard from "../../../../components/InfoCard"


const places = [
    {
     img: '/daycare/n1.jpg',
     location: 'แม่แจ๋ม 124 ลำปาง 12000',
     description: 'ท่ามกลางธรรมชาติ ป่าเขา ดงพงไพร และแม่น้ำไหลผ่าน ณ ลำปาง ทีเจ้าหน้าที่ดูแล 24/7 ผ่านการอบรมเป็นอย่างดี เป็นที่ยอมรับ และให้ความอบอุ่นแก่คนที่คุณรักประดั่งครอบครัว ',
     title:'home for seniors',
     star:'4',
     price:'400 บาท/คืน',
     total:'ดูวันว่าง',
    }
]

function Lampang() {
    const results = places;
  return (
      <div>
              <Head>
                    <title>Olive | Lampang </title>
                    <link rel="icon" href="favicon.ico" />
                </Head>
                <Header/>
                <main className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
                        <Tab />
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:items-center md:text-center ">
                        <p className="text-sm md:text-md md:font-semibold font-medium md:mt-10 text-teal-600  "> Locations /  North </p>
                        <h1 className="mt-1 text-lg font-bold text-teal-800  md:text-7xl md:mt-6 font-noto ">นครลำปาง</h1>
                
                        <p className="mt-4 md:mt-10 text-sm md:text-2xl col-start-1 sm:col-span-2  row-start-4 lg:col-span-1 text-teal-700 font-noto">
                        จังหวัดลำปางจึงถือเป็นแหล่งอารยธรรมล้านนาไทยที่น่าสนใจไม่น้อยไปกว่าจังหวัดอื่นใดในภาคเหนือ เอกลักษณ์อันโดดเด่นสร้างความประทับใจให้ผู้ไปเยือนคือ วัดวาอารามบ้านเรือนที่เต็มไปด้วยสถาปัตยกรรมอันทรงคุณค่า รถม้า เครื่องปั้นดินเผา และ ชาวลำปางเองที่มีวิถีชีวิตที่เรียบง่ายโอบอ้อมอารี คงไว้ซึ่งขนบธรรมเนียมประเพณีที่สืบทอดกันมาแต่โบร่ำโบราณ
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

export default Lampang