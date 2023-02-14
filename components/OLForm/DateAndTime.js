import React, { Component } from "react";
import PreviousButton from "../OLButton/PreviousButton";
import ContinueButton from "../OLButton/ContinueButton";
import SmallCalendar from "../OLCalendar/SmallCalendar";

import { toast } from "react-hot-toast";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import "react-datepicker/dist/react-datepicker.css";

export class DateAndTime extends Component {
  continue = (e) => {
    e.preventDefault();

    if (this.props.handleDateValidation() == true) {
      this.props.nextStep();
    } else {
      toast.error("กรุณาเลือกวันเวลานัด");
    }
  };
  previous = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  removeDate = (e) => {
    e.preventDefault();
    this.props.removeSelectedDate();
  };
  render() {
    const {
      values,
      handleChange,
      currentDate,
      selectedDate,
      today,
      setToday,
      setSelectedDate,
      control,
      availables,
      getSelectedDate,
    } = this.props;
    return (
      <div>
        <div className="flex justify-between align-middle items-center">
          <p className="h5 tracking-wide font-semibold text-[#005844]">
            เลือกวันและเวลา
          </p>
        </div>
        <div className="pt-10 px-8">
          <div className="col-span-6 pb-6 flex justify-center">
            <SmallCalendar
              currentDate={currentDate}
              today={today}
              setToday={setToday}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              availables={availables}
              getSelectedDate={getSelectedDate}
              values={values}
              removeDate={this.removeDate}
            />
          </div>
            <p className="caption tracking-wide text-[#005844] py-2">
              หรือ กำหนดเอง
            </p>
          <div className="pt-2 grid grid-cols-6 gap-6">
            <div className="col-span-3">
              <label
                htmlFor="appointmentDate"
                className="inputLabel pb-0 text-sm"
              >
                วัน
              </label>
              <FormControl>
                <Controller
                  control={control}
                  name="appointmentDate"
                  render={({ field: { onChange, value } }) => (
                    <ReactDatePicker
                      className="inputOutline"
                      onChange={onChange}
                      selected={value}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className="col-span-3">
              <label
                htmlFor="appointmentTime"
                className="inputLabel pb-0 text-sm"
              >
                เวลา
              </label>
              <FormControl>
                <Controller
                  control={control}
                  name="appointmentTime"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      onChange={onChange}
                      className="inputOutline"
                      selected={value}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  )}
                />
              </FormControl>
            </div>
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

export default DateAndTime;
