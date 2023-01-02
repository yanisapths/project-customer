import React from "react";
import Image from "next/image";
import Link from "next/link";

function MediumCard({
  imageUrl,
  clinic_name,
  address,
  description,
  price,
  _id,
}) {
  return (
    <div
      className="cursor-pointer hover:scale-105
    transform transition duration-300 ease-out pb-6 rounded-xl shadow-xl mb-6"
    >
      <div className="relative h-60 w-50 md:w-100 md:h-80 flex-shrink-0">
        <Link href={`/clinic/${_id}`}>
          <a>
          <Image src={imageUrl} layout="fill" className="rounded-xl" />
          </a>
        </Link>
      </div>
      <div className="px-4 pt-4 ">
        <p className="text-xl mt-2 font-bold">{clinic_name}</p>
        <p className="text-sm mt-2 pr-20 text-gray-500 text-overflow text-ellipsis">
          {address}
        </p>
        <p className="text-sm mt-1 md:mt-2 text-gray-800 font-semibold">
          {price}฿/Day
        </p>
      </div>
    </div>
  );
}
export default MediumCard;
