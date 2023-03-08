import React, { useState, useEffect } from "react";
import Tabs from "../../../components/Tabs";
import { useTheme } from "@mui/material/styles";
import CourseListView from "./CourseListView";
import PeopleReview from "../../../components/OLCard/PeopleReview";

function ListView({ data, courses, reviews }) {
  const theme = useTheme();
  const [selected, setSelected] = useState("");
  const [view, setView] = useState([]);
  const list = [
    {
      id: "courses",
      title: "คอร์ส/บริการ",
    },
    {
      id: "reviews",
      title: "ดูรีวิว",
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
    <div className="lg:w-3/6 mb-2 lg:mb-48">
      <div className="flex overflow-scroll scroll-auto scrollbar-hide md:ml-8 border-black/20  border-b-[1px] border-dashed">
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
      </div>
      <div className="pt-4 overflow-x-auto grid grid-cols-1 pb-32 md:pb-48 gap-10">
        {selected == "reviews"
          ? view?.map(({ _id, customerName, comments, score, createdAt }) => (
              <div className="py-4" key={_id}>
                {reviews ? (
                  <div className="mx-4 space-y-4" key={_id}>
                    <PeopleReview
                      customerName={customerName}
                      comments={comments}
                      score={score}
                      createdAt={createdAt}
                    />
                  </div>
                ) : (
                  <div className="mx-4 space-y-4">
                    <div className="py-12">
                      <p className="h4 text-black/50 pt-8">
                        This clinic has no review yet.
                      </p>
                    </div>
                  </div>
                )}
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
                type,
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
                    type={type}
                  />
                </div>
              )
            )}
      </div>
    </div>
  );
}

export default ListView;
