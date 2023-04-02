import React, { Component } from "react";
import Clinician from "./Clinician";
import ContactInformation from "./ContactInformation";
import ContinueAndReview from "./ContinueAndReview";
import CourseService from "./CourseService";
import DateAndTime from "./DateAndTime";
import Location from "./Location";
import Success from "./Success";

import axios from "axios";
import { toast } from "react-hot-toast";

export class RequestForm extends Component {
  state = {
    step: 1,
    success: "false",
    errors: {},
    success: "false",
    firstName: this.props.accountProfile.firstName,
    lastName: this.props.accountProfile.lastName,
    nickName: this.props.accountProfile.nickName,
    phoneNumber: this.props.accountProfile.phoneNumber,
    customer_id: "",
    clinicName: "",
    appointmentDate: "",
    appointmentTime: "",
    endTime: "",
    appointmentPlace: "คลินิก",
    course_id: "",
    description:this.props.accountProfile.description,
    location: "",
    lineId: this.props.accountProfile.lineId,
    sex: this.props.accountProfile.sex,
    age: this.props.accountProfile.age,
    staff: "none",
    owner_id: this.props.ownerId,
    clinic_id: this.props.clinicId,
    customer_id: this.props.customerId,
    clinicName: this.props.clinicName,
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
      if (!this.state.phoneNumber.match(/^([0-9]\d*)(\.\d+)?$/)) {
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

  handleSubmit = event => {
    event.preventDefault();
    const clinicId = this.props.clinicId;
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
    const url = `${process.env.dev}/appointment/create/${clinicId}`;
    console.log(url)
    console.log(values);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    console.log(values)
    //  axios.post(
    //     `${process.env.dev}/appointment/create/${clinicId}`,
    //     values,
    //     axiosConfig
    //   )
    //   .then(async (res) => {
    //     console.log("RESPONSE RECEIVED: ", res.data);
    //     toast.success("สร้างนัดสำเร็จ");
    //     this.setState({ success: "true" });
    //   })
    //   .catch((err) => {
    //     console.log("AXIOS ERROR: ", err);
    //     this.setState({ success: "error" });
    //     toast.error("ไม่สามารถสร้างนัดได้");
    //   });
  }

  render() {
    const { step,success } = this.state;
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
      accountProfile
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
            accountProfile={accountProfile}
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
