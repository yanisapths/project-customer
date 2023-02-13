import React, { Component } from "react";
import PreviousButton from "../OLButton/PreviousButton";
import ContinueButton from "../OLButton/ContinueButton";
import SmallCalendar from "../OLCalendar/SmallCalendar";

import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import "react-datepicker/dist/react-datepicker.css";

export class DateAndTime extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  previous = (e) => {
    e.preventDefault();
    this.props.prevStep();
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
        <div className="pt-10 px-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 pb-6 flex justify-center">
            <SmallCalendar
              currentDate={currentDate}
              today={today}
              setToday={setToday}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              availables={availables}
              getSelectedDate={getSelectedDate}
            />
            {values.appointmentDate && values.appointmentTime ? (
              <div className="text-center whitespace-nowrap space-x-4 flex w-fit px-4 rounded-lg text-[#005844] body1 bg-[#ACDED5]/30">
                <FormControl>
                  <Controller
                    control={control}
                    name="appointmentDate"
                    render={({ field: { onChange, value } }) => (
                      <div>
                        <strong
                          className="body1 pt-2"
                          onChange={onChange}
                        >
                          {new Date(values.appointmentDate).toDateString()}
                        </strong>
                      </div>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    control={control}
                    name="appointmentTime"
                    render={({ field: { onChange, value } }) => (
                      <div className="">
                        <strong
                          className="body1 pt-2"
                          onChange={onChange}
                        >
                          {new Date(values.appointmentTime).toLocaleTimeString(
                            "en-EN",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}{" "}
                          -{" "}
                        </strong>
                      </div>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    control={control}
                    name="endTime"
                    render={({ field: { onChange, value } }) => (
                      <div className="">
                        <div className="">
                          <strong
                            className="body1 pt-2"
                            onChange={onChange}
                          >
                            {new Date(values.endTime).toLocaleTimeString("en-EN", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </strong>
                        </div>
                      </div>
                    )}
                  />
                </FormControl>
              </div>
            ) : (
              <></>
            )}
          </div>
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
        <div className="flex justify-between pt-12">
          <PreviousButton handleClick={this.previous} />
          <ContinueButton handleClick={this.continue} />
        </div>
      </div>
    );
  }
}

export default DateAndTime;
