import React from "react";

import {
  HomeIcon,
  PlusCircleIcon,
  UserGroupIcon,
  CalendarIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

function Footer() {
  return (
    <footer className="fixed font-noto bottom-0 inset-x-0 text-sm md:text-lg text-teal-500 flex justify-between  font-extraboldfixed  shadow-black/10 shadow-3xl bg-white">
      <Link href="/" className="b">
        <b>
          <HomeIcon className="footer-icon" />
          หน้าหลัก
        </b>
      </Link>
      <Link href="/schedule/" className="b">
        <b>
          <CalendarIcon className="footer-icon" />
          ตารางนัด
        </b>
      </Link>
    </footer>
  );
}

export default Footer;
