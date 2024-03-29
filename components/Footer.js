import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { HomeIcon, CalendarIcon } from "@heroicons/react/solid";
import Link from "next/link";

function Footer() {
  const list = [
    {
      id: "home",
      title: "หน้าหลัก",
      icon: <HomeIcon className="footer-icon" />,
      path: "/",
    },
    {
      id: "schedule",
      title: "ตารางนัด",
      icon: <CalendarIcon className="footer-icon" />,
      path: "/schedule",
    },
    {
      id: "account",
      title: "บัญชี",
      icon: <PersonIcon className="footer-icon" />,
      path: "/account",
    },
  ];

  return (
    <footer className="fixed bottom-5 inset-x-0 flex justify-between shadow-black/10 shadow-3xl rounded-full mx-8 md:mx-40 lg:mx-60 xl:mx-96 bg-[#FDFFF5]">
      {list.map((item) => (
        <Link href={item.path} key={item.id}>
          <footer-container>
            <div className="footer-icon">{item.icon}</div>
            <p className="caption lg:caption xl:body2">{item.title}</p>
          </footer-container>
        </Link>
      ))}
    </footer>
  );
}

export default Footer;
