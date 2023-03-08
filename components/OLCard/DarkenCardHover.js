import React from "react";

function DarkenCardHover({ title, subtitle, desc, img }) {
  return (
    <a href="#" className="group relative block bg-black rounded-md">
      <img
        alt="Developer"
        src={img}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-24">
        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
          {subtitle}
        </p>

        <p className="text-xl font-bold text-white sm:text-2xl">{title}</p>

        <div className="mt-32 sm:mt-48 lg:mt-[350px]">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white lg:text-lg">{desc}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default DarkenCardHover;
