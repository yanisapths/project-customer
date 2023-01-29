import React from "react";
import Image from "next/image";
import Link from "next/link";
import VerifiedIcon from '@mui/icons-material/Verified';
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[10],
    fontSize: 14,
    borderRadius: 12,
    p:8
  },
}));

function MediumCard({
  imageUrl,
  clinic_name,
  address,
  description,
  price,
  _id,
  approvalStatus
}) {
  return (
    <div
      className="cursor-pointer hover:scale-105 bg-white
    transform transition duration-300 ease-out pb-6 rounded-xl shadow-lg mb-6"
    >
      <div className="relative h-60 w-50 md:w-100 md:h-80 flex-shrink-0">
        <Link href={`/clinic/${_id}`}>
          <a>
            <Image src={imageUrl} layout="fill" className="rounded-xl" />
          </a>
        </Link>
      </div>
      <div className="px-4 pt-4">
        <p className="text-xl mt-2 font-bold text-[#005844]">{clinic_name}
        {approvalStatus == "Authorized" ? <span className="px-2"><CustomTooltip title="Verified Clinic" placement="top"><VerifiedIcon className="text-[#7bc6b7]" /></CustomTooltip></span>:"" }</p>
        <p className="body1 mt-2 pr-20 text-black/50 text-overflow text-ellipsis">
          {address}
        </p>
        <div className="flex justify-end px-4">
          <Link href={`/clinic/${_id}`}>
            <a>
              <div className="py-2 w-24 ml-10 text-white text-center rounded-3xl bg-[#7bc6b7] hover:bg-[#7bc6b7]/80">
                <p className="body2 ">ดูเพิ่มเติม</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default MediumCard;
