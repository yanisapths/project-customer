import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const course = {
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

function CourseDetail({ data }) {
  const router = useRouter();
  const procedureLists = { procedures: course.procedures };
  console.log(procedureLists);
  const { cid, clinic_name, owner_id } = router.query;
  console.log(course);

  const navigateBack = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/clinic/${cid}`,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(data);
    router.push({
      pathname: `/request/${cid}`,
      query: {
        cid: cid,
        clinic_name: clinic_name,
        owner_id: owner_id,
      },
    });
  };

  return (
    <div>
      <Head>
        <title>Olive | Happy places for Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen overflow-scroll scrollbar-hide">
        <div className="px-6 pt-12 lg:px-96">
          <p
            className="caption lg:body1 lg:pl-6 tracking-wide text-black/50 cursor-pointer hover:text-[#0921FF]"
            onClick={navigateBack}
          >
            ย้อนกลับ
          </p>
          <h2 className="pt-6 h3 lg:h1 text-center">{course.courseName}</h2>
          <section className="lg:w-5/6 mb-2 pt-10 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-2 md:ml-8 border-black/20  border-b-[1px] border-dashed">
            <div className="flex justify-between lg:body1 tracking-wide">
              <div className="relative block ">
                <p>การรักษา</p>
              </div>
              <div className="relative block">
                <p>ราคา (บาท)</p>
              </div>
            </div>
          </section>
          {procedureLists.procedures.map((procedure) => {
            return (
              <div
                className="flex justify-between p-2 bg-gray-100 mb-1  mx-2 md:ml-8 lg:w-5/6 md:lg-h6 lg:h5"
                key={procedure.procedureName}
              >
                <div>
                  <p>{procedure.procedureName}</p>
                </div>
                <p>{procedure.price}</p>
              </div>
            );
          })}
          <section className="mb-2  pt-10 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-2 md:ml-8 lg:w-5/6 border-black/20  border-b-[1px] border-dashed">
            <div className="flex justify-between">
              <div className="relative block lg:body1 tracking-wide">
                <p>ค่าใช้จ่ายและระยะเวลา</p>
              </div>
            </div>
          </section>
          <div className="p-2 h5 lg:h4 mb-1 mx-2 md:ml-8 lg:w-5/6">
            <div>
              <p>คอร์ส {course.amount} ครั้ง</p>
            </div>
            <div className="flex justify-between mt-4">
              <p>{course.duration} ชั่วโมง</p>
              <p>{course.totalPrice} บาท</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="fixed font-noto bottom-0 inset-x-0 flex justify-between shadow-black/10 shadow-3xl bg-white">
        <div className="bottomNav">
          <div
            onClick={handleClick}
            className="cursor-pointer inline-flex items-center buttonPrimary"
          >
            <AddCircleIcon className="h-8 w-8 lg:h-10 lg:w-10" />
            <span className="text-xl pl-3 font-medium lg:text-2xl">
              {" "}
              จองนัด{" "}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CourseDetail;
