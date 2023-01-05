import React, { useState, useEffect } from "react";
import BannerCard from "../../../components/OLCard/BannerCard";
import Tabs from "../../../components/Tabs";
import SimpleChip from "../../../components/OLChip/SimpleChip";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";

const courses = [
  {
    id: 1,
    courseName: "ลดปวดเบสิก",
    amount: "1",
    duration: "2",
    totalPrice: "3270",
    procedures: [
      {
        procedureName: "Ultrasound",
        price: "1590",
      },
      {
        procedureName: "Laser",
        price: "990",
      },
      {
        procedureName: "จัดกระดูกและนวดศรีษะ",
        price: "690",
      },
    ],
  },
  {
    id: 2,
    courseName: "ลดปวดเบสิก",
    amount: "1",
    duration: "2",
    totalPrice: "3270",
    procedures: [
      {
        procedureName: "Ultrasound",
        price: "1590",
      },
      {
        procedureName: "Laser",
        price: "990",
      },
      {
        procedureName: "จัดกระดูกและนวดศรีษะ",
        price: "690",
      },
    ],
  },
  {
    id: 3,
    courseName: "ลดปวดเบสิก",
    amount: "1",
    duration: "2",
    totalPrice: "3270",
    procedures: [
      {
        procedureName: "Ultrasound",
        price: "1590",
      },
      {
        procedureName: "Laser",
        price: "990",
      },
      {
        procedureName: "จัดกระดูกและนวดศรีษะ",
        price: "690",
      },
    ],
  },
];

const reviews = [
  {
    id: 1,
    customerName: "ปานฤทัย",
    comments: "ยอดเยี่ยม ดีมาก ดีเลิศ",
  },
];

function ListView({ data }) {
  const theme = useTheme();
  const [selected, setSelected] = useState("");
  const [view, setView] = useState([]);
  const router = useRouter();
  const { cid, clinic_name, owner_id } = router.query;
  console.log(data);

  const list = [
    {
      id: "courses",
      title: "All Courses",
    },
    {
      id: "reviews",
      title: "Reviews",
    },
  ];

  useEffect(() => {
    switch (selected) {
      case "courses":
        setView(courses);
        break;
      case "reviews":
        setView(reviews);
        break;
      default:
        setView(courses);
    }
  }, [selected]);

  return (
    <>
      <section className="pt-10 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-6 md:ml-8 md:w-4/6 border-black/20  border-b-[1px] border-dashed">
        {list.map((item) => (
          <div key={item.id} className="inline-flex">
            <div className="relative block">
              <Tabs
                title={item.title}
                active={selected === item.id}
                setSelected={setSelected}
                id={item.id}
                key={item.id}
              />
            </div>
          </div>
        ))}
      </section>
      <div className="pt-4 md:grid md:grid-cols-3">
        {selected == "reviews"
          ? view?.map(({ id, customerName, comments }) => (
              <div className="mx-4 space-y-4" key={id}>
                <p>Review</p>
              </div>
            ))
          : view?.map(
              ({
                id,
                courseName,
                amount,
                duration,
                totalPrice,
                procedures,
              }) => (
                <div key={id}>
                  <div
                    className="cursor-pointer mx-4 space-y-4 pb-4"
                    onClick={() =>
                      router.push({
                        pathname: `/course/${id}`,
                        query: {
                          id: id,
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
                      <SimpleChip
                        prefix="ราคา"
                        text={totalPrice}
                        quantify="บาท"
                      />
                      <SimpleChip text={duration} quantify="ชั่วโมง" />
                      <SimpleChip text={amount} quantify="ครั้ง" />
                    </div>
                    <div className="mx-2 md:pt-2">
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.info.main }}
                      >
                        ดูเพิ่มเติม
                      </Typography>
                    </div>
                  </div>
                </div>
              )
            )}
      </div>
    </>
  );
}

export default ListView;
