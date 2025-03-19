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
    <div className="md:px-[50px] lg:px-[70px] xl:px-[100px] px-[30px] flex flex-col gap-5 my-5 py-5">
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary text-center">
        Our Developers
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-8 gap-5">
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
