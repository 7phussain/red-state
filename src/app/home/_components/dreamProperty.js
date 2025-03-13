"use client";

import { selectStyles } from "@/app/_components/selectStyles";
import React, { useState } from "react";
import Select from "react-select";
import { LuSearch } from "react-icons/lu";
import SectionHeader from "./SectionHeader";
import { BsArrowUpRightCircle } from "react-icons/bs";
const DreamProperty = () => {
  const [focusedImage, setFocusedImage] = useState(0);
  return (
    <div className="px-[100px]">
      <div className="flex flex-col items-center py-6 gap-6">
        <div className="flex flex-col items-center">
          <h2 className="text-primary font-medium text-4xl">
            Find Your Dream Property
          </h2>
          <p className="text-secondary">
            We offer modern properties with the best quality that meet all your
            needs.
          </p>
        </div>
        <div className="flex gap-8 mt-6 items-center">
          {[0, 1, 2, 3, 4].map((i) => {
            return (
              <div>
                <label htmlFor="" className="text-secondary">
                  Looking For
                </label>
                <Select d placeholder="Looking for" styles={selectStyles} />
              </div>
            );
          })}
          <span className="p-3 bg-primary rounded-full ml-9">
            <LuSearch size={24} />
          </span>
        </div>
      </div>
      <SectionHeader
        name={"About Redestate"}
        title={"Your Dream Home, Our Expertise."}
        desc={
          "Red Estate is a leading real estate brokerage and investment firm dedicated to providing exceptional service and solutions to clients worldwide"
        }
      />
      <div className="gap-3 grid-cols-6 grid transition-all duration-300 ease-in-out">
        {[1, 2, 3, 4].map((item, ind) => {
          return (
            <div
              onMouseEnter={() => setFocusedImage(ind)}
              className={`relative flex flex-col justify-end py-4 px-4 rounded-[12px] h-[400px] transition-all duration-300 ease-in-out  ${
                focusedImage === ind ? "col-span-2" : "col-span-1"
              }`}
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 45.43%, rgba(0, 0, 0, 0.5) 71.41%)",
              }}
            >
              <img
                src="/hero.png"
                alt=""
                className="h-full w-full object-cover absolute rounded-[12px] z-0 top-0 left-0 transition-all duration-300 ease-in-out"
              />
              <div className="flex flex-col z-40">
                <h4 className="text-[16px] font-semibold">Burj Azizi</h4>
                {focusedImage === ind && (
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Id, tempora.
                  </p>
                )}
                <span>600+ units available</span>
              </div>
            </div>
          );
        })}
        <div className="text-primary flex items-center justify-center flex-col gap-3">
          <BsArrowUpRightCircle size={54} />
          More Properties
        </div>
      </div>
      {/* <div
        className="grid gap-3 "
        style={{
          gridTemplateColumns:
            focusedImage !== null
              ? "2fr 1fr 1fr 1fr 1fr" // Expanded effect
              : "1fr 1fr 1fr 1fr 1fr", // Default state
        }}
      >
        {[1, 2, 3, 4].map((item, ind) => (
          <div
            key={ind}
            onMouseEnter={() => setFocusedImage(ind)}
            onMouseLeave={() => setFocusedImage(null)} // Reset on mouse leave
            className="relative flex flex-col justify-end py-4 px-4 rounded-[12px] h-[400px] transition-all duration-500 ease-in-out"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 45.43%, rgba(0, 0, 0, 0.5) 71.41%)",
            }}
          >
            <img
              src="/hero.png"
              alt=""
              className="h-full w-full object-cover absolute rounded-[12px] z-0 top-0 left-0 transition-all duration-500 ease-in-out"
            />
            <div className="flex flex-col z-40">
              <h4 className="text-[16px] font-semibold">Burj Azizi</h4>
              <span>600+ units available</span>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default DreamProperty;
