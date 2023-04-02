import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EditProfile from "../../components/OLForm/EditProfile";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
const sexs = [
  { id: 1, label: "ชาย" },
  { id: 2, label: "หญิง" },
  { id: 3, label: "ไม่ระบุ" },
];

function Account({ accountProfile }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  function handleOpenEdit() {
    if (openEdit == true) {
      setOpenEdit(false);
    } else if (openEdit == false) {
      setOpenEdit(true);
    }
  }

  function handleCloseEdit() {
    setOpenEdit(false);
  }

  const onSubmit = async (data) => {
    data.customer_id = session.user.id;
    let axiosConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(
        `${process.env.url}/customer/create/${session.user.id}`,
        data,
        axiosConfig
      )
      .then(async (res) => {
        toast.success("เพิ่มข้อมูลส่วนตัวเรียบร้อย");
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  };

  return (
    <div>
      <Head>
        <title>Olive</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="bg-[#7BC6B7] h-full pb-24 md:h-screen">
        <div className="flex pt-8 items-center justify-center">
          <div className="shadow-xl rounded-2xl max-w-screen-lg px-10 md:px-32 pt-10 pb-20 bg-white">
            <p className="h3 tracking-wide font-semibold text-[#005844]">
              บัญชีผู้ใช้
            </p>
            {session && (
              <form className="pt-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4">
                  <Image
                    alt="/userLoginImage.png"
                    className="rounded-full"
                    src={session.user.image}
                    width={90}
                    height={90}
                  />
                  <p className="h6">คุณ {session.user.name}</p>
                </div>

                {session.user.email ? (
                  <div className="text-start px-4 pt-6">
                    <p className="h5">
                      <span className="caption tracking-wide">email: </span>
                      {session.user.email}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {!accountProfile && (
                  <div className="pt-6 grid grid-cols-6 gap-6">
                    <div className="col-span-3">
                      <label
                        htmlFor="firstName"
                        className="inputLabel pb-0 text-sm"
                      >
                        ชื่อจริง
                      </label>

                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="inputOutline"
                        placeholder="เช่น สมใจ"
                        {...register("firstName", { required: false })}
                      />
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="lastName"
                        className="inputLabel pb-0 text-sm"
                      >
                        นามสกุล
                      </label>

                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="inputOutline"
                        placeholder="เช่น รักษ์ดี"
                        {...register("lastName", { required: false })}
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="nickName"
                        className="inputLabel pb-0 text-sm"
                      >
                        ชื่อเล่น
                      </label>

                      <input
                        type="text"
                        id="nickName"
                        name="nickName"
                        className="inputOutline"
                        placeholder="เช่น มะลิ"
                        {...register("nickName", { required: false })}
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="age" className="inputLabel pb-0 text-sm">
                        อายุ
                      </label>

                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="inputOutline"
                        placeholder="เช่น 83"
                        {...register("age", { required: false })}
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="sex" className="inputLabel pb-0 text-sm">
                        เพศ
                      </label>
                      <Select
                        sx={{
                          borderRadius: "40px",
                          height: "40px",
                          "@media (min-width: 780px)": {
                            width: "120px",
                          },
                          px: 2,
                          mt: 0.5,
                        }}
                        {...register("sex", { required: false })}
                      >
                        {sexs.map((input, key) => (
                          <MenuItem key={input.id} value={input.label}>
                            {input.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="phoneNumber"
                        className="inputLabel pb-0 text-sm"
                      >
                        เบอร์โทร
                      </label>

                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="inputOutline"
                        placeholder="เช่น 0864213464"
                        {...register("phoneNumber", { required: false })}
                      />
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="lineId"
                        className="inputLabel pb-0 text-sm"
                      >
                        กรอก LINE ID
                      </label>

                      <input
                        type="text"
                        id="lineId"
                        name="lineId"
                        className="inputOutline"
                        placeholder="เช่น malila"
                        {...register("lineId", { required: false })}
                      />
                    </div>
                    <div className="pt-6 col-span-6">
                      <label
                        htmlFor="description"
                        className="inputLabel pb-0 text-sm"
                      >
                        ข้อควรระวังด้านสุขภาพ
                      </label>

                      <input
                        type="text"
                        id="description"
                        name="description"
                        className="inputOutline"
                        placeholder="เช่น เรื่องที่ควรระวัง หรือส่วนที่ต้องดูแลเป็นพิเศษ"
                        {...register("description", { required: false })}
                      />
                    </div>
                  </div>
                )}
                {accountProfile && openEdit == false && (
                  <div className="pt-6 grid grid-cols-6 gap-6">
                    <div className="col-span-3">
                      <label
                        htmlFor="firstName"
                        className="inputLabel pb-0 text-sm"
                      >
                        ชื่อจริง
                      </label>

                      {accountProfile.firstName ? accountProfile.firstName : "-"}
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="lastName"
                        className="inputLabel pb-0 text-sm"
                      >
                        นามสกุล
                      </label>
                      {accountProfile.lastName ? accountProfile.lastName : "-"}
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="nickName"
                        className="inputLabel pb-0 text-sm"
                      >
                        ชื่อเล่น
                      </label>
                      {accountProfile.nickName ? accountProfile.nickName : "-"}
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="age" className="inputLabel pb-0 text-sm">
                        อายุ
                      </label>
                      {accountProfile.age ? accountProfile.age : "-"}
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="sex" className="inputLabel pb-0 text-sm">
                        เพศ
                      </label>
                      {accountProfile.sex ? accountProfile.sex : "-"}
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="phoneNumber"
                        className="inputLabel pb-0 text-sm"
                      >
                        เบอร์โทร
                      </label>
                      {accountProfile.phoneNumber
                        ? accountProfile.phoneNumber
                        : "-"}
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="lineId"
                        className="inputLabel pb-0 text-sm"
                      >
                        LINE ID
                      </label>
                      {accountProfile.lineId ? accountProfile.lineId : ""}
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="description"
                        className="inputLabel pb-0 text-sm"
                      >
                        ข้อควรระวังด้านสุขภาพ
                      </label>
                      {accountProfile.description
                        ? accountProfile.description
                        : "-"}
                    </div>
                  </div>
                )}
              </form>
            )}
            {openEdit == true && (
              <EditProfile
                accountProfile={accountProfile}
                handleOpenEdit={handleOpenEdit}
                handleCloseEdit={handleCloseEdit}
                userId={session.user.id}
              />
            )}
            {!accountProfile && (
              <div className="flex justify-center">
                <div className="relative h-10 w-36">
                  <div className="absolute bottom-0 inset-x-0 h-2">
                    <div className="flex gap-6 items-center">
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="border-[#7BC6B7] bg-[#7BC6B7] shadow-lg text-white hover:bg-transparent hover:text-[#7BC6B7] focus:outline-none focus:ring active:text-[#7BC6B7] cursor-pointer border-2 w-fit h-fit rounded-full px-10 p-4 py-1 hover:shadow-xl "
                      >
                        บันทึก
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {openEdit == false && accountProfile && (
              <div className="flex justify-center">
                <div className="relative h-10 w-32">
                  <div className="absolute bottom-0 inset-x-0 h-2">
                    <button
                      onClick={() => handleOpenEdit()}
                      className="flex gap-2 border-[#7BC6B7] bg-[#7BC6B7] shadow-lg text-white hover:bg-transparent hover:text-[#7BC6B7] focus:outline-none focus:ring active:text-[#7BC6B7] cursor-pointer border-2 w-fit h-fit rounded-full px-6 p-4 py-1 hover:shadow-xl"
                    >
                      <DriveFileRenameOutlineIcon />
                      แก้ไข
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Account;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const url = `${process.env.url}/customer/get/${session.user.id}`;
    try {
      const res = await fetch(url);
      const accountProfile = await res.json();
      if (!accountProfile) {
        return;
      }
      return { props: { accountProfile } };
    } catch (error) {
      console.log("error: ", error);
      return {
        props: {
          error: true,
        },
      };
    }
  }
  return {
    props: {
      error: true,
    },
  };
}
