import React from "react";
import { differenceInMinutes, addMinutes, format } from "date-fns";

export default function TimeAxis({ start, end, interval = 2 }) {
  const totalMins = differenceInMinutes(end, start);
  const labels = Array.from(
    { length: Math.floor(totalMins / interval) + 1 },
    (_, i) => addMinutes(start, i * interval)
  );

  return (
    <div className="relative h-8 flex items-end px-6 my-3">
      {labels.map((dt, idx) => {
        let percent = (differenceInMinutes(dt, start) / totalMins) * 100;

        // Edge label alignment logic
        let style = {};
        if (idx === 0) {
          style.left = `${percent}%`;
          style.transform = "translateX(0)"; // align left
        } else if (idx === labels.length - 1) {
          style.left = `98%`; // fixed 98% for last label
          style.transform = "translateX(-100%)"; // align right
        } else {
          style.left = `${percent}%`;
          style.transform = "translateX(-50%)"; // center
        }

        return (
          <div
            key={idx}
            className={`absolute bottom-0 text-sm text-gray-400 whitespace-nowrap${
              idx === 0 ? " ml-5" : ""
            }`}
            style={style}
          >
            {format(dt, "HH:mm")}
          </div>
        );
      })}
    </div>
  );
}
