"use client";

import React, { useState, useEffect } from "react";
import useApi from "@/utils/useApi";

const Developers = () => {
  const { fetchData } = useApi();
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const fetchDevelopers = (page = 1, filters, callBack) => {
    fetchData(
      `/developers?page=${page}`,
      {
        method: "GET",
      },
      (res, status) => {
        callBack(res, status);
      }
    );
  };
  useEffect(() => {
    setIsloading(true);

    fetchDevelopers(1, {}, (res, status) => {
      if (status) {
        setDevelopers(res?.data?.developers);
        setIsloading(false);
      }
    });
  }, []);
  return (
    <div className="md:px-[50px] lg:px-[70px] xl:px-[100px] px-[30px] flex flex-col gap-5 my-5 py-5">
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary text-center">
        Our Developers
      </h3>
      <div className="flex no-scrollbar overflow-x-auto  gap-5">
        {developers
          ?.filter((item) => item?.logo)
          ?.map((item, ind) => {
            return (
              <div key={ind} className="min-w-[100px] h-[100px] ">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL.slice(0, -3)}${
                    item?.logo
                  }`}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "/no_image.png"; // Set fallback image
                  }}
                  className="w-full h-full object-contain"
                />
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
