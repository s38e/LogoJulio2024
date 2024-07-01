// components/DaySelector.js

import React from "react";
import Image from "next/image";
import Logo from "/public/assets/logo.svg";

const DaySelector = ({ onSelectDay }) => {
  const days = [
    "Day 01",
    "Day 02",
    "Day 03",
    "Day 04",
    "Day 05",
    "Day 06",
    "Day 07",
    "Day 08",
    "Day 09",
    "Day 10",
    "Day 11",
    "Day 12",
    "Day 13",
    "Day 14",
    "Day 15",
    "Day 16",
    "Day 17",
    "Day 18",
    "Day 19",
    "Day 20",
  ];

  return (
    <div className="flex items-center justify-between px-8 flex-col py-8 bg-[rgba(255,255,255,0.1)] backdrop-blur-lg h-screen w-96">
      <Image src={Logo} alt="Logo" />
      <div className="flex flex-col w-full gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            className="w-full px-3 py-2 text-sm text-black rounded-lg bg-neutral-200"
            onClick={() => onSelectDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;
