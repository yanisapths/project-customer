import React, { Component } from "react";
import PreviousButton from "../OLButton/PreviousButton";
import ContinueButton from "../OLButton/ContinueButton";
import SmallCalendar from "../OLCalendar/SmallCalendar";

import { toast } from "react-hot-toast";
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

  render() {
    const {
      values,
      currentDate,
      selectedDate,
      today,
      setToday,
      setSelectedDate,
      control,
      availables,
      getSelectedDate,
      handleChange,
      removeSelectedDate
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
              removeSelectedDate={removeSelectedDate}
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

export default DateAndTime;
