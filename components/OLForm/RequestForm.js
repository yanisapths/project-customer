import React, { Component } from 'react'
import ContactInformation from './ContactInformation';
import ContinueAndReview from './ContinueAndReview';
import CourseService from './CourseService';
import DateAndTime from './DateAndTime';
import Location from './Location';
import Success from './Success';

export class RequestForm extends Component {
    state = {
        step: 1,
        firstName: "",
        lastName: "",
        nickName: "",
        phoneNumber:"",
        customer_id: "",
        clinicName: "",
        appointmentDate: "",
        appointmentTime: "",
        endTime: "",
        appointmentPlace: "",
        course_id: "",
        description:"",
        owner_id: "",
        location: "",
        lineId: "",
        sex: "",
        age:"",
    }
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    }
    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    getSelectedDate = (slotDate, slotTime, slotEndTime) => {
      this.setState({
        appointmentDate: slotDate,
        appointmentTime: slotTime,
        endTime: slotEndTime
      });
   }


  render() {
    const {step} = this.state;
    const {firstName, lastName,nickName,lineId,age,sex,phoneNumber,customer_id,clinicName,appointmentDate,appointmentPlace,appointmentTime,endTime,course_id,description,owner_id,location} = this.state;
    const values = {firstName,lastName,nickName,lineId,age,sex,phoneNumber,customer_id,clinicName,appointmentDate,appointmentPlace,appointmentTime,endTime,course_id,description,owner_id,location}
    const {control,courses,currentDate,selectedDate,today,setToday,setSelectedDate,availables} = this.props;
    switch(step) {
        case 1: 
        return (
          <CourseService 
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            courses={courses}
            />
        )
        case 2: 
        return (
          <Location 
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            />
        )
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
            />
        )
        case 4: 
        return (
          <ContactInformation 
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            />
        )
        case 5: 
        return (
          <ContinueAndReview 
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            />
        )
        case 6: 
        return (
          <Success 
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            />
        )
    }
  }
}

export default RequestForm