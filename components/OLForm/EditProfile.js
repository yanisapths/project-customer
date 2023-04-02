import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
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

function EditProfile({
  accountProfile,
  userId,
  handleOpenEdit,
  handleCloseEdit,
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const [sex, setSex] = useState("");
  const handleChange = (i) => (e) => {
    setSex({ [i]: e.target.value });
  };

  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: accountProfile.firstName,
      lastName: accountProfile.lastName,
      nickName: accountProfile.nickName,
      sex: accountProfile.sex,
      age: accountProfile.age,
      lineId: accountProfile.lineId,
      description: accountProfile.description,
      phoneNumber: accountProfile.phoneNumber,
      customer_id: accountProfile.customer_id,
    },
  });

  function handleOpenEdit() {
    if (openEdit == true) {
      setOpenEdit(false);
    } else if (openEdit == false) {
      setOpenEdit(true);
    }
  }

  const onSubmit = async (data) => {
    let axiosConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .put(`${process.env.dev}/customer/update/${userId}`, data, axiosConfig)
      .then(async (res) => {
        toast.success("บันทึกเรียบร้อย");
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  };

  return (
    <form className="pt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-6 grid grid-cols-6 gap-6">
        <div className="col-span-3">
          <label htmlFor="firstName" className="inputLabel pb-0 text-sm">
            ชื่อจริง
          </label>

          <input
            type="text"
            id="firstName"
            name="firstName"
            className={
              accountProfile.firstName
                ? "inputOutline placeholder-gray-900"
                : "inputOutline"
            }
            placeholder={
              accountProfile.firstName ? accountProfile.firstName : "เช่น สมใจ"
            }
            {...register("firstName", { required: false })}
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="lastName" className="inputLabel pb-0 text-sm">
            นามสกุล
          </label>

          <input
            type="text"
            id="lastName"
            name="lastName"
            className={
              accountProfile.lastName
                ? "inputOutline placeholder-gray-900"
                : "inputOutline"
            }
            placeholder={
              accountProfile.lastName ? accountProfile.lastName : "เช่น รักษ์ดี"
            }
            {...register("lastName", { required: false })}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="nickName" className="inputLabel pb-0 text-sm">
            ชื่อเล่น
          </label>

          <input
            type="text"
            id="nickName"
            name="nickName"
            className={
              accountProfile.nickName
                ? "inputOutline placeholder-gray-900"
                : "inputOutline"
            }
            placeholder={
              accountProfile.nickName ? accountProfile.nickName : "เช่น มะลิ"
            }
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
            className={
              accountProfile.age
                ? "inputOutline placeholder-gray-900"
                : "inputOutline"
            }
            placeholder={accountProfile.age ? accountProfile.age : "เช่น 83"}
            {...register("age", { required: false })}
          />
        </div>
        <div className="col-span-6">
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
            defaultValue={accountProfile.sex ? accountProfile.sex : sex}
            onChange={handleChange}
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
          <label htmlFor="phoneNumber" className="inputLabel pb-0 text-sm">
            เบอร์โทร
          </label>

          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className={
              accountProfile.phoneNumber
                ? "inputOutline placeholder-gray-900"
                : "inputOutline"
            }
            placeholder={
              accountProfile.phoneNumber
                ? accountProfile.phoneNumber
                : "เช่น 0864213464"
            }
            {...register("phoneNumber", { required: false })}
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="lineId" className="inputLabel pb-0 text-sm">
            กรอก LINE ID
          </label>

          <input
            type="text"
            id="lineId"
            name="lineId"
            className={
              accountProfile.lineId
                ? "inputOutline placeholder-gray-900"
                : "inputOutline"
            }
            placeholder={
              accountProfile.lineId ? accountProfile.lineId : "เช่น malila"
            }
            {...register("lineId", { required: false })}
          />
        </div>
        <div className="pt-6 col-span-6">
          <label htmlFor="lineId" className="inputLabel pb-0 text-sm">
            ข้อควรระวังด้านสุขภาพ
          </label>

          <input
            type="text"
            id="description"
            name="description"
            className={
              accountProfile.description
                ? "inputOutline placeholder-gray-900"
                : "inputOutline"
            }
            placeholder={
              accountProfile.description
                ? accountProfile.description
                : "เช่น เรื่องที่ควรระวัง หรือส่วนที่ต้องดูแลเป็นพิเศษ"
            }
            {...register("description", { required: false })}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative h-10 w-36">
          <div className="absolute bottom-0 inset-x-0 h-2">
            <div className="flex gap-6 items-center">
              <button onClick={() => handleCloseEdit()}>ยกเลิก</button>
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
    </form>
  );
}

export default EditProfile;
