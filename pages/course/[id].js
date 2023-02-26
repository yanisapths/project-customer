import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import RequestFooterButton from "../../components/OLButton/RequestFooterButton";
import NavigateBack from "../../components/OLNavigateBack/NavigateBack";

function CourseDetail({ data, course }) {
  const router = useRouter();
  const theme = useTheme();
  const { cid, clinic_name, owner_id, id } = router.query;
  const procedureLists = { procedures: course?.procedures };

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

  if (router.isFallback) {
    return <p className="h1">Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>Olive | Happybody</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen overflow-scroll scrollbar-hide">
        <div className="px-6 pt-12 xl:px-96">
          <NavigateBack path={`/clinic/${cid}`} />
          <div className="flex justify-center gap-2 pt-6">
          <h2 className="h3 lg:h1 text-[#005844]">
            {course.courseName}
          </h2>
          {course.type != "false" ? (
            <strong className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] px-2 py-1 text-sm font-medium self-center">
              {course.type}
            </strong>
          ) : (
            <></>
          )}
          </div>
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
      <RequestFooterButton handleClick={handleClick} />
    </div>
  );
}

export default CourseDetail;

export async function getStaticPaths() {
  // Call an external API endpoint to get courses
  const res = await fetch(`${process.env.dev}/course`);
  const courses = await res.json();

  const paths = courses.map((course) => ({
    params: { id: course._id },
  }));
  // { fallback: false } means other routes should 404
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const courseId = params.id;
  const res = await fetch(`${process.env.dev}/course/${courseId}`);
  const course = await res.json();

  return {
    props: { course },
  };
}
