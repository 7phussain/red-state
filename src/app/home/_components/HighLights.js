"use client";

import { selectStyles } from "@/app/_components/selectStyles";
import React, { useState } from "react";
import Select from "react-select";
import { LuSearch } from "react-icons/lu";
import SectionHeader from "./SectionHeader";
import { BsArrowUpRightCircle } from "react-icons/bs";
const Highlights = () => {
  const [selectedRegion, setSelectedRegion] = useState("Dubai");
  const links = ["Dubai", "Sharjah", "Abu Dhabi", "Ajman"];
  return (
    <div className="px-[100px] py-[50px]">
      <SectionHeader
        name={"Fetured Properties"}
        title={"City-by-City Real Estate Highlights"}
        desc={
          "Find the neighborhood you dream of and explore it with your real estate consultant. We are here to help you find the perfect home"
        }
      />
      <div className="flex justify-center py-11">
        <ul className="space-x-5">
          {links?.map((link) => {
            return (
              <button
                onClick={() => setSelectedRegion(link)}
                className={` p-2  rounded-full cursor-pointer ${
                  selectedRegion === link ? "bg-primary" : "text-primary"
                }`}
              >
                {link}
              </button>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-3 py-[80px] gap-5">
        {[1, 2, 3].map((item) => {
          return (
            <div>
              <div
                className="relative h-[300px] rounded-2xl"
                style={{
                  backgroundImage: "url(/hero.png)",
                  backgroundSize: "cover",
                }}
              >
                {/* <img src="/hero.png" alt="" className="rounded-[100px]" /> */}
                <button className="p-2 px-3 rounded-full bg-primary uppercase absolute top-0 left-4 text-[14px] font-semibold">
                  For Sale
                </button>
              </div>
              <div>
                <h4 className="text-primary font-semibold text-3xl py-2">
                  750,000 AED
                </h4>
                <span className="text-primary font-medium underline py-2">
                  Binghatti Skyrise
                </span>
                <div className="text-secondary">
                  <div className="flex flex-col">
                    <span>1234 Avenue</span>
                    <span>Dubai, UAE</span>
                  </div>

                  <div className="flex ">
                    <span>3 beds</span> - <span>2 bath</span> -
                    <span>900 sq/ft</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Highlights;
