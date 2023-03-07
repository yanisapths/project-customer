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
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="lg:px-20 text-start">
            <p className="h5 tracking-wide font-semibold text-[#005844]">
              ตรวจสอบข้อมูลการนัดหมาย
            </p>
            <div className="pt-4">
              <div className="py-2">
                <p className="caption tracking-wide text-black/50">
                  (ชื่อเล่น) ชื่อ-นามสกุล
                </p>
                <p className="body1 tracking-wide text-[#005844] truncate">
                  คุณ ( {nickName} ) {firstName} {lastName}
                </p>
              </div>
              <div className="">
                <p className="caption tracking-wide text-black/50">
                  ข้อมูลส่วนตัว
                </p>
                <div className="grid grid-cols-2">
                  <p className="body1 tracking-wide text-[#005844]">
                    <span className="text-black/50 caption tracking-wide">
                      อายุ:{" "}
                    </span>{" "}
                    {age}
                  </p>
                  <p className="body1 tracking-wide text-[#005844]">
                    <span className="text-black/50 caption tracking-wide">
                      เพศ:{" "}
                    </span>{" "}
                    {sex}
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="body1 tracking-wide text-[#005844]">
                    <span className="text-black/50 caption tracking-wide">
                      LINE ID:{" "}
                    </span>{" "}
                    {lineId}
                  </p>
                  <p className="body1 tracking-wide text-[#005844]">
                    <span className="text-black/50 caption tracking-wide">
                      ติดต่อ:{" "}
                    </span>{" "}
                    {phoneNumber}
                  </p>
                </div>
              </div>
              <div className="py-2">
                <p className="caption tracking-wide text-black/50">
                  วันและเวลานัด
                </p>
                {appointmentDate && (
                  <p className="body1 tracking-wide text-[#005844]">
                    {new Date(appointmentDate).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    {new Date(appointmentTime).toLocaleTimeString("th-TH", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(endTime).toLocaleTimeString("th-TH", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>{" "}
              <div className="grid grid-cols-2">
                <div className="py-2">
                  <p className="caption tracking-wide text-black/50">
                    สถานที่นัด
                  </p>
                  <p className="body1 tracking-wide text-[#005844]">
                    {appointmentPlace}
                  </p>
                </div>
                <div className="py-2">
                  <p className="caption tracking-wide text-black/50">คอร์ส</p>
                  {courses.map((input) =>
                    input._id == course_id ? (
                      <p className="body1 tracking-wide text-[#005844]">
                        {input.courseName}
                      </p>
                    ) : (
                      ""
                    )
                  )}
                  {course_id == "ตรวจร่างกาย" ? (
                    <p className="body1 tracking-wide text-[#005844]">
                      ตรวจร่างกาย
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {location && (
              <p className="body1 tracking-wide text-[#005844] truncate">
                <p className="body1 tracking-wide caption  text-black/50">
                  ที่อยู่
                </p>
                {location}
              </p>
            )}
            {staff != "none" && (
              <div className="py-2">
                <p className="caption tracking-wide text-black/50">พนักงาน</p>
                {staffs.map(
                  (input) =>
                    input._id == staff && (
                      <p
                        key={input._id}
                        className="body1 tracking-wide text-[#005844]"
                      >
                        ( {input.nickName} ) {input.firstName} {input.lastName}
                      </p>
                    )
                )}
              </div>
            )}
            <div className="py-2">
              <p className="caption tracking-wide text-black/50">
                รายละเอีดเพิ่มเติม
              </p>
              <p className="body1 tracking-wide text-[#005844] truncate">
                {description}
              </p>
            </div>
          </div>
          <div className="flex justify-between pt-12 align-middle items-center">
            <PreviousButton handleClick={this.previous} />
            <CircleTextButton
              text="ยืนยัน"
              type="submit"
              handleClick={handleSubmit}
            />
            {success == "true" && this.props.nextStep()}
          </div>
        </div>
      </form>
    );
  }
}

export default ContinueAndReview;
