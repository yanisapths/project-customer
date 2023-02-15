import React, { Component } from "react";
import PreviousButton from "../OLButton/PreviousButton";
import ContinueButton from "../OLButton/ContinueButton";

import { toast } from "react-hot-toast";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const sexs = [
  { id: 1, label: "ชาย" },
  { id: 2, label: "หญิง" },
  { id: 3, label: "อื่นๆ" },
];

export class ContactInformation extends Component {
  continue = (e) => {
    e.preventDefault();

    if (this.props.handlePhoneValidation() == true) {
      this.props.nextStep();
    } else {
      toast.error("กรุณาใส่เบอร์โทร และเป็นตัวเลขเท่านั้น");
    }
  };
  previous = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <div>
        <div className="flex justify-between align-middle items-center">
          <p className="h5 tracking-wide font-semibold text-[#005844]">
            ข้อมูลติดต่อ
          </p>
        </div>
        <div className="pt-10 px-8 grid grid-cols-6 gap-6">
          <div className="col-span-3">
            <label htmlFor="firstName" className="inputLabel pb-0 text-sm">
              ชื่อจริง
            </label>

            <input
              type="text"
              id="firstName"
              name="firstName"
              className="inputOutline"
              placeholder="เช่น สมใจ"
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
              className="inputOutline"
              placeholder="เช่น รักษ์ดี"
              onChange={handleChange("lastName")}
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
              className="inputOutline"
              placeholder="เช่น มะลิ"
              onChange={handleChange("nickName")}
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
              onChange={handleChange("age")}
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
              value={values.sex}
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
            <label htmlFor="phoneNumber" className="inputLabel pb-0 text-sm">
              เบอร์โทร* (เป็นตัวเลขเท่านั้น)
            </label>

            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="inputOutline"
              placeholder="เช่น 0864213464"
              onChange={handleChange("phoneNumber")}
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
              className="inputOutline"
              placeholder="เช่น malila"
              onChange={handleChange("lineId")}
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
              className="inputOutline"
              placeholder="บอกคลินิกเพิ่มเเช่น เรื่องที่ควรระวัง หรือส่วนที่ต้องดูแลเป็นพิเศษ"
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
