import React from "react";
import { useRouter } from "next/router";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function NavigateBack({path}) {
  const router = useRouter();

  const navigateBack = (e) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <div className="rounded-full md:w-fit md:px-6 md:py-2 md:h-fit hover:bg-[#ACDED5]/20 hover:underline">
    <div className="flex align-middle items-center text-[#005844] cursor-pointer">
      <ArrowBackIosIcon />
    <p
      className="caption lg:body1 tracking-wide font-semibold"
      onClick={navigateBack}
    >
      ย้อนกลับ
    </p>
    </div>
    </div>
  );
}

export default NavigateBack;
