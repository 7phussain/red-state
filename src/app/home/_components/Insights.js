import React from "react";
import SectionHeader from "./SectionHeader";

const insights = [
  {
    image: "/insights/luxury-living.png",

    title: "Market Trends & Insights",
    desc: "UAE Real Estate Market Report: Latest Price Trends in 2024 Top Investment Hotspots in Dubai & Abu Dhabi",
  },
  {
    image: "/insights/buying-selling.png",
    title: "Buying & Selling Guide",
    desc: "Step-by-Step Guide to Buying Property in Dubai How to Sell Your Property Fast in the UAE",
  },
  {
    image: "/insights/marketing_trends.png",

    title: "Luxury Living & Lifestyle",
    desc: "Most Luxurious Villas & Apartments in Dubai Best Waterfront Properties in the UAE",
  },
];

const Insights = () => {
  return (
    <div className="px-[100px] py-6 ">
      <SectionHeader
        name={"Relevant Articles"}
        title={"Latest Real Estate Insights"}
        desc={
          "Stay informed with expert tips, market updates, and real estate investment advice in the UAE."
        }
      />
      <div className="grid grid-cols-3 py-[80px] gap-5">
        {insights.map((item) => {
          return (
            <div>
              <div
                className=" h-[425px] rounded-2xl"
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
          );
        })}
      </div>
    </div>
  );
};

export default Insights;
