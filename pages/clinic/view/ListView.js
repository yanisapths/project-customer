import React, { useState, useEffect } from "react";
import Tabs from "../../../components/Tabs";
import { useTheme } from "@mui/material/styles";
import CourseListView from "./CourseListView";

const reviews = [
  {
    id: 1,
    customerName: "ปานฤทัย",
    comments: "ยอดเยี่ยม ดีมาก ดีเลิศ",
  },
];

function ListView({ data, courses }) {
  const theme = useTheme();
  const [selected, setSelected] = useState("");
  const [view, setView] = useState([]);

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
        break;
    }
  }, [selected]);

  return (
    <>
      <section className="pt-10 md:pt-20 overflow-scroll scroll-auto scrollbar-hide mx-10 lg:mx-24 md:ml-8 md:w-4/6 border-black/20  border-b-[1px] border-dashed">
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
      <div className="lg:mx-20 pt-6 mx-4 px-1 md:mx-auto overflow-x-auto md:grid md:grid-cols-1 lg:grid lg:grid-cols-1  xl:grid xl:grid-cols-3 pb-8 space-y-6 lg:space-y-0 xl:space-y-0 gap-10">
        {selected == "reviews"
          ? view?.map(({ id, customerName, comments }) => (
              <div className="mx-4 space-y-4" key={id}>
                <p>Review</p>
              </div>
            ))
          : view?.map(
              ({
                _id,
                courseName,
                amount,
                duration,
                totalPrice,
                procedures,
              }) => (
                <div key={_id}>
                  <CourseListView
                    data={data}
                    key={_id}
                    _id={_id}
                    courseName={courseName}
                    amount={amount}
                    duration={duration}
                    totalPrice={totalPrice}
                    procedures={procedures}
                  />
                </div>
              )
            )}
      </div>
    </>
  );
}

export default ListView;
