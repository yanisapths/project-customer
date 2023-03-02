import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import Link from "next/link";

function InfoCard({ imageUrl, address, clinic_name, description, price, _id }) {
  return (
    <div
      className="px-8 bg-white flex py-14 pr-4 cursor-pointer mb-4
    hover:opacity-80 hover:shadow-lg
    transition duration-200 ease-in-out"
    >
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          src={imageUrl}
          layout="fill"
          objectfit="cover"
          className="rounded-2xl"
        />
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p className="caption">{address}</p>
          <HeartIcon className="h-7 cursor-pointer " />
        </div>

        <h4 className="text-xl">{clinic_name}</h4>
        <p className="pt-2 text-sm text-teal-600 text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex justify-end px-4 pt-4">
          <Link href={`/clinic/${_id}`}>
              <div className="py-2 w-24 ml-10 text-white text-center rounded-3xl bg-[#7bc6b7] hover:bg-[#7bc6b7]/80">
                <p className="body2">ดูเพิ่มเติม</p>
              </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
