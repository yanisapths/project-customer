import React from 'react';
import Image from "next/image";
import Link from "next/link";

function MediumCard( {img, title, link} ) {
  return (
    <div className="cursor-pointer m-auto xl:space-x-16  hover:scale-105 transition transform duration-200 ease-out">
        <div className="relative h-80 w-80">
          <Link href={link} className="cursor-pointer ">
            <Image src={img} layout="fill" className="rounded-xl opacity-70" />
          </Link>
            <h3 className="relative text-center text-4xl font-extrabold m-auto pt-32 ">{title}</h3>
        </div>
    </div>
  );
}

export default MediumCard;