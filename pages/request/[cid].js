import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

const place = [
  { id: 1, label: "บ้าน" },
  { id: 2, label: "คลีนิก" },
];

const course = [
  { id: 1, courseName: "ลดปวดเบสิก" },
  { id: 2, courseName: "ลดปวดมหากาพย์" },
];

function Request(props) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState();
  const { query } = useRouter();
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  console.log(query.owner_id);
  async function fetchData() {
    await delay(1000);
    const url = `https://olive-service-api.vercel.app/course/match/owner/${query.owner_id}`;
    //course

    const res = await fetch(url);
    try {
      const courseData = await res.json();
      if (courseData) {
        setCourseData(courseData);
      } else return;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData();
    }
  }, [status]);

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
      nickname: event.target.nickname.value,
      phoneNumber: event.target.phoneNumber.value,
      create_At: Date.now(),
      appointmentDate: event.target.appointmentDate,
      appointmentTime: event.target.appointmentTime,
      appointmentPlace: event.target.place.value,
      course: event.target.course.value,
      description: event.target.description.value,
      owner_id: query.owner_id,
      location: location,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(
        `https://olive-service-api.vercel.app/appointment/create/${query.cid}`,
        data,
        axiosConfig
      )
      .then(async (res) => {
        console.log("RESPONSE RECEIVED: ", res.data);
        toast.success(
          `your appointment request has been sent to the clinic! 🎉`
        );
        router.push({
          pathname: `/clinic/${query.cid}`,
        });
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
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
    defaultValues: {
      firstName: "",
      lastName: "",
      nickname: "",
      phoneNumber: "",
      place: "",
      course: "",
      price: "",
      description: "",
      appointmentDate: "",
      appointmentTime: "",
      owner_id: query.owner_id,
    },
  });

  console.log(
    watch([
      "firstName",
      "lastName",
      "nickname",
      "phoneNumber",
      "place",
      "course",
      "appointmentDate",
      "appointmentTime",
      "description",
      "address",
      "subDistrict",
    ])
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <div className="whitespace-nowrap overflow-auto scrollbar-hide">
        <Head>
          <title>Olive | Book Appointment </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <main className="">
          <div className="flex-grow pt-10  md:pt-30 mt-5 px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-white rounded-md ">
            <div className="max-w-lg mx-auto text-center pb-8 ">
              <h1 className="font-medium pb-2 text-xl text-[#b1c2be] sm:text-3xl">
                จองนัดกับคลีนิก
              </h1>
              <h1 className="font-bold text-3xl text-[#7BC6B7] sm:text-5xl text-ellipsis">
                {props.router.query.clinic_name}
              </h1>
            </div>
            <form
              className="max-w-md mx-auto mt-2 md:mt-6"
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <div className="mx-auto space-x-4 grid grid-cols-2 pb-8">
                  <Grid item xs={6} md={8}>
                    <InputLabel shrink style={{ fontSize: "24px" }}>
                      ชื่อจริง
                    </InputLabel>
                    <FormControl
                      sx={{ width: "100%" }}
                      variant="outlined"
                      required
                    >
                      <Controller
                        render={({ field: { onChange, value } }) => (
                          <>
                            <TextField
                              id="outlined-textarea"
                              placeholder="ใส่ชื่อจริง"
                              {...register("firstName", { required: true })}
                              onChange={onChange}
                              multiline
                            />
                          </>
                        )}
                        name="firstName"
                        control={control}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <InputLabel shrink style={{ fontSize: "24px" }}>
                      นามสกุล
                    </InputLabel>
                    <FormControl
                      sx={{ width: "100%" }}
                      variant="outlined"
                      required
                    >
                      <Controller
                        render={({ field: { onChange, value } }) => (
                          <>
                            <TextField
                              id="outlined-textarea"
                              placeholder="ใส่นามสกุล"
                              {...register("lastName", { required: true })}
                              onChange={onChange}
                              multiline
                            />
                          </>
                        )}
                        name="lastName"
                        control={control}
                      />
                    </FormControl>
                  </Grid>
                </div>
                <div className="mx-auto space-x-4 grid grid-cols-2 pb-8">
                  <Grid item xs={6} md={8}>
                    <InputLabel shrink style={{ fontSize: "24px" }}>
                      ชื่อเล่น
                    </InputLabel>
                    <FormControl
                      sx={{ width: "100%" }}
                      variant="outlined"
                      required
                    >
                      <Controller
                        render={({ field: { onChange, value } }) => (
                          <>
                            <TextField
                              id="outlined-textarea"
                              placeholder="ใส่ชื่อเล่น"
                              {...register("nickname", { required: true })}
                              onChange={onChange}
                              multiline
                            />
                          </>
                        )}
                        name="nickname"
                        control={control}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <InputLabel shrink style={{ fontSize: "24px" }}>
                      เบอร์ติดต่อ
                    </InputLabel>
                    <FormControl
                      sx={{ width: "100%" }}
                      variant="outlined"
                      required
                    >
                      <Controller
                        render={({ field: { onChange, value } }) => (
                          <>
                            <TextField
                              id="outlined-textarea"
                              placeholder="089564546"
                              {...register("phoneNumber", { required: true })}
                              onChange={onChange}
                              multiline
                            />
                          </>
                        )}
                        name="phoneNumber"
                        control={control}
                      />
                    </FormControl>
                  </Grid>
                </div>

                <Grid item xs={6} md={8} className="pb-8">
                  <FormControl
                    sx={{ width: "100%" }}
                    variant="outlined"
                    required
                  >
                    <Controller
                      render={({ field: { field, onChange, value } }) => (
                        <>
                          <InputLabel id="course">คอร์ส</InputLabel>
                          <Select
                            {...field}
                            {...register("course", { required: true })}
                          >
                            {courseData?.map((input, key) => (
                              <MenuItem
                                onChange={onChange}
                                key={input.id}
                                value={input.courseName}
                              >
                                {input.courseName}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      )}
                      name="course"
                      control={control}
                    />
                  </FormControl>
                </Grid>
                <div className="mx-auto space-x-4 flex pb-8">
                  <Grid item xs={6} md={8} className="w-full">
                    <FormControl
                      sx={{ width: "100%" }}
                      variant="outlined"
                      required
                    >
                      <Controller
                        render={({ field: { field, onChange, value } }) => (
                          <>
                            <InputLabel id="place">สถานที่</InputLabel>
                            <Select
                              {...field}
                              {...register("place", { required: true })}
                            >
                              {place.map((input, key) => (
                                <MenuItem
                                  key={input.id}
                                  value={input.label}
                                  onChange={onChange}
                                >
                                  {input.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </>
                        )}
                        name="place"
                        control={control}
                      />
                    </FormControl>
                  </Grid>
                </div>
                <div>
                  <p className="h5 text-[#b1c2be]">กรอกที่อยู่</p>
                </div>
                <Grid item xs={6} md={8} className="pb-8">
                  <FormControl
                    sx={{
                      width: "100%",
                      pb: 2,
                      pt: 2,
                    }}
                    variant="outlined"
                    required
                  >
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <>
                          <TextField
                            id="outlined-basic"
                            label="ที่อยู่ (บ้านเลขที่, หมู่, ตรอกซอย, ถนน)"
                            variant="outlined"
                            onChange={onChange}
                            value={value}
                            {...register("address", { required: false })}
                          />
                        </>
                      )}
                      name="address"
                      control={control}
                      rules={{
                        required: false,
                      }}
                    />
                  </FormControl>

                  <div className="mx-auto space-x-4 grid grid-cols-2 pb-4">
                    <FormControl variant="standard">
                      <Controller
                        render={({ field: { onChange, value } }) => (
                          <>
                            <TextField
                              xs={2}
                              id="outlined-basic"
                              label="จังหวัด"
                              variant="outlined"
                              onChange={onChange}
                              {...register("province", { required: true })}
                            />
                          </>
                        )}
                        name="province"
                        control={control}
                        rules={{
                          required: false,
                        }}
                      />
                    </FormControl>
                    <FormControl variant="standard">
                      <Controller
                        render={({ field: { onChange, value } }) => (
                          <>
                            <TextField
                              xs={2}
                              id="outlined-basic"
                              label="เขต/อำเภอ"
                              variant="outlined"
                              onChange={onChange}
                              {...register("district", { required: false })}
                            />
                          </>
                        )}
                        name="district"
                        control={control}
                        rules={{
                          required: false,
                        }}
                      />
                    </FormControl>
                  </div>
                  <div className="mx-auto space-x-4 grid grid-cols-2">
                    <FormControl variant="standard">
                      <Controller
                        render={({ field: { onChange, value } }) => (
                          <>
                            <TextField
                              xs={2}
                              id="outlined-basic"
                              label="แขวง/ตำบล"
                              variant="outlined"
                              onChange={onChange}
                              {...register("subDistrict", { required: false })}
                            />
                          </>
                        )}
                        name="subDistrict"
                        control={control}
                        rules={{
                          required: false,
                        }}
                      />
                    </FormControl>
                    <FormControl variant="standard">
                      <Controller
                        render={({ field: { onChange, value } }) => (
                          <>
                            <TextField
                              xs={2}
                              id="outlined-basic"
                              label="รหัสไปรษณีย์"
                              variant="outlined"
                              onChange={onChange}
                              {...register("postalCode", { required: false })}
                            />
                          </>
                        )}
                        name="postalCode"
                        control={control}
                        rules={{
                          required: false,
                        }}
                      />
                    </FormControl>
                  </div>
                </Grid>

                <div className="mx-auto space-x-4 grid grid-cols-2">
                  <Grid item xs={4} className="pb-8">
                    <InputLabel shrink style={{ fontSize: "24px" }}>
                      วันที่ต้องการจอง
                    </InputLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name="appointmentDate"
                        render={({ field: { onChange, value } }) => (
                          <ReactDatePicker
                            className="rounded-sm outline-none border-2 border-black/25
                         w-full px-4 py-2 focus:border-[#7bc6b7]
                         hover:border-black"
                            onChange={onChange}
                            selected={value}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} className="pb-8">
                    <InputLabel shrink style={{ fontSize: "24px" }}>
                      เวลา
                    </InputLabel>
                    <FormControl>
                      <Controller
                        render={({ field: { onChange, value } }) => (
                          <>
                            <DatePicker
                              onChange={onChange}
                              className="rounded-sm outline-none border-2 border-black/25
                          w-full px-4 py-2 focus:border-[#7bc6b7]
                          hover:border-black"
                              selected={value}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          </>
                        )}
                        name="appointmentTime"
                        control={control}
                      />
                    </FormControl>
                  </Grid>
                </div>

                <Grid item xs={6} md={12} className="pb-8">
                  <InputLabel shrink style={{ fontSize: "24px" }}>
                    รายละเอียดเพิ่มเติม
                  </InputLabel>
                  <FormControl sx={{ width: "100%" }} variant="standard">
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <>
                          <TextField
                            id="outlined-textarea"
                            placeholder="..."
                            {...register("description", { required: false })}
                            onChange={onChange}
                            multiline
                          />
                        </>
                      )}
                      name="description"
                      control={control}
                      rules={{
                        required: false,
                      }}
                    />
                  </FormControl>
                </Grid>
              </div>
              <div className="relative text-center">
                <input
                  type="submit"
                  className="lg:w-full lg:px-[180px] font-bold bg-[#7BC6B7] cursor-pointer inline-flex items-center buttonPrimary"
                />
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  } else {
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
          <button className="buttonPrimary text-xl" onClick={signIn}>
            เข้าสู่ระบบ
          </button>
        </section>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Request);
