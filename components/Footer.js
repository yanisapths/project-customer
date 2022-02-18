import React from 'react'
import {
    HomeIcon,
    PlusCircleIcon,
    UserGroupIcon,
    CalendarIcon,
} from '@heroicons/react/solid';

function Footer() {
  return (
      <footer className="fixed bottom-0 inset-x-0  bg-white flex justify-between text-teal-900 font-extrabold shadow-black shadow-md md:rounded-t-full rounded-t-2xl">
                <a href="/" className="a">
                <HomeIcon  className="footer-icon"/>หน้าหลัก
                </a>
                <a href="#" className="a">
                <PlusCircleIcon  className="footer-icon"/>สร้างนัด
                </a>
                <a href="/family/" className="a">
                <UserGroupIcon  className="footer-icon"/>ครอบครัว
                </a>
                <a href="#" className="a">
                <CalendarIcon  className="footer-icon"/>ตารางนัด
                </a>
      </footer>
   
  )
}

export default Footer
