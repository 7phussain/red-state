"use client";

import React from "react";
import SectionHeader from "./SectionHeader";
import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
const insights = [
  {
    image: "/insights/luxury-living.webp",

    title: "Market Trends & Insights",
    desc: "UAE Real Estate Market Report: Latest Price Trends in 2024 Top Investment Hotspots in Dubai & Abu Dhabi",
  },
  {
    image: "/insights/buying-selling.webp",
    title: "Buying & Selling Guide",
    desc: "Step-by-Step Guide to Buying Property in Dubai How to Sell Your Property Fast in the UAE",
  },
  {
    image: "/insights/marketing_trends.webp",

    title: "Luxury Living & Lifestyle",
    desc: "Most Luxurious Villas & Apartments in Dubai Best Waterfront Properties in the UAE",
  },
];

const Insights = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };
  return (
    <div className="md:px-[50px] lg:px-[100px] px-[30px]  py-6 ">
      <SectionHeader
        name={"Relevant Articles"}
        title={"Latest Real Estate Insights"}
        desc={
          "Stay informed with expert tips, market updates, and real estate investment advice in the UAE."
        }
      />
      <div className="flex overflow-hidden py-[80px] gap-5 min-w-full">
        {insights.map((item, ind) => {
          return (
            // <div className="w-96 flex-none">
            //   <div
            //     className="h-[425px] rounded-2xl"
            //     style={{
            //       backgroundImage: `url(${item?.image})`,
            //       backgroundSize: "cover",
            //     }}
            //   ></div>
            //   <div>
            //     <h4 className="text-primary font-semibold text-3xl py-2 mt-4">
            //       {item?.title}
            //     </h4>
            //     <p className="text-secondary">{item?.desc}</p>
            //   </div>
            // </div>
            <div key={ind} className="relative">
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
                onClick={scrollLeft}
              >
                <AiOutlineLeft size={24} />
              </button>

              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto py-[80px] gap-5 min-w-full scrollbar-hide scroll-smooth"
              >
                {insights.map((item, index) => (
                  <div key={index} className="w-96 flex-none">
                    <div
                      className="h-[425px] rounded-2xl"
                      style={{
                        backgroundImage: `url(${item?.image})`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <div>
                      <h4 className="text-primary font-semibold text-3xl py-2 mt-4">
                        {item?.title}
                      </h4>
                      <p className="text-secondary">{item?.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
                onClick={scrollRight}
              >
                <AiOutlineRight size={24} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Insights;
