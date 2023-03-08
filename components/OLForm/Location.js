import React, { Component } from "react";
import PreviousButton from "../OLButton/PreviousButton";
import ContinueButton from "../OLButton/ContinueButton";

import { toast } from "react-hot-toast";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const places = [
  { id: 1, label: "คลินิก" },
  { id: 2, label: "บ้าน" },
];

export class Location extends Component {
  continue = (e) => {
    e.preventDefault();
    const { appointmentPlace } = this.props;
    if (
      this.props.handleLocationValidation() == true ||
      appointmentPlace != "บ้าน"
    ) {
      this.props.nextStep();
    } else {
      toast.error("กรุณาใส่ที่อยู่");
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
            เลือกสถานที่
          </p>
        </div>
        <div className="pt-10 md:px-8 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label htmlFor="appointmentPlace" className="inputLabel">
              สถานที่นัดหมาย
            </label>
            <Select
              sx={{
                borderRadius: "40px",
                height: "60px",
                "@media (min-width: 780px)": {
                  width: "420px",
                },
                width: "330px",
              }}
              value={values.appointmentPlace}
              defaultValue={values.appointmentPlace}
              onChange={handleChange("appointmentPlace")}
            >
              {places?.map((input, key) => (
                <MenuItem key={key} value={input.label}>
                  {input.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        {values.appointmentPlace == "บ้าน" && (
          <div className="pt-10 px-2 grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label htmlFor="location" className="inputLabel">
                ที่อยู่ (บ้านเลขที่, หมู่, ตรอกซอย, ถนน) เขต/อำเภอ แขวง/ตำบล
                จังหวัด<span className="text-[#FF2F3B]"> * </span>
                <span className="text-[#FF2F3B] text-xs">(จำเป็น)</span>
              </label>

              <input
                type="text"
                id="location"
                name="location"
                className="inputOutline py-4"
                placeholder="เช่น 24/1 ม.6 ถ.บ่อปลาน้อย ต.สุเทพ อ.เมือง จ.เชียงใหม่"
                onChange={handleChange("location")}
                required={values.appointmentPlace == "บ้าน" ? true : false}
              />
            </div>
          </div>
        )}
        <div className="flex justify-between pt-12">
          <PreviousButton handleClick={this.previous} />
          <ContinueButton handleClick={this.continue} />
        </div>
      </div>
    );
  }
}

export default Location;
