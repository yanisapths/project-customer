import React from "react";
import { useRouter } from "next/router";

function NavigateBack({path}) {
  const router = useRouter();

  const navigateBack = (e) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <p
      className="caption lg:body1 lg:pl-6 tracking-wide text-black/50 cursor-pointer hover:text-[#0921FF]"
      onClick={navigateBack}
    >
      ย้อนกลับ
    </p>
  );
}

export default NavigateBack;
