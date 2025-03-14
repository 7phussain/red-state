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
      className="bg-primary min-h-[200px] grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-[70px]  lg:px-[150px] items-center my-6 py-6"
    >
      {statsData?.map((state) => {
        return (
          <div className="flex flex-col gap-4">
            <span className="font-extralight">{state?.label}</span>
            <span className="font-semibold text-6xl  flex gap-2.5 items-end">
              {state?.units} <FaPlus size={42} />{" "}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
