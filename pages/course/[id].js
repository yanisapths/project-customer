import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

function CourseDetail({ data, course }) {
  const router = useRouter();
  const theme = useTheme();
  const procedureLists = { procedures: course.procedures };
  const { cid, clinic_name, owner_id } = router.query;

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
        <title>Olive | Happybody</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen overflow-scroll scrollbar-hide">
        <div className="px-6 pt-12 xl:px-96">
          <p
            className="caption lg:body1 lg:pl-6 tracking-wide text-black/50 cursor-pointer hover:text-[#0921FF]"
            onClick={navigateBack}
          >
            ย้อนกลับ
          </p>
          <h2 className="pt-6 h3 lg:h1 text-center text-[#005844]">
            {course.courseName}
          </h2>
          <section className="xl:w-5/6 mb-2 pt-10 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-2 md:ml-8 border-black/20  border-b-[1px] border-dashed">
            <div className="flex justify-between lg:body1 tracking-wide  text-black/50">
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
              <Box
                sx={{
                  bgcolor: theme.palette.background.gray,
                  color: theme.palette.secondary.main,
                }}
                className="flex justify-between p-2 mb-2 xl:mb-4  mx-2 md:ml-8 xl:w-5/6 body1 md:h6 xl:h5 rounded-md"
                key={procedure.procedureName}
              >
                <div>
                  <p>{procedure.procedureName}</p>
                </div>
                <p>{procedure.price}</p>
              </Box>
            );
          })}
          <section className="mb-2  pt-10 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-2 md:ml-8 xl:w-5/6 border-black/20  border-b-[1px] border-dashed">
            <div className="flex justify-between">
              <div className="relative block lg:body1 tracking-wide text-black/50">
                <p>ค่าใช้จ่ายและระยะเวลา</p>
              </div>
            </div>
          </section>
          <Box
            className="p-2 h5 mb-1 mx-2 md:ml-8 xl:w-5/6 "
            sx={{ color: theme.palette.secondary.main }}
          >
            <div>
              <p>คอร์ส {course.amount} ครั้ง</p>
            </div>
            <div className="flex justify-between mt-4">
              <p>{course.duration} ชั่วโมง</p>
              <p>{course.totalPrice} บาท</p>
            </div>
          </Box>
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

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  // Call an external API endpoint to get courses
  const res = await fetch("https://olive-service-api.vercel.app/course");
  const courses = await res.json();

  const paths = courses.map((course) => ({
    params: { id: course._id },
  }));
  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const courseId = params.id;
  const res = await fetch(
    `https://olive-service-api.vercel.app/course/${courseId}`
  );
  const course = await res.json();

  return {
    props: { course },
  };
}
