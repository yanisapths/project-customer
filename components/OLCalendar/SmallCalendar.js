import React from "react";
import { generateDate, months } from "../../utils/calendar";
import cn from "../../utils/cn";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function SmallCalendar({
  getSelectedDate,
  availables,
  currentDate,
  today,
  setToday,
  selectedDate,
  setSelectedDate,
  values,
  removeDate,
}) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="text-[#121212] h-fit">
      <div className="flex justify-between">
        <p className="font-semibold">
          {months[today.month()]}, {today.year()}
        </p>
        <div className="flex items-center gap-5">
          <ChevronLeftIcon
            className="cursor-pointer"
            onClick={() => setToday(today.month(today.month() - 1))}
          />
          <p
            className="font-semibold cursor-pointer hover:text-[#005844] transition-all"
            onClick={() => setToday(currentDate)}
          >
            วันนี้
          </p>
          <ChevronRightIcon
            className="cursor-pointer"
            onClick={() => setToday(today.month(today.month() + 1))}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-7">
        {days.map((day, index) => {
          return (
            <p key={index} className="h-14 grid place-content-center text-sm">
              {day}
            </p>
          );
        })}
      </div>
      <div className="w-full grid grid-cols-7">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <div
                key={index}
                className="h-14 border-t grid place-content-center"
              >
                <p
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    currentMonth
                      ? "text-sm"
                      : "text-sm text-gray-400 font-light",
                    today ? "bg-[#ACDED5] text-[#005844]" : "",
                    selectedDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "bg-[#ACDED5] text-[#005844]"
                      : "",
                    "cursor-pointer font-semibold h-10 w-10 rounded-full grid place-content-center hover:bg-[#005844] hover:text-white hover:transition-all"
                  )}
                >
                  {date.date()}
                </p>
              </div>
            );
          }
        )}
      </div>
      <div>
        {availables?.map((data) => {
          {
            if (
              new Date(selectedDate).toDateString() ==
              new Date(data.availableDate).toDateString()
            ) {
              return (
                <div  key={data._id}  className="flex justify-center align-middle">
                  <div
                    key={data._id}
                    className={
                      values.appointmentDate
                        ? "text-center cursor-pointer flex gap-2 rounded-lg text-[#005844] body1 border-2 border-[#ACDED5] bg-[#ACDED5] px-3 w-fit whitespace-nowrap my-2 shadow-xl shadow-[#ACDED5]/40"
                        : "text-center cursor-pointer flex gap-2 rounded-lg text-[#005844] body1 border-2 border-[#ACDED5] px-3 w-fit whitespace-nowrap my-2 hover:text-black hover:bg-[#ACDED5] hover:shadow-xl hover:shadow-[#ACDED5]/40 active:text-black active:bg-[#ACDED5] active:shadow-xl active:shadow-[#ACDED5]/40"
                    }
                    onClick={() =>
                      getSelectedDate(
                        data.availableDate,
                        data.startTime,
                        data.endTime
                      )
                    }
                  >
                    <p className="tracking-wide">
                      {new Date(data.startTime).toLocaleTimeString("th-TH", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="px-2">-</p>
                    <p className="tracking-wide">
                      {new Date(data.endTime).toLocaleTimeString("th-TH", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    {values.appointmentDate ? (
                      <HighlightOffIcon
                        className="p-1 w-8 h-8"
                        onClick={removeDate}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            } else {
              return;
            }
          }
        })}
      </div>
    </div>
  );
}

export default SmallCalendar;
