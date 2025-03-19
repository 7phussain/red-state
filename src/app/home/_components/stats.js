import React from "react";
import { FaPlus } from "react-icons/fa6";

const Stats = () => {
  const statsData = [
    {
      label: "Home For Rent",
      units: "5300",
    },
    {
      label: "Home to Buy",
      units: "3000",
    },
    {
      label: "Developers",
      units: "120",
    },
    {
      label: "Cities Covered",
      units: "83",
    },
    {
      label: "Top Properties",
      units: "9200",
    },
  ];
  return (
    <div
      style={{
        backgroundImage: "url(/circle-design.png)",
        backgroundBlendMode: "soft-light",
      }}
      className="bg-primary min-h-[200px] grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-[70px] lg:px-[70px] xl:px-[100px] items-center py-5 my-4"
    >
      {statsData?.map((state, ind) => {
        return (
          <div key={ind} className="flex flex-col gap-2 py-4">
            <span className="text-base">{state?.label}</span>
            <span className="font-semibold text-3xl md:text-4xl flex gap-1 items-center">
              {state?.units} <FaPlus size={30} />{" "}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
