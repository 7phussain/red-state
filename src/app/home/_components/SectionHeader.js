import React from "react";
import { RxDotFilled } from "react-icons/rx";
const SectionHeader = ({ name, title, desc, subtitle }) => {
  return (
    <div className="my-5 pt-5 pb-2">
      <div className="flex justify-start w-fit">
        <span className="bg-primary p-1.5 text-sm text-white flex items-center gap-1 rounded-full mb-2">
          <RxDotFilled size={26} />
          <span className="pr-2">{name}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-5 my-5">
        <div
          className={`${!desc && "col-span-2 w-full"
            } flex flex-col gap-4`}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary">{title}</h3>
          <span className="text-secondary md:text-lg lg:text-xl">{subtitle}</span>
        </div>
        <p className="text-secondary w-full text-sm lg:text-base">{desc}</p>
      </div>
    </div>
  );
};

export default SectionHeader;
