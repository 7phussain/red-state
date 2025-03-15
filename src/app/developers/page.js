import React from "react";
import { RxDotFilled } from "react-icons/rx";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoLocationOutline,
} from "react-icons/io5";
import DevelopersGrid from "./_components/developersGrid";
const Developers = () => {
  return (
    <>
      <div className="relative pt-[60px] px-[30px] md:px-[50px] lg:px-[100px] h-[100vh]">
        {/* <div
        className="relative bg-cover bg-center  "
        style={{ backgroundImage: "url('/developers_hero.png')" }}
      > */}
        <img
          src="/developers_hero.png"
          className=" object-cover absolute bottom-0 z-20 left-0 w-[100vw] h-[100%] "
        />
        {/* Top Gradient */}
        <div className="absolute z-20 inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/70 to-transparent"></div>

        {/* Bottom Gradient */}
        <div className="absolute z-20 inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center h-full pb-[60px]">
          <div className={` flex flex-col gap-4`}>
            <div className="">
              <span className="rounded-full  px-2 py-1 flex items-center mb-3 bg-primary w-fit text-white">
                <RxDotFilled size={30} />
                Our Developers
              </span>
            </div>
            <h3 className="text-5xl font-semibold text-primary  ">
              Explore Our Developers
            </h3>
            <span className="text-white text-md">
              Discover meticulously crafted homes and properties, blending
              contemporary aesthetics with sustainable living.
            </span>
          </div>
          {/* </div> */}
        </div>
      </div>
      <DevelopersGrid />
      <div className="flex gap-3 justify-center py-4 pb-8">
        <button className="text-gray-600">
          <IoArrowBackCircleOutline size={44} />
        </button>
        <div className="gap-3 grid grid-cols-5 items-center">
          {[1, 2, 3, 4, 5].map((dot, ind) => {
            return (
              <div
                key={ind}
                className="h-[10px] w-[10px] bg-primary rounded-full "
              ></div>
            );
          })}
        </div>
        <button className="text-gray-600">
          <IoArrowForwardCircleOutline size={44} />
        </button>
      </div>
    </>
  );
};

export default Developers;
