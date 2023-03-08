import React from "react";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import axios from "axios";
import Router from "next/router";
import ReactStars from "react-rating-stars-component";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import BarChart from "../../components/OLInput/BarChart";
function GeneralReview({ clinic_id, reviews }) {
  const calcualteAverage = () => {
    let average = reviews.reduce((acc, review) => {
      return acc + review.score / reviews.length;
    }, 0);
    return average > 0 ? average.toFixed(1) : 0;
  };
  const ratingStar = {
    size: 30,
    value: calcualteAverage(),
    edit: false,
    isHalf: true,
  };
  function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }
  const cal3 = () => {
    let total = 0;
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].score >= 3 && reviews[i].score < 3.9) {
        total++;
      }
    }
    return total;
  };
  const cal2 = () => {
    let total = 0;
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].score >= 2 && reviews[i].score < 2.9) {
        total++;
      }
    }
    return total;
  };
  const cal1 = () => {
    let total = 0;
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].score >= 1 && reviews[i].score < 1.9) {
        total++;
      }
    }
    return total;
  };
  const cal4 = () => {
    let total = 0;

    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].score >= 4 && reviews[i].score < 4.9) {
        total++;
      }
    }

    return total;
  };

  const cal5 = () => {
    let total = 0;
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].score == 5) {
        total++;
      }
    }
    return total;
  };

  const AllStars = [
    { star: "5", percent: percentage(cal5(), reviews.length) },
    { star: "4", percent: percentage(cal4(), reviews.length) },
    { star: "3", percent: percentage(cal3(), reviews.length) },
    { star: "2", percent: percentage(cal2(), reviews.length) },
    { star: "1", percent: percentage(cal1(), reviews.length) },
  ];
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      comments: "",
      score: "",
    },
  });

  const onSubmit = async (data) => {
    const json = JSON.stringify(data);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(`${process.env.dev}/review/create/${clinic_id}`, json, axiosConfig)
      .then(async (res) => {
        console.log("RESPONSE RECEIVED: ", res.data);
        toast.seccuss("");
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });

    const status = { status: "reviewed" };
  };

  return (
    <div className="lg:w-3/6 mb-48 pt-3">
      <div className="">
        <div className="overflow-scroll scroll-auto scrollbar-hide pb-3 md:ml-8 border-black/20  border-b-[1px] border-dashed">
          <p className="h3">รีวิวจากลูกค้า</p>
        </div>
        <div className="mt-4 lg:ml-8 md:p-3 lg:flex rounded-2xl bg-stone-200/30">
        <div className="pt-4 lg:p-8 content-center text-center lg:w-2/6 w-full">
            <p className="text-center h1">{calcualteAverage()}</p>
          <p className="pt-1 text-md font-medium text-gray-500 dark:text-gray-400">
            จากลูกค้า {reviews.length} รีวิว
          </p>
           <div className="flex justify-center"><ReactStars {...ratingStar}/></div>
        </div>
        <div className="content-center text-center lg:w-4/6 lg:pl-12 pb-4 px-2">
          {AllStars.map((data, index) => (
            <BarChart key={index} star={data.star} percent={data.percent} />
          ))}
        </div>

        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-2xl bg-stone-200/30 py-4 mt-6 lg:ml-8">
            <div className="grid grid-cols-1 mx-10 ">
              <FormControl>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <div className="p-2 flex gap-4">
                      <ReactStars
                        count={5}
                        onChange={onChange}
                        size={34}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                    </div>
                  )}
                  name="score"
                  control={control}
                />
              </FormControl>
              <FormControl>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TextField
                        multiline
                        className="mx-auto h-full w-full rounded-lg border-[#7879F1]/50  border-2 px-2 text-md lg:text-lg"
                        placeholder="เขียนรีวิว....."
                        rows={3}
                        id="comments"
                        {...register("comments", { required: false })}
                      />
                    </>
                  )}
                  name="comments"
                  control={control}
                />
              </FormControl>
            <div className="flex justify-enstartd py-3">
              <button
                type="submit"
                className="font-bold bg-[#ACDED5] hover:shadow-xl text-[#005844] cursor-pointer inline-flex rounded-full h-fit w-fit px-20 py-4"
              >
                <div className="flex gap-3">
                  <p className="h6 font-semibold">ส่งรีวิว</p>
                  <SendIcon />
                </div>
              </button>
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneralReview;
