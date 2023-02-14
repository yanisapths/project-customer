import React, { Component } from "react";
import Clinician from "./Clinician";
import ContactInformation from "./ContactInformation";
import ContinueAndReview from "./ContinueAndReview";
import CourseService from "./CourseService";
import DateAndTime from "./DateAndTime";
import Location from "./Location";
import Success from "./Success";

export class RequestForm extends Component {
  state = {
    step: 1,
    errors: {},
    firstName: "",
    lastName: "",
    nickName: "",
    phoneNumber: "",
    customer_id: "",
    clinicName: "",
    appointmentDate: "",
    appointmentTime: "",
    endTime: "",
    appointmentPlace: "",
    course_id: "",
    description: "",
    owner_id: "",
    location: "",
    lineId: "",
    sex: "",
    age: "",
    staff: "",
  };
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  getSelectedDate = (slotDate, slotTime, slotEndTime) => {
    this.setState({
      appointmentDate: slotDate,
      appointmentTime: slotTime,
      endTime: slotEndTime,
    });
  };

  removeSelectedDate = () => {
    this.setState({
      appointmentDate: "",
      appointmentTime: "",
      endTime: "",
    });
  };

  handleCourseValidation = () => {
    let formIsValid = true;
    let errors = {};
    //course_id
    if (!this.state.course_id) {
      formIsValid = false;
      errors["course_id"] = "กรุณาเลือกคอร์ส";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  handlePhoneValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (typeof this.state.phoneNumber !== "undefined") {
      if (!this.state.phoneNumber.match(/^(0|[1-9]\d*)(\.\d+)?$/)) {
        formIsValid = false;
        errors["phoneNumber"] = "กรุณาใส่ตัวเลขเท่านั้น";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  handlePlaceValidation = () => {
    let formIsValid = true;
    let errors = {};

    if (!this.state.appointmentPlace) {
      formIsValid = false;
      errors["appointmentPlace"] = "กรุณาเลือกสถานที่";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  handleDateValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (!this.state.appointmentDate) {
      formIsValid = false;
      errors["appointmentDate"] = "กรุณาเลือกวันเวลานัด";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  handleLocationValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (!this.state.location) {
      formIsValid = false;
      errors["location"] = "กรุณาใส่ที่อยู่";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      nickName,
      lineId,
      age,
      sex,
      phoneNumber,
      customer_id,
      clinicName,
      appointmentDate,
      appointmentPlace,
      appointmentTime,
      endTime,
      course_id,
      description,
      owner_id,
      location,
      staff,
      errors,
    } = this.state;
    const values = {
      firstName,
      lastName,
      nickName,
      lineId,
      age,
      sex,
      phoneNumber,
      customer_id,
      clinicName,
      appointmentDate,
      appointmentPlace,
      appointmentTime,
      endTime,
      course_id,
      description,
      owner_id,
      location,
      staff,
      errors,
    };
    const {
      control,
      courses,
      currentDate,
      selectedDate,
      today,
      setToday,
      setSelectedDate,
      availables,
      staffs,
      success,
      handleSubmit,
    } = this.props;
    switch (step) {
      case 1:
        return (
          <CourseService
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            courses={courses}
            handleCourseValidation={this.handleCourseValidation}
          />
        );
      case 2:
        return (
          <Location
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            handleLocationValidation={this.handleLocationValidation}
            appointmentPlace={appointmentPlace}
          />
        );
      case 3:
        return (
          <DateAndTime
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            currentDate={currentDate}
            today={today}
            setToday={setToday}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            control={control}
            availables={availables}
            getSelectedDate={this.getSelectedDate}
            removeSelectedDate={this.removeSelectedDate}
            handleDateValidation={this.handleDateValidation}
          />
        );
      case 4:
        return (
          <ContactInformation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            handlePhoneValidation={this.handlePhoneValidation}
          />
        );
      case 5:
        return (
          <Clinician
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            staffs={staffs}
          />
        );

      case 6:
        return (
          <ContinueAndReview
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            courses={courses}
            staffs={staffs}
            handleSubmit={this.handleSubmit}
            success={success}
          />
        );
      case 7:
        return (
          <Success
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
    }
  }
}

export default RequestForm;
