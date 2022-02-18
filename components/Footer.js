import React from 'react'
import {
    HomeIcon,
    PlusCircleIcon,
    UserGroupIcon,
    CalendarIcon,
} from '@heroicons/react/solid';
import Link from "next/link"

function Footer() {
  return (
      <footer className="fixed bottom-0 inset-x-0  bg-white flex justify-between text-teal-900 font-extrabold shadow-black shadow-md md:rounded-t-full rounded-t-2xl">
                <Link href="/" className="a">
                <HomeIcon  className="footer-icon"/>หน้าหลัก
                </Link>
                <Link href="/" className="a">
                <PlusCircleIcon  className="footer-icon"/>สร้างนัด
                </Link>
                <Link href="/family/" className="a">
                <UserGroupIcon  className="footer-icon"/>ครอบครัว
                </Link>
                <Link href="/" className="a">
                <CalendarIcon  className="footer-icon"/>ตารางนัด
                </Link>
      </footer>
   
  )
}

export default Footer
