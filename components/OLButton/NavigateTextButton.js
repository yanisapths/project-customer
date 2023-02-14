import React from "react";
import { useRouter } from "next/router";

function NavigateTextButton({ text, path }) {
  const router = useRouter();

  const navigate = (e) => {
    e.preventDefault();
    router.push(path);
  };
  return (
    <button
      onClick={navigate}
      className="cursor-pointer text-center rounded-full font-bold hover:shadow-[#ACDED5]/30 hover:shadow-xl border border-[#7BC6B7] bg-[#7BC6B7] text-white hover:bg-transparent hover:text-[#7BC6B7] 
   w-40 h-12 text-sm"
    >
      {text}
    </button>
  );
}

export default NavigateTextButton;
