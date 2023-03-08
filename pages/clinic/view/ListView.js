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
      title: "รีวิวจากลูกค้า",
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
      <div className="pt-6 w-full overflow-x-auto grid grid-cols-1 xl:grid xl:grid-cols-2 pb-32 md:pb-48 gap-10 xs:px-2 px-4 md:px-10 lg:px-18 xl:px-20">
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
                type
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
    </>
  );
}

export default ListView;
