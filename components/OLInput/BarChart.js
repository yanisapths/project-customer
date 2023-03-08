import React from "react";

function BarChart({ star, percent }) {
  return (
    <div className="flex items-center mt-4 text-[#121212]/90 font-semibold">
      <span className="text-sm">
        {star}
      </span>
      <div className="w-3/4 h-2 mx-4 bg-[#FDFFF5] rounded">
        <div
          className="h-2 bg-[#ffd700] rounded"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span className="text-sm">
        {percent}%
      </span>
    </div>
  );
}

export default BarChart;
