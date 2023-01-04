import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";

const data = {
  id: 1,
  courseName: "ลดปวดเบสิก",
  amount: "1",
  duration: "2",
  totalPrice: "3270",
  procedures: [
    {
      procedureName: "Ultrasound",
      price: "1590",
    },
    {
      procedureName: "Laser",
      price: "990",
    },
    {
      procedureName: "จัดกระดูกและนวดศรีษะ",
      price: "690",
    },
  ],
};

function CourseDetail() {
  const router = useRouter();
  const procedureLists = { procedures: data.procedures };
  console.log(procedureLists);
  return (
    <div>
      <Head>
        <title>Olive | Happy places for Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="lg:pb-32 h-screen overflow-scroll scrollbar-hide">
        <div className="px-6 pt-12">
          <p className="caption tracking-wide text-black/50">ย้อนกลับ</p>
          <h2 className="pt-6 h3">{data.courseName}</h2>
          <section className="mb-2  pt-10 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-2 md:ml-8 md:w-4/6 border-black/20  border-b-[1px] border-dashed">
            <div className="flex justify-between">
              <div className="relative block">
                <p>การรักษา</p>
              </div>
              <div className="relative block">
                <p>ราคา (บาท)</p>
              </div>
            </div>
          </section>
          {procedureLists.procedures.map((procedure) => {
            return <div className="flex justify-between p-2 bg-gray-100 mb-1">
              <div>
                <p>{procedure.procedureName}</p>
              </div>
              <p>{procedure.price}</p>
            </div>
          })}
        </div>
      </main>
    </div>
  );
}

export default CourseDetail;
