import React, { Component } from "react";
import ContinueButton from "../OLButton/ContinueButton"

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export class CourseService extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  render() {
    const {values,handleChange,courses} = this.props;
    return (
      <div className="">
        <div className="flex justify-between align-middle items-center">
          <p className="h5 tracking-wide font-semibold text-[#005844]">
            เลือกบริการ
          </p>
        </div>
        <div className="pt-10 px-8"> 
        <label htmlFor="course" className="inputLabel">
          คอร์ส*
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
          value={values.course_id}
          onChange={handleChange('course_id')}
        >
          {courses?.map((input, key) => (
            <MenuItem key={key} value={input._id}>
              {input.courseName}
            </MenuItem>
          ))}
        </Select>
        </div>
        <div className="flex justify-end pt-12">
         <ContinueButton handleClick={this.continue}/>
        </div>
      </div>
    );
  }
}

export default CourseService;
