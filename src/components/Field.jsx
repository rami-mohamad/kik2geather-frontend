import React from "react";

// Import images (adjust paths)
import Field1 from "../assets/Media/Images/Booking/Filed_1.png";
import Field2 from "../assets/Media/Images/Booking/Filed_2.png";
import Field3 from "../assets/Media/Images/Booking/Filed_3.png";
import Field4 from "../assets/Media/Images/Booking/Filed_4.png";

const FIELD_BG = {
  1: Field1,
  2: Field2,
  3: Field3,
  4: Field4,
};

// 10 fixed positions (percent-based so it scales)
const DOTS = [
  { left: "10%", top: "47%" }, // 1
  { left: "20%", top: "29%" }, // 2
  { left: "20%", top: "66%" }, // 3
  { left: "33%", top: "29%" }, // 4
  { left: "33%", top: "66%" }, // 5
  { left: "90%", top: "47%" }, // 6
  { left: "80%", top: "29%" }, // 7
  { left: "80%", top: "66%" }, // 8
  { left: "67%", top: "29%" }, // 9
  { left: "67%", top: "66%" }, // 10
];

export default function Field({ blocked = 0, field = 1 }) {
  const bg = FIELD_BG[field] || Field1; // default to field 1 if invalid

  return (
    <div className="flex w-full max-w-[520px] flex-col items-center">
      {/* counter */}
      <div
        className={[
          "mb-4 flex h-12 w-[180px] items-center justify-center rounded-xl bg-[#c4c4c4]",
          "text-3xl font-extrabold text-black",
          blocked >= 10 ? "text-red-600" : "",
        ].join(" ")}
      >
        {blocked} / 10
      </div>

      {/* field */}
      <div
        className={[
          "relative aspect-[460/240] w-full max-w-[460px] rounded-md bg-cover bg-center bg-no-repeat",
          blocked >= 10 ? "opacity-50" : "opacity-100",
        ].join(" ")}
        style={{ backgroundImage: `url(${bg})` }}
      >
        {DOTS.map((pos, idx) => {
          const isBlocked = idx + 1 <= Number(blocked);

          return (
            <span
              key={idx}
              className={[
                "absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#858585]",
                isBlocked ? "bg-red-600" : "bg-white",
              ].join(" ")}
              style={{ left: pos.left, top: pos.top }}
            />
          );
        })}
      </div>
    </div>
  );
}
