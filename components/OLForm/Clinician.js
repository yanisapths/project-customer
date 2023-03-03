import React, { Component } from "react";
import PreviousButton from "../OLButton/PreviousButton";
import ContinueButton from "../OLButton/ContinueButton";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export class Clinician extends Component {
  previous = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  render() {
    const { values, handleChange, staffs, control } = this.props;
    return (
      <div className="">
        <div className="flex justify-between align-middle items-center">
          <p className="h5 tracking-wide font-semibold text-[#005844]">
            เลือกนักกายภาพ
          </p>
        </div>
        <div className="pt-10 md:px-8">
          <label htmlFor="course" className="inputLabel">
            นักกายภาพ
          </label>
          <Select
            sx={{
              borderRadius: "40px",
              height: "60px",
              "@media (min-width: 780px)": {
                width: "420px",
              },
              width: "280px",
            }}
            value={values.staff}
            defaultValue={values.staff}
            onChange={handleChange("staff")}
          >
            <MenuItem value="none">ไม่เลือก</MenuItem>
            {staffs?.map((input, index) => (
              <MenuItem
                key={index}
                value={input._id}
                placeholder={
                  values.staff ? (
                    values.staff == input.staff ? (
                      <p>
                        ( {input.nickName} ) {input.firstName} {input.lastName}
                      </p>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )
                }
              >
                ( {input.nickName} ) {input.firstName} {input.lastName}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex justify-between pt-12">
          <PreviousButton handleClick={this.previous} />
          <ContinueButton handleClick={this.continue} />
        </div>
      </div>
    );
  }
}

export default Clinician;
