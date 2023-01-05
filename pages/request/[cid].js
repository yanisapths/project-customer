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
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

const place = [
  { id: 1, label: "บ้าน" },
  { id: 2, label: "คลีนิก" },
];

function Request(props) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState();
  const { query } = useRouter();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      customerName: event.target.customerName.value,
      phoneNumber: event.target.phoneNumber.value,
      create_At: Date.now(),
      appointmentDate: event.target.appointmentDate,
      appointmentTime: event.target.appointmentTime,
      appointmentPlace: event.target.place,
      description: event.target.description.value,
      owner_id: query.owner_id,
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
          pathname: "/",
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
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      customerName: "",
      phoneNumber: "",
      place: "",
      price: "",
      description: "",
      appointmentDate: "",
      appointmentTime: "",
      owner_id: query.owner_id,
    },
  });

  console.log(
    watch([
      "customerName",
      "phoneNumber",
      "place",
      "appointmentDate",
      "appointmentTime",
      "description",
    ])
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <div className="whitespace-nowrap overflow-auto scrollbar-hide">
        <Head>
          <title>Olive | Request </title>
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
                <Grid item xs={6} md={8} className="pb-8">
                  <InputLabel shrink style={{ fontSize: "24px" }}>
                    บุคคลรับการดูแล
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
                            placeholder="กรุณากรอกชื่อจริง"
                            {...register("customerName", { required: true })}
                            onChange={onChange}
                            multiline
                          />
                        </>
                      )}
                      name="customerName"
                      control={control}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={8} className="pb-8">
                  <InputLabel id="phoneNumber">เบอร์ติดต่อ</InputLabel>
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
                <Grid item xs={6} md={8} className="pb-8">
                  <FormControl
                    sx={{ width: "100%" }}
                    variant="outlined"
                    required
                  >
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <>
                          <InputLabel id="place">สถานที่รับการดูแล</InputLabel>
                          <Select
                            labelId="place"
                            id="place"
                            value={value || ""}
                            label="สถานที่รับการดูแล"
                            onChange={onChange}
                          >
                            {place.map((input, key) => (
                              <MenuItem
                                key={input.id}
                                value={input.label}
                                {...register("place", { required: true })}
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
                <Grid item xs={6} md={12} className="pb-8">
                  <InputLabel shrink style={{ fontSize: "24px" }}>
                    วันที่ต้องการจอง
                  </InputLabel>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name="appointmentDate"
                      render={({ field: { onChange, value } }) => (
                        <ReactDatePicker onChange={onChange} selected={value} />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={12} className="pb-8">
                  <InputLabel shrink style={{ fontSize: "24px" }}>
                    เวลา
                  </InputLabel>
                  <FormControl fullWidth>
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <>
                          <DatePicker
                            onChange={onChange}
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
                <Grid item xs={6} md={12} className="pb-8">
                  <InputLabel shrink style={{ fontSize: "24px" }}>
                    การดูแลที่ต้องการ
                  </InputLabel>
                  <FormControl sx={{ width: "100%" }} variant="standard">
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <>
                          <TextField
                            id="outlined-textarea"
                            placeholder="เช่น กายภาพส่วนหลัง"
                            {...register("description", { required: true })}
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
          <title>Olive | Book Request </title>
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
