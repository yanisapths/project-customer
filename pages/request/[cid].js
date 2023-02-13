import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TimeModal from "./TimeModal";
import { signIn, useSession } from "next-auth/react";
import { useRouter, withRouter } from "next/router";
import { toast } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import { useTheme } from "@mui/material/styles";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import dayjs from "dayjs";
import RequestForm from "../../components/OLForm/RequestForm";

const place = [
  { id: 1, label: "คลินิก" },
  { id: 2, label: "บ้าน" },
];

function Request(props) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState();
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const { query } = useRouter();
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [availData, setAvailData] = useState([]);
  const [open, setOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    event.preventDefault();
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleDateSelect = (event, reason) => {
    event.preventDefault();
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  function getSelectedDate(appointmentDate, appointmentTime, endTime) {
    setAppointmentDate(appointmentDate);
    setAppointmentTime(appointmentTime);
    setEndTime(endTime);
  }

  useEffect(() => {
    const url = `${process.env.dev}/course/match/owner/${query.owner_id}`;
    const availurl = `${process.env.dev}/available/match/owner/${query.owner_id}`;
    fetch(url, {
      method: "GET",
    })
      .then(async (res) => {
        const courseData = await res.json();
        setCourseData(courseData);
      })
      .catch((err) => console.log(err));
    fetch(availurl, {
      method: "GET",
    })
      .then(async (res) => {
        const availData = await res.json();
        setAvailData(availData);
      })
      .catch((err) => console.log(err));
    getSelectedDate();
  }, [courseData, availData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const location =
      event.target.address.value +
      event.target.province.value +
      event.target.district.value +
      event.target.subDistrict.value +
      event.target.postalCode.value;
    const data = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      nickName: event.target.nickName.value,
      phoneNumber: event.target.phoneNumber.value,
      customer_id: session.user.id,
      clinicName: query.clinic_name,
      create_At: Date.now(),
      appointmentDate: event.target.appointmentDate || appointmentDate,
      appointmentTime: event.target.appointmentTime || appointmentTime,
      endTime: endTime,
      appointmentPlace: event.target.place.value,
      course_id: event.target.course_id.value,
      description: event.target.description.value,
      owner_id: query.owner_id,
      location: location,
    };

    // let axiosConfig = {
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };
    // const response = await axios
    //   .post(
    //     `${process.env.dev}/appointment/create/${query.cid}`,
    //     data,
    //     axiosConfig
    //   )
    //   .then(async (res) => {
    //     console.log("RESPONSE RECEIVED: ", res.data);
    //     toast.success(
    //       `your appointment request has been sent to the clinic! 🎉`
    //     );
    //     router.push({
    //       pathname: `/clinic/${query.cid}`,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("AXIOS ERROR: ", err);
    //   });
  };

  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (router.isFallback) {
    return <p className="h1">Loading...</p>;
  }

  if (!courseData || !availData) {
    return null;
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen">
        <Head>
          <title>Olive | Book Appointment </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <section className="text-center mt-12">
          <h1 className="mt-5 mb-6 text-3xl font-extrabold text-[#7BC6B7]">
            สร้างนัดดูแล
          </h1>
          <p className="mt-5 mb-6 text-xl text-[#7BC6B7]">
            เข้าสู่ระบบเพื่อสร้างนัดดูแล
          </p>
          <button className="buttonPrimary text-xl" onClick={signIn}>
            เข้าสู่ระบบ
          </button>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="whitespace-nowrap overflow-auto scrollbar-hide">
      <Head>
        <title>Olive | Book Appointment </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="">
        <div className="flex-grow pt-10 md:pt-30 mt-5 px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 via-blue-50 to-[#7BC6B7]/20 rounded-md pb-48">
          <div className="max-w-lg mx-auto text-center pb-8 ">
            <h1 className="pb-4 text-2xl text-[#005844]">จองนัดกับคลินิก</h1>
            <h1 className="font-bold text-3xl text-[#7BC6B7] sm:text-5xl text-ellipsis">
              {props.router.query.clinic_name}
            </h1>
          </div>
          <div className="max-w-xl mx-auto mt-2 md:mt-6 shadow-md py-10 px-6 rounded-2xl bg-white">
          <form onSubmit={handleSubmit}>
            <RequestForm
              courses={courseData}
              currentDate={currentDate}
              today={today}
              setToday={setToday}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              control={control}
              availables={availData}
              getSelectedDate={getSelectedDate}
            />
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default withRouter(Request);
