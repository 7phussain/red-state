"use client";

import React, { useState, useEffect, useRef } from "react";
import useApi from "@/utils/useApi";

const Developers = () => {
  const { fetchData } = useApi();
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const scrollRef = useRef(null);

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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    let speed = 1; // Adjust speed if needed

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount += speed;
        scrollContainer.scrollLeft = scrollAmount;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0; // Reset scroll
        }
      }
      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [developers]);

  return (
    <div className="my-5 py-5">
      <div className="md:px-[50px] lg:px-[70px] xl:px-[100px] px-[30px] flex flex-col gap-5">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary text-center">
          Our Developers
        </h3>
      </div>
      <div
        ref={scrollRef}
        className="flex no-scrollbar overflow-x-auto gap-5"
      >
        {developers
          ?.filter((item) => item?.logo)
          ?.map((item, ind) => {
            return (
              <div key={ind} className="min-w-[200px] min-h-[200px] p-5">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL.slice(0, -3)}${item?.logo
                    }`}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "/no_image.png"; // Set fallback image
                  }}
                  className="!w-[200px] !h-[200px] object-contain"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Developers;
