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
  type
}) {
  const theme = useTheme();
  const router = useRouter();
  const { cid, clinic_name, owner_id } = router.query;

  return (
    <>
      <Box
        className="cursor-pointer rounded-2xl shadow-xl pb-6 mx-auto overflow-x-auto"
        sx={{ bgcolor: theme.palette.background.base, height: "260px" }}
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
          type={type}
        />
        <div className="flex space-x-2 px-6 lg:px-10 pb-6 xl:px-10">
          <SimpleChip prefix="ราคา" text={totalPrice} quantify="บาท" />
          <SimpleChip text={duration} quantify="ชั่วโมง" />
          <SimpleChip text={amount} quantify="ครั้ง" />
        </div>
        <div className="flex justify-end px-4 md:px-8">
          <div className="py-2 w-24 ml-10 text-white text-center rounded-3xl bg-[#7bc6b7] hover:bg-[#7bc6b7]/80">
            <p className="body2 ">ดูเพิ่มเติม</p>
          </div>
        </div>
      </Box>
    </>
  );
}

export default CourseListView;
