import React from "react";
import { useRouter } from "next/router";
import BannerCard from "../../../components/OLCard/BannerCard";
import SimpleChip from "../../../components/OLChip/SimpleChip";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function CourseListView({
  _id,
  courseName,
  amount,
  duration,
  totalPrice,
  procedures,
}) {
  const theme = useTheme();
  const router = useRouter();
  const { cid, clinic_name, owner_id } = router.query;

  return (
    <>
      <div
        className="cursor-pointer mx-4 space-y-4 pb-4"
        onClick={() =>
          router.push({
            pathname: `/course/${courses._id}`,
            query: {
              id: courses._id,
              cid: cid,
              clinic_name: data.clinic_name,
              owner_id: data.owner_id,
            },
          })
        }
      >
        <BannerCard
          courseName={courseName}
          amount={amount}
          duration={duration}
          totalPrice={totalPrice}
          procedures={procedures}
        />
        <div className="flex space-x-2">
          <SimpleChip prefix="ราคา" text={totalPrice} quantify="บาท" />
          <SimpleChip text={duration} quantify="ชั่วโมง" />
          <SimpleChip text={amount} quantify="ครั้ง" />
        </div>
        <div className="mx-2 md:pt-2">
          <Typography variant="body2" sx={{ color: theme.palette.info.main }}>
            ดูเพิ่มเติม
          </Typography>
        </div>
      </div>
    </>
  );
}

export default CourseListView;
