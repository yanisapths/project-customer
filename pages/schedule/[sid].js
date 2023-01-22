import React from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavigateBack from "../../components/OLNavigateBack/NavigateBack";

function ScheduleDetail() {
  return (
    <div>
      <Head>
        <title>Olive | Schedule</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="lg:pb-32 h-screen overflow-scroll scrollbar-hide">
      <NavigateBack path="/" />
        <div className="px-6 pt-12 lg:px-96 text-center">
          <p className="body1 tracking-wide text-black/50">ตารางนัด</p>
          <h2 className="py-6 h3 lg:h1">ลดปวดเบสิก</h2>
          <div className="bg-[#7BC6B7] w-60 py-2 lg:py-3 rounded-full mx-auto">
            <p className="h6 text-white">คลินิกบ้านสวยริมสวน</p>
          </div>
          <div className="flex justify-between body1  lg:h6 tracking-wide mt-6 lg:mt-12 lg:px-96">
            <div>
              <p className=" text-black/50">ติดต่อคลินิก</p>
              <p className=" hover:text-[#0921FF]">06-12423492</p>
            </div>
            <div>
              <p className="text-black/50">ติดต่อลูกค้า</p>
              <p className=" hover:text-[#0921FF]">089-1242342</p>
            </div>
          </div>
          <section className="lg:w-full mb-2 pt-12 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-2 md:ml-8 border-black/20 border-b-[1px] border-dashed">
            <div className="flex justify-between lg:body1 tracking-wide">
              <div className="relative block md:w-1/6">
                <p className="">ครั้งที่</p>
              </div>
              <div className="relative block md:w-4/6">
                <p>วันรักษา</p>
              </div>
              <div className="relative block md:w-1/6">
                <p>สถานะ</p>
              </div>
            </div>
          </section>

          <div className="flex justify-between p-2 bg-gray-100 text-black/50 mb-1  mx-2 md:ml-8 lg:w-full body1 md:h6 lg:h5">
            <div className="md:w-1/6">
              <p>1</p>
            </div>
            <div className="md:w-4/6">
              <p>01/02/2022</p>
            </div>
            <div className="md:w-1/6">
              <p>สำเร็จ</p>
            </div>
          </div>
          <div className="flex justify-between p-2 bg-gray-100 text-black/50 mb-1  mx-2 md:ml-8 lg:w-full body1 md:h6 lg:h5">
            <div className="md:w-1/6">
              <p>2</p>
            </div>
            <div className="md:w-4/6">
              <p>10/02/2022</p>
            </div>
            <div className="md:w-1/6">
              <p>สำเร็จ</p>
            </div>
          </div>
          <div className="flex justify-between p-2 bg-[#acded5] mb-1  mx-2 md:ml-8 lg:w-full body1 md:h6 lg:h5">
            <div className="md:w-1/6">
              <p>3</p>
            </div>
            <div className="md:w-4/6">
              <p className="cursor-pointer hover:text-[#0921FF]">เลือกวัน</p>
            </div>
            <div className="md:w-1/6">
              <p>ยังไม่เริ่ม</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ScheduleDetail;
