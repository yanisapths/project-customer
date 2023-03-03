import React, { Component } from "react";
import NavigateTextButton from "../OLButton/NavigateTextButton";
import NavigateLightButton from "../OLButton/NavigateLightButton";

export class Success extends Component {
  render() {
    return (
      <div className="text-center">
        <p className="h3">🎉</p>
        <p className="h4 pt-2 tracking-wide font-semibold text-[#005844]">
          นัดหมายถูกส่งแล้ว
        </p>
        <p className="body1 pt-2 tracking-wide text-[#005844]/50">
          กรุณารอการยืนยันจากคลินิก
        </p>
        <div className="pt-12">
          <NavigateTextButton text="กลับสู่หน้าหลัก" path="/" />
        </div>
        <div className="pt-6">
        <NavigateLightButton text="ดูนัดของฉัน" path="/schedule" />
        </div>
      </div>
    );
  }
}

export default Success;
