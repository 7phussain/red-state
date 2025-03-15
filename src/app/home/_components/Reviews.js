"use client";

import { selectStyles } from "@/app/_components/selectStyles";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import SectionHeader from "./SectionHeader";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
const Reviews = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/circle-design.png)",
        backgroundBlendMode: "soft-light",
      }}
      className="bg-[#F5F5F5] px-[20px] md:px-[50px] lg:px-[100px] py-[50px]"
    >
      <SectionHeader
        name={"Testimonial"}
        title={"What People Are Saying"}
        subtitle={"Real Feedback, Real Success"}
      />
      <div className="text-black flex flex-col items-center pt-5 px-5 sm:pt-0">
        <div className="flex flex-col gap-5 items-center sm:w-[50%]">
          <h4 className="font-semibold">Ali Bin Saleh</h4>
          <span>Client</span>
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((start, ind) => {
              return (
                <div key={ind}>
                  <FaStar size={24} color="#e2b93b" />
                </div>
              );
            })}
          </div>
          <p className="font-normal text-2xl py-4">
            “Seamless and stress-free home buying, thanks to a dedicated and
            expert team. Highly recommended for outstanding service”
          </p>
          <div className="flex gap-3">
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
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Reviews;
