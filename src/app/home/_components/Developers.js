"use client";

import { selectStyles } from "@/app/_components/selectStyles";
import React, { useState } from "react";
import Select from "react-select";
import { LuSearch } from "react-icons/lu";
import SectionHeader from "./SectionHeader";
import { BsArrowUpRightCircle } from "react-icons/bs";
const developers = [
  "/developers/aldar.png",
  "/developers/alef.png",
  "/developers/alhabtoor.png",
  "/developers/aqua.png",
  "/developers/arada.png",
  "/developers/object1.png",
];
const Developers = () => {
  const [focusedImage, setFocusedImage] = useState(0);
  return (
    <div className="px-[100px] ">
      <h3 className="text-primary text-6xl font-bold w-full text-center mb-4">
        Our Developers
      </h3>
      <div className="grid grid-cols-6 gap-3">
        {developers?.map((developer) => {
          return (
            <div className="w-full">
              <img src={developer} className="w-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Developers;
