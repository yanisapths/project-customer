import React from "react";
import Image from "next/image";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import { styled } from "@mui/material/styles";
import PlaceIcon from "@mui/icons-material/Place";
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
    p: 8,
  },
}));

function MediumCard({
  imageUrl,
  clinic_name,
  address,
  description,
  price,
  _id,
  approvalStatus,
}) {
  return (
    <div
      className="cursor-pointer hover:scale-105 min-w-full w-96 min-h-[350px] md:w-[350px] md:h-[400px] lg:h-[400px] 2xl:h-[450px] 2xl:w-[450px] hover:shadow-2xl
      transform transition duration-300 ease-out pb-32 rounded-xl"
    >
      <div className="relative h-4/6 lg:h-5/6 2xl:h5/6 w-full xl:h-60 2xl:h-72 flex-shrink-0">
        <Link href={`/clinic/${_id}`}>
          <a>
            <Image src={imageUrl} layout="fill" className="rounded-xl" />
          </a>
        </Link>
      </div>
      <div className="px-4 pt-4">
        <p className="2xl:text-xl text-lg mt-2 font-bold text-[#005844]">
          {clinic_name}
          {approvalStatus == "Authorized" ? (
            <span className="px-2">
              <CustomTooltip title="Verified Clinic" placement="top">
                <VerifiedIcon className="text-[#7bc6b7]" />
              </CustomTooltip>
            </span>
          ) : (
            ""
          )}
        </p>
        <p className="2xl:body1 body2 mt-2 pr-2 text-[#121212]/80 text-overflow text-ellipsis">
          <PlaceIcon fontSize="small" className="text-[#7bc6b7]" /> {address}
        </p>
        <div className="flex">
          <div className="absolute right-5 bottom-5">
            <Link href={`/clinic/${_id}`}>
              <a>
                <div className="py-2 w-24 text-white text-center rounded-3xl bg-[#7bc6b7] hover:bg-[#7bc6b7]/80">
                  <p className="body2">ดูเพิ่มเติม</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MediumCard;
