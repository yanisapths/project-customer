import React from "react";
import { useRouter } from "next/router";
import BannerCard from "../../../components/OLCard/BannerCard";
import SimpleChip from "../../../components/OLChip/SimpleChip";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

function CourseListView({
  data,
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
      <Box
        className="cursor-pointer rounded-3xl shadow-xl"
        sx={{ bgcolor: theme.palette.background.base }}
        onClick={() =>
          router.push({
            pathname: `/course/${_id}`,
            query: {
              id: _id,
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
        <div className="flex space-x-2 px-2 pb-6">
          <SimpleChip prefix="ราคา" text={totalPrice} quantify="บาท" />
          <SimpleChip text={duration} quantify="ชั่วโมง" />
          <SimpleChip text={amount} quantify="ครั้ง" />
        </div>
        <Box
          sx={{ bgcolor: theme.palette.primary.main }}
          className="px-16 py-4 bottom-0 text-center rounded-3xl shadow-lg"
        >
          <p className="body2 text-white">ดูเพิ่มเติม</p>
        </Box>
      </Box>
    </>
  );
}

export default CourseListView;
