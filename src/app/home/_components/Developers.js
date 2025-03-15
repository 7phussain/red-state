"use client";

import React, { useState } from "react";
const developers = [
  "/developers/aldar.png",
  "/developers/alef.png",
  "/developers/alhabtoor.png",
  "/developers/aqua.png",
  "/developers/arada.png",
  "/developers/object1.png",
];
const Developers = () => {
  return (
    <div className="md:px-[50px] lg:px-[100px] px-[30px] ">
      <h3 className="text-primary lg:text-6xl text-3xl font-bold w-full text-center mb-4">
        Our Developers
      </h3>
      <div className="grid grid-cols-6 gap-3">
        {developers?.map((developer, ind) => {
          return (
            <div key={ind} className="w-full">
              <img src={developer} className="w-full" />
              {/* <Image
                src={developer}
                alt=""
                className=""
                layout="fill"
                objectFit="cover" // Controls how the image is resized
              /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Developers;
