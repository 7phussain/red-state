import React from "react";
import { RxDotFilled } from "react-icons/rx";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { SlEnvolope } from "react-icons/sl";
const Developers = () => {
  const contactDetails = [
    {
      title: "Our Phone",
      icon: <FiPhone />,
      desc: "Business Bay - Khalij Tujari 2 -Dubai",
    },
    {
      title: "Email Address",
      icon: <SlEnvolope />,
      desc: "info@redestate.ae",
    },
  ];
  return (
    <div className="pt-[60px]">
      <div className="grid grid-cols-2 h-[100vh] grid-rows-1 text px-[100px] py-[100px]">
        <div className="relative z-10 flex flex-col justify-between h-full pb-[60px]">
          <div></div>
          <div className={` flex flex-col gap-4`}>
            <h3 className="text-5xl font-semibold text-primary  ">
              Al Habtoor
            </h3>
            <span className="text-secondary text-md">
              The Al Habtoor Group is one of the UAE’s most respected and
              successful businesses. Today it operates in the UAE and
              international markets.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {contactDetails?.map((details) => {
              return (
                <div className="flex items-center gap-4 justify-center text-primary">
                  <span className="p-4 rounded-full border text-xl">
                    {details?.icon}
                  </span>
                  <div className="flex flex-col gap-3">
                    <p className="text-lg font-semibold">{details?.title}</p>
                    <p className="text-black"> {details?.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <img
            src="/developer_logo.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Developers;
