import React, { Component } from "react";
import PreviousButton from "../OLButton/PreviousButton";
import CircleTextButton from "../OLButton/CircleTextButton";

export class ContinueAndReview extends Component {
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
      courses,
      staffs,
      handleSubmit,
      success,
      values: {
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
      },
    } = this.props;
    return (
      <div className="text-center">
        <p className="h5 tracking-wide font-semibold text-[#005844]">
          ตรวจสอบข้อมูลของคุณ
        </p>
        <div className="pt-4">
          <div className="py-2">
            <p className="caption tracking-wide text-black/50">
              (ชื่อเล่น) ชื่อ-นามสกุล
            </p>
            <p className="body1 tracking-wide font-semibold text-[#005844]">
              คุณ ( {nickName} ) {firstName} {lastName}
            </p>
          </div>
          <div className="">
            <p className="caption tracking-wide text-black/50">ข้อมูลส่วนตัว</p>
            <p className="body1 tracking-wide font-semibold text-[#005844]">
             <span className="text-[#005844] caption tracking-wide">อายุ: </span> {age}
            </p>
            <p className="body1 tracking-wide font-semibold text-[#005844]">
            <span className="text-[#005844] caption tracking-wide">เพศ: </span> {sex}
            </p>
            <p className="body1 tracking-wide font-semibold text-[#005844]">
            <span className="text-[#005844] caption tracking-wide">LINE ID: </span> {lineId}
            </p>
            <p className="body1 tracking-wide font-semibold text-[#005844]">
            <span className="text-[#005844] caption tracking-wide">ติดต่อ: </span> {phoneNumber}
            </p>
            {location && (
              <p className="body1 tracking-wide font-semibold text-[#005844]">
                ที่อยู่ {location}
              </p>
            )}
          </div>
          <div className="py-2">
            <p className="caption tracking-wide text-black/50">วันและเวลานัด</p>
            {appointmentDate && (
              <p className="body1 tracking-wide font-semibold text-[#005844]">
                {new Date(appointmentDate).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                <span>
                  {" "}
                  {new Date(appointmentTime).toLocaleTimeString("th-TH", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(endTime).toLocaleTimeString("th-TH", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            )}
          </div>{" "}
          <div className="py-2">
            <p className="caption tracking-wide text-black/50">สถานที่นัด</p>
            <p className="body1 tracking-wide font-semibold text-[#005844]">
              {appointmentPlace}
            </p>
          </div>
        </div>
        <div className="py-2">
          <p className="caption tracking-wide text-black/50">คอร์ส</p>
          {courses.map((input) =>
            input._id == course_id ? (
              <p className="body1 tracking-wide font-semibold text-[#005844]">
                {input.courseName}
              </p>
            ) : (
              ""
            )
          )}
        </div>
        <div className="py-2">
          <p className="caption tracking-wide text-black/50">พนักงาน</p>
          {staffs.map(
            (input) =>
              input._id == staff &&
              staff != "none" && (
                <p className="body1 tracking-wide font-semibold text-[#005844]">
                  ( {input.nickName} ) {input.firstName} {input.lastName}
                </p>
              )
          )}
          {staff == "none" && (
            <p className="body1 tracking-wide font-semibold text-[#005844]">
              {staff}
            </p>
          )}
        </div>
        <div className="flex justify-between pt-12 align-middle">
          <PreviousButton handleClick={this.previous} />
          <CircleTextButton text="ยืนยัน" handleClick={handleSubmit} />
          {success == "true" && this.props.nextStep()}
        </div>
      </div>
    );
  }
}

export default ContinueAndReview;
