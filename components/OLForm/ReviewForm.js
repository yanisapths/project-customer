import React from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import axios from "axios";
import Router from "next/router";
import ReactStars from "react-rating-stars-component";

const ratingChanged = (newRating) => {
  console.log(newRating);
};

function ReviewForm({ clinic_id, schedule_id }) {
  const { data: session, status } = useSession();
  const theme = useTheme();

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
    console.log(data);
    data.customerName = session.user.name;
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
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });

    const status = { status: "reviewed" };
    const res = await axios
      .put(
        `${process.env.dev}/appointment/accept/${schedule_id}`,
        status,
        axiosConfig
      )
      .then(async (res) => {
        console.log("RESPONSE RECEIVED: ", res.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
    console.log(watch(["score", "status", "customerName"]));
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-screen-xl px-8">
          <div className="grid grid-cols-1">
            <FormControl>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <div className="flex gap-4">
                    <p className="pt-4 caption">การให้บริการ</p>
                    <ReactStars
                      count={5}
                      onChange={onChange}
                      size={30}
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
                    <input
                      className="mx-auto h-16 w-full xl:h-16 rounded-lg border-[#7879F1]/50  border-2 p-2 text-md lg:text-lg"
                      placeholder="เขียนรีวิว....."
                      rows="4"
                      id="comments"
                      {...register("comments", { required: false })}
                    />
                  </>
                )}
                name="comments"
                control={control}
              />
            </FormControl>
          </div>
          <div className="flex justify-end pt-2 pb-2">
            <button
              type="submit"
              className="font-bold bg-[#ACDED5] hover:shadow-xl text-[#005844] cursor-pointer inline-flex rounded-full h-fit w-fit px-3 py-1"
            >
              ส่งรีวิว
            </button>
          </div>
        </div>
      </form>
    </Box>
  );
}

export default ReviewForm;
