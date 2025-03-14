"use client";

import React from "react";
import Image from "next/image";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircle,
} from "react-icons/io5";

const Hero = () => {
  return (
    <div className="relative h-[70vh] md:h-[100vh] w-full flex flex-col justify-between pt-[60px] px-[30px] md:px-[50px] lg:px-[100px] ">
      {/* Background Image */}
      <img
        src="./hero.png"
        className=" object-cover absolute bottom-0 z-20 left-0 w-[100vw] h-[90%] "
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background: `
            linear-gradient(180deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0) 41.3%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0) 41.3%)
          `,
        }}
      ></div>

      {/* Content */}
      <div className="relative flex flex-col uppercase text-[30px] sm:text-[70px] md:text-[86px] lg:text-8xl w-full items-center text-[#CA1E2E] font-extrabold">
        <h1>Future - Ready</h1>
        <h1>INVESTMENTS</h1>
      </div>

      <div className="relative z-30 flex justify-between pb-4 sm:items-end sm:flex-row flex-col gap-6">
        <p className="sm:w-[300px] w-[280px]">
          Discover meticulously crafted homes and properties, blending
          contemporary aesthetics with sustainable living.
        </p>
        <div className="flex flex-col items-end">
          <div className="flex gap-3 text-[24px]">
            <button>
              <IoArrowBackCircleOutline size={36} />
            </button>
            <button>
              <IoArrowForwardCircle size={36} />
            </button>
          </div>
          <span>Azizi Venice</span>
          <div className="flex flex-col items-end">
            <span>1234 Lane</span>
            <span>Dubai, CA 90001</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
