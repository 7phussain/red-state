import React from "react";
import { RxDotFilled } from "react-icons/rx";
const SectionHeader = ({ name, title, desc, subtitle }) => {
  return (
    <div>
      <div className="">
        <span className="text-primary flex items-center mb-3">
          <RxDotFilled size={30} />
          {name}
        </span>
      </div>

      <div className="flex justify-between items-center md:flex-row flex-col">
        <div
          className={`${
            desc && "xl:w-[35%] md:w-[50%] w-full "
          } flex flex-col gap-4`}
        >
          <h3 className="text-5xl font-semibold text-primary  ">{title}</h3>
          <span className="text-secondary text-xl ">{subtitle}</span>
        </div>
        <p className="text-secondary md:w-[30%] w-full">{desc}</p>
      </div>
    </div>
  );
};

export default SectionHeader;
