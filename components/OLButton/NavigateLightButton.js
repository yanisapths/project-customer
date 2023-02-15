import React from "react";
import { useRouter } from "next/router";

function NavigateLightButton({ text, path }) {
  const router = useRouter();

  const navigate = (e) => {
    e.preventDefault();
    router.push(path);
  };
  return (
    <button
      onClick={navigate}
      className="cursor-pointer text-center rounded-full font-bold border-[#ACDED5]/20 hover:bg-[#ACDED5]/20 text-[#005844] shadow-lg hover:shadow-[#ACDED5]
   w-40 h-12 text-sm"
    >
      {text}
    </button>
  );
}

export default NavigateLightButton;
