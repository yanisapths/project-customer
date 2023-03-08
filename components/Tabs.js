import React from "react";

function Tabs({ id, title, setSelected, active }) {
  return (
    <div
      className="inline-flex justify-center items-center cursor-pointer pb-2 md:pb-8"
      onClick={() => setSelected(id)}
    >
      <span
        className={
          active
            ? "absolute inset-x-0 h-[0.5px] -bottom-1 bg-black w-4/6"
            : " inset-x-0 h-[0.5px] -bottom-1  bg-black"
        }
      ></span>
      <p
        className={
          active
            ? "text-md font-semibold md:text-xl text-[#121212] mr-20 md:mr-24"
            : "text-md font-regular md:text-xl text-black/50 mr-20 md:mr-24"
        }
      >
        {" "}
        {title}{" "}
      </p>
    </div>
  );
}

export default Tabs;
