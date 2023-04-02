import React, { Component } from "react";
import Link from "next/link";
import PreviousButton from "../OLButton/PreviousButton";
import ContinueButton from "../OLButton/ContinueButton";

import { toast } from "react-hot-toast";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const sexs = [
  { id: 1, label: "ชาย" },
  { id: 2, label: "หญิง" },
  { id: 3, label: "ไม่ระบุ" },
];

export class ContactInformation extends Component {
  continue = (e) => {
    e.preventDefault();

    if (this.props.handlePhoneValidation() == true) {
      this.props.nextStep();
    } else {
      toast.error("กรุณาใส่เบอร์โทรให้ถูกต้อง");
    }
  };
  previous = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange, accountProfile } = this.props;
    return (
      <div>
        <div className="flex justify-between align-middle items-center">
          <p className="h5 tracking-wide font-semibold text-[#005844]">
            ข้อมูลติดต่อ
          </p>
        </div>
        {!accountProfile && (
          <div>
            <div className="my-3 px-2 lg:px-3 py-2 bg-[#1A73E8] text-white flex items-center justify-between rounded-lg shadow-4xl shadow-[#1A73E8]/30">
              <p className="md:text-center font-medium text-left">
              เพิ่มที่หน้าบัญชีเพื่อใช้ซ้ำ <strong className="pl-2">{" "}*แนะนำ</strong>
              </p>

              <Link
                className="block tracking-wide rounded-lg bg-white px-2 md:px-6 py-2 text-center text-sm text-[#1A73E8] transition hover:bg-white/90 focus:outline-none focus:ring active:text-[#1A73E8] mt-0"
                href="/account"
              >
               เพิ่ม
              </Link>
            </div>
            <p className="pt-4 sm:text-left text-[#005844]">
              หรือ กรอกข้อมูลใหม่
            </p>
          </div>
        )}
        <div className="pt-2 grid grid-cols-6 gap-6">
          <div className="col-span-3">
            <label htmlFor="firstName" className="inputLabel pb-0 text-sm">
              ชื่อจริง
            </label>

            <input
              type="text"
              id="firstName"
              name="firstName"
              className={
                accountProfile.firstName || values.firstName
                  ? "inputOutline placeholder-gray-900"
                  : "inputOutline"
              }
              placeholder={
                accountProfile.firstName
                  ? accountProfile.firstName
                  : values.firstName
                  ? values.firstName
                  : "เช่น สมใจ"
              }
              onChange={handleChange("firstName")}
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
                accountProfile.lastName || values.lastName
                  ? "inputOutline placeholder-gray-900"
                  : "inputOutline"
              }
              placeholder={
                accountProfile.lastName
                  ? accountProfile.lastName
                  : values.lastName
                  ? values.lastName
                  : "เช่น รักษ์ดี"
              }
              onChange={handleChange("lastName")}
            />
          </div>
          <div className="col-span-3">
            <label htmlFor="nickName" className="inputLabel pb-0 text-sm">
              ชื่อเล่น
            </label>

            <input
              type="text"
              id="nickName"
              name="nickName"
              className={
                accountProfile.nickName || values.nickName
                  ? "inputOutline placeholder-gray-900"
                  : "inputOutline"
              }
              placeholder={
                accountProfile.nickName
                  ? accountProfile.nickName
                  : values.nickName
                  ? values.nickName
                  : "เช่น มะลิ"
              }
              onChange={handleChange("nickName")}
            />
          </div>
          <div className="col-span-3">
            <label htmlFor="age" className="inputLabel pb-0 text-sm">
              อายุ
            </label>

            <input
              type="text"
              id="age"
              name="age"
              className={
                accountProfile.age || values.age
                  ? "inputOutline placeholder-gray-900"
                  : "inputOutline"
              }
              placeholder={
                accountProfile.age
                  ? accountProfile.age
                  : values.age
                  ? values.age
                  : "เช่น 83"
              }
              onChange={handleChange("age")}
            />
          </div>
          <div className="col-span-3">
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
                width: "120px",
                px: 2,
                mt: 0.5,
              }}
              value={accountProfile.sex ? accountProfile.sex : values.sex}
              onChange={handleChange("sex")}
            >
              {sexs.map((input, key) => (
                <MenuItem key={input.id} value={input.label}>
                  {input.label}
                </MenuItem>
              ))}
            </Select>
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
                accountProfile.lineId || values.lineId
                  ? "inputOutline placeholder-gray-900"
                  : "inputOutline"
              }
              placeholder={
                accountProfile.lineId
                  ? accountProfile.lineId
                  : values.lineId
                  ? values.lineId
                  : "เช่น malila"
              }
              onChange={handleChange("lineId")}
            />
          </div>
          <div className="col-span-6">
            <label htmlFor="phoneNumber" className="inputLabel pb-0 text-sm">
              เบอร์โทร<span className="text-[#FF2F3B]"> * </span>
            </label>

            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className={
                accountProfile.phoneNumber || values.phoneNumber
                  ? "inputOutline placeholder-gray-900"
                  : "inputOutline"
              }
              placeholder={
                accountProfile.phoneNumber
                  ? accountProfile.phoneNumber
                  : values.phoneNumber
                  ? values.phoneNumber
                  : "เช่น 0864213464"
              }
              onChange={handleChange("phoneNumber")}
            />
          </div>
         
          <div className="pt-6 col-span-6">
            <label htmlFor="lineId" className="inputLabel pb-0 text-sm">
              ข้อควรระวัง หรือ รายละเอียดเพิ่มเติม
            </label>

            <input
              type="text"
              id="description"
              name="description"
              className={
                accountProfile.description || values.description
                  ? "inputOutline placeholder-gray-900"
                  : "inputOutline"
              }
              placeholder={
                accountProfile.description
                  ? accountProfile.description
                  : values.description
                  ? values.description
                  : "บอกคลินิกเพิ่มเเช่น เรื่องที่ควรระวัง หรือส่วนที่ต้องดูแลเป็นพิเศษ"
              }
              onChange={handleChange("description")}
            />
          </div>
        </div>
        <div className="flex justify-between pt-12">
          <PreviousButton handleClick={this.previous} />
          <ContinueButton handleClick={this.continue} />
        </div>
      </div>
    );
  }
}

export default ContactInformation;
