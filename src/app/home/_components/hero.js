"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircle,
} from "react-icons/io5";

const Hero = () => {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const checkScreenSize = () => setIsMobile(window.innerWidth < 800);
  //   checkScreenSize();
  //   window.addEventListener('resize', checkScreenSize);
  //   return () => window.removeEventListener('resize', checkScreenSize);
  // }, []);

  return (
    <div
      className="hero-bg relative h-[100vh] w-full flex flex-col justify-between py-[70px] px-[30px] md:px-[50px] lg:px-[70px] xl:px-[100px] bg-gradient-to-b from-[#E6ECF4] to-white lg:bg-transparent"
    >
      {/* Background Image */}
      {/* <img
        src="./B1.webp"
        className="object-cover object-top absolute bottom-0 z-20 left-1/2 -translate-x-1/2 w-[100%] h-[90%]"
      /> */}
      {/* <img
        src="./web-1280x720.webp"
        className="lg:hidden object-cover object-top top-0 absolute bottom-0 z-0 left-1/2 -translate-x-1/2 w-[100%] h-[100%]"
      /> */}
      {/* <img
        src="./large-1920x1080.webp"
        className="object-cover object-top top-0 absolute bottom-0 z-0 left-1/2 -translate-x-1/2 w-[100%] h-[100%]"
      /> */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/video/hero-preview.jpg" // Optional: fallback poster
        className="object-cover object-top absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full h-full z-0"
      >
        <source src="/video/hero15.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-20 lg:hidden"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 41.3%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 41.3%)`,
        }}
      ></div>
      <div
        className="absolute inset-0 z-20 hidden lg:flex"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 41.3%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 41.3%)`,
        }}
      ></div>

      {/* Content */}
      <div className="relative flex flex-col leading-[44px] md:leading-[70px] lg:leading-[100px] uppercase w-full items-center text-[#CA1E2E] font-extrabold">
        <div className="h-[40px] lg:h-[20px]"></div>
        <h1 className="text-[30px] md:text-[70px] lg:text-[100px] m-0 p-0">
          Future - Ready
        </h1>
        <h1 className="text-[40px] md:text-[80px] lg:text-[118px] m-0 p-0">
          INVESTMENTS
        </h1>
      </div>

      <div className="relative z-30 flex justify-between pb-4 sm:items-end sm:flex-row flex-col gap-6">
        <p className="sm:w-[300px] w-[280px]">
          Discover meticulously crafted homes and properties, blending
          contemporary aesthetics with sustainable living.
        </p>
        {/* <div className="flex flex-col items-end">
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
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
